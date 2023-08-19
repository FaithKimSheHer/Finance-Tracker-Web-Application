import {users} from '../config/mongoCollections.js'; 
import {ObjectId} from 'mongodb'; 
import validation from './validation.js';
import bcrypt from 'bcrypt'; 
const saltRounds = 10; 

const addUser = async(registrationForm) => { 
    // Add a user by input registrationForm from static/html 
    // => RETURN: user object  
      
    const firstName = validation.checkFN(registrationForm.newUserFirstName);  
    const lastName = validation.checkLN(registrationForm.newUserLastName);  
    const email = validation.checkEM(registrationForm.newUserEmail);   
    const userCollection = await users(); 

    const userGo = await userCollection.findOne({email: email});  
    if (userGo)     throw "user already exists";  
    
    const userName = validation.checkUN(registrationForm.newUserName); 
    const password = validation.checkPW(registrationForm.newUserPassword);  
    const city = validation.checkCT(registrationForm.newUserCity);
    const state = validation.checkST(registrationForm.newUserState);  
    const age = validation.checkAG(registrationForm.newUserAge);    
    console.log(age);
    
    let accountCreationDate = new Date().toLocaleDateString(); 
    const hashedPassword = await bcrypt.hash(password, saltRounds); 
    let newUser = {
        firstName:                  firstName,
        lastName:                   lastName,
        email:                      email, 
        userName:                   userName,
        hashedPassword:             hashedPassword,
        city:                       city,
        state:                      state,
        age:                        age,
        type:                       "user", 
        accountCreationDate:        accountCreationDate
    }    
    const insertInfo = await userCollection.insertOne(newUser);
    if (!insertInfo.acknowledged || !insertInfo.insertedId)     throw 'problem adding user'; 
    return email;
  };//END: addUser()

  const getByUserName = async(userNameInput)=>{
    // RETURN: object of product by input userGo from the database
 
    const userName = validation.checkUN(userNameInput);  

    const userCollection = await users();
    const userGo = await userCollection.findOne({userName: userName}); 
    if (!userGo)                     throw `there's no user with ${userGo}`;  
    return userGo;
}; 

const getByUserEmail = async(userEmail)=>{
    // RETURN: user document IF userExist by input newEmail
    //         OR null when !userExist

    const email = validation.checkEM(userEmail); 
        
    const userCollection = await users();
    const userExist = await userCollection.findOne({email: email});  

    if(userExist) return email; 
    else return null;
}; 

const checkUser = async(userEmail, userPassword)=>{
    // RETURN: user object by input email, password 

    const email = validation.checkEM(userEmail);  
    const userCollection = await users();
    const user = await userCollection.findOne({email: email}); 
    if (!user) throw 'this user does not exist';

    const match = await bcrypt.compare(userPassword, user.hashedPassword);
    if (!match) throw "invalid password"; 

    return user;   
}; 

const getByUserId = async(userId)=>{
    // RETURN: object of user by input userId

    if(!userId)                      throw 'you must provide an userId to search for';
    if(typeof userId !== 'string')   throw 'userId must be a string';
    else                             userId = userId.trim();
    if(userId.length === 0)          throw 'userId cannot be an empty string or just spaces'; 
    if (!ObjectId.isValid(userId))   throw 'invalid object ID'; 

    const userCollection = await users();
    const userGo = await userCollection.findOne({_id: new ObjectId(userId)}); 
    if (!userGo)                     throw `no user with ${userGo}`;
    userGo._id = userGo._id.toString();

    return userGo; 
}; 

const remove = async(userId)=>{ 
    // TO REMOVE: user information by input userId from the database 
    // RETURN: string(if deleting the product success)

    if(!userId)                       throw 'you must provide an userId to search for';
    if(typeof userId !== 'string')    throw 'userId must be a string';
    else                              userId = userId.trim();
    if (userId.length === 0)          throw 'userId cannot be an empty string or just spaces';
    if (!ObjectId.isValid(userId))    throw 'invalid userId';

    const userCollection = await users();
    const deletionInfo = await userCollection.findOneAndDelete({
        _id: new ObjectId(userId)
    }); 
    if (deletionInfo.lastErrorObject.n === 0) throw `could not delete user with id of ${userId}`;   

    return `${deletionInfo.value.userName} has been successfully deleted!`; 
}; 

export {addUser, getByUserName, getByUserId, getByUserEmail, checkUser, remove};
