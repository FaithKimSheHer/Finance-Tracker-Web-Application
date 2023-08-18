import {users} from '../config/mongoCollections.js'; 
import {ObjectId} from 'mongodb'; 
import validation from './validation.js';
import bcrypt from 'bcrypt'; 
const saltRounds = 10; 

const create = async(
    // Create a user with input parameters 
    // => RETURN: user object
    firstName_input,
    lastName_input,
    email_input,
    userName_input,
    password_input,
    city_input,
    state_input,
    age_input ) => {  
    if(!lastName || !email || !userName || !password || !city || !state || !age) throw "Input error";  

    // Error handlings
    const firstName = validation.checkFN(firstName_input); 
    //console.log("firstName: ", [firstName]);

    const lastName = validation.checkLN(lastName_input);  
    //console.log("lastName: ", [lastName]);

    const email = validation.checkEM(email_input); 
    //console.log("email: ", [email]);

    //check if email exists in db
    const userCollection = await users(); 
    const userGo = await userCollection.findOne({email: email});  
    if (userGo)     throw "There is already a user with that email";  
     
    const userName = validation.checkUN(userName_input);
    //console.log("userName:", [userName]);

    const age = validation.checkAG(age_input);
    //console.log("age: ", age); 
 
    const password = validation.checkPW(password_input) 
    //console.log("password: ", password);

    const city = validation.checkCT(city_input);  
    //console.log("city: ", city);
 
    const state = validation.checkST(state_input);
    //console.log("state: ", state);

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
    if (!insertInfo.acknowledged || !insertInfo.insertedId)     throw 'Could not add user'; 

    return newUser;
};

const addUser = async(registrationForm) => { 
    // Add a user by input registrationForm from static/html 
    // => RETURN: user object  
      
    try{
        // Error handlings
        const firstName = validation.checkFN(registrationForm.newUserFirstName);  
        //console.log("firstName: ", [firstName]);

        const lastName = validation.checkLN(registrationForm.newUserLastName);  
        //console.log("lastName: ", [lastName]);
 
        const email = validation.checkEM(registrationForm.newUserEmail);   
        //console.log("email: ", [email]);

        //check if email exists in db
        const userCollection = await users(); 
        const userGo = await userCollection.findOne({email: email});  
        if (userGo)     throw "There is already a user with that email address";  

        const userName = validation.checkUN(registrationForm.newUserName); 
        //console.log("userName: ", [userName]);
 
        const age = validation.checkAG(registrationForm.newUserAge);    
        //console.log("age: ", [age]); 

        const password = validation.checkPW(registrationForm.newUserPassword);  
        //console.log("password: ", [password]);
         
        const city = validation.checkCT(registrationForm.newUserCity);
        //console.log("city: ", [city]);
 
        const state = validation.checkST(registrationForm.newUserState);  
        //console.log("state: ", [state]);   

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
        if (!insertInfo.acknowledged || !insertInfo.insertedId)     throw 'Could not add user'; 
        return email;
    } catch(e) { 
      console.log(e);
    }  
  };//END: addUser()

  const getByUserName = async(userNameInput)=>{
    // RETURN: object of product by input userGo from the database
 
    try{
      const userName = validation.checkUN(userNameInput);  
      const userCollection = await users();
      const userGo = await userCollection.findOne({userName: userName}); 
      if (!userGo)                     throw `No user with ${userGo}`;  
      return userGo;
    } catch(e) { 
      console.log(e);
    }
}; 

const getByUserEmail = async(userEmail)=>{
    // RETURN: user document IF userExist by input newEmail
    //         OR null when !userExist
    try{
        const email = validation.checkEM(userEmail); 
         
        const userCollection = await users();
        const userExist = await userCollection.findOne({email: email});  
        if(!userExist) return email; 
        else return null;
    } catch(e) { 
        console.log(e);
    } 
}; 

const checkUser = async(userEmail, userPassword)=>{
    // RETURN: user object by input email, password 

    try{
        const email = validation.checkEM(userEmail);  
        const userCollection = await users();
        const user = await userCollection.findOne({email: email});   
        const hash = await bcrypt.hash(userPassword, saltRounds);   
        
        const compareToMongo = await bcrypt.compare(user.hashedPassword, hash);
        if (compareToMongo)     throw "Either the email address or password is invalid"; 

        return user;   
    }catch(e) { 
      console.log(e);
    }
    
}; 

const getByUserId = async(userId)=>{
    // RETURN: object of user by input userId

    try{
        if(!userId)                      throw 'You must provide an userId to search for';
        if(typeof userId !== 'string')   throw 'userId must be a string';
        else                             userId = userId.trim();
        if(userId.length === 0)          throw 'userId cannot be an empty string or just spaces'; 
        if (!ObjectId.isValid(userId))   throw 'Invalid object ID'; 
    
        const userCollection = await users();
        const userGo = await userCollection.findOne({_id: new ObjectId(userId)}); 
        if (!userGo)                     throw `No user with ${userGo}`;
        userGo._id = userGo._id.toString();
    
        return userGo; 
    }catch(e) { 
      console.log(e);
    }
}; 

const remove = async(userId)=>{ 
    // TO REMOVE: user information by input userId from the database 
    // RETURN: string(if deleting the product success)

    try{
        if(!userId)                       throw 'You must provide an userId to search for';
        if(typeof userId !== 'string')    throw 'userId must be a string';
        else                              userId = userId.trim();
        if (userId.length === 0)          throw 'userId cannot be an empty string or just spaces';
        if (!ObjectId.isValid(userId))    throw 'Invalid userId';
    
        const userCollection = await users();
        const deletionInfo = await userCollection.findOneAndDelete({
            _id: new ObjectId(userId)
        }); 
        if (deletionInfo.lastErrorObject.n === 0) throw `Could not delete user with id of ${userId}`;   
        return `${deletionInfo.value.userName} has been successfully deleted!`; 
    }catch(e) { 
      console.log(e);
    }
}; 

export {create, addUser, getByUserName, getByUserId, getByUserEmail, checkUser, remove};
