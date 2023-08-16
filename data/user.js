import {users} from '../config/mongoCollections.js'; 
import {ObjectId} from 'mongodb'; 
import bcrypt from 'bcrypt'; 
const saltRounds = 10; 

const create = async(
  // Create a user with input parameters 
  // => RETURN: user object
    firstName,
    lastName,
    emailAddress,
    userName,
    password,
    city,
    state,
    age ) => { 
  //console.log("create() input: ", firstName, lastName, email, userName, hashedPassword, city, state, age);
    if(!firstName) throw "fistName input error"; 
    if(!lastName) throw "lastName input error";
    if(!emailAddress) throw "emailAddress input error";
    if(!userName) throw "userName input error";
    if(!password) throw "password input error"; 
    if(!city) throw "city input error";  
    if(!state) throw "state input error";  
    if(!age) throw "age input error";  

    // Error handlings
    if(typeof firstName !== 'string')     throw "firstName input error";
    firstName = firstName.trim();
    if(firstName.includes(" "))           throw "firstName input error";
    if(firstName.length < 2)              throw "firstName input error";
    if(firstName.length > 25)             throw "firstName input error";
    if (/\d/.test(firstName))             throw "firstName input error"; 
    if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(firstName))  throw "firstName input error";  
    //console.log("firstName: ", firstName);

    if(typeof lastName !== 'string')     throw "lastName input error";
    lastName = lastName.trim();
    if(lastName.includes(" "))           throw "lastName input error";
    if(lastName.length < 2)              throw "lastName input error";
    if(lastName.length > 25)             throw "lastName input error";
    if (/\d/.test(lastName))             throw "lastName input error"; 
    if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(lastName))  throw "lastName input error";  
    //console.log("lastName: ", lastName);

    if(typeof emailAddress !== 'string')     throw "email address input error";
    emailAddress = emailAddress.trim().toLowerCase();
    if(emailAddress.length===0)              throw "email address input error";
    if(emailAddress.includes(" "))           throw "email address input error";
    if(!emailAddress.includes("@"))          throw "email address input error";
    if(!emailAddress.includes("."))          throw "email address input error";
    if(emailAddress.substring(0, emailAddress.indexOf('@')).length === 0)                           throw "email address input error";  
    if(emailAddress.substring(emailAddress.indexOf('@')), emailAddress.indexOf('.').length === 0)   throw "email address input error";
    if(emailAddress.substring(emailAddress.indexOf('.'), -1).length === 0) throw "email address input error";   
    //check if emailAddress exists in db
    const userCollection = await users(); 
    const userGo = await userCollection.findOne({emailAddress: emailAddress});  
    if (userGo)     throw "There is already a user with that email address"; 
    //console.log("userName: ", userName);
     
    if(typeof userName !== 'string')     throw "userName input error";
    userName = userName.trim();
    if(userName.includes(" "))           throw "userName input error";
    if(userName.length < 2)              throw "userName input error";
    if(userName.length > 25)             throw "userName input error";
    if (/\d/.test(userName))             throw "userName input error"; 
    //console.log("userName:", userName);

    if(typeof age !== 'number')           throw 'Age input error'; 
    if(age < 18 )                         throw 'Age input error';   
    //console.log("age: ", age); 
 
    if(typeof password !== 'string')    throw 'hashedPassword input error';  
    if(password.includes(" "))           throw "hashedPassword input error"; 
    if(password.length < 8)              throw "hashedPassword input error"; 
    if (!/[A-Z]/.test(password))         throw "hashedPassword input error";
    if (!/\d/.test(password))            throw "hashedPassword input error"; 
    if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password))  throw "hashedPassword input error";  
    //console.log("hashedPassword: ", hashedPassword);

    city = city.trim();   
    if(typeof city !== 'string')              throw 'city input error';  
    if(city.length === 0)            throw "city input error";  
    if(city.length < 2)              throw "city input error";
    if(city.length > 25)             throw "input error";
    if(/\d/.test(city))              throw "input error";
    if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(city))  throw "input error";  
    //console.log("city: ", city);
 
    if(typeof state !== 'string')             throw 'state input error';  
    state = state.trim();
    if(state.length === 0)            throw "state field error";  
    if(state.length !== 2)            throw "state field error"; 
    if(/\d/.test(state))              throw "state field error";
    if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(state))  throw "state field error"; 
    //console.log("state: ", state);

  let accountCreationDate = new Date().toLocaleDateString(); 
  const hashedPassword = await bcrypt.hash(password, saltRounds); 
  let newUser = {
      firstName:                  firstName,
      lastName:                   lastName,
      email:                      email.toLowerCase(), 
      userName:                   userName.toLowerCase(),
      hashedPassword:             hashedPassword,
      city:                       city,
      state:                      state,
      type:                       "user", 
      accountCreationDate:        accountCreationDate
  } 
  const insertInfo = await userCollection.insertOne(newUser);
  if (!insertInfo.acknowledged || !insertInfo.insertedId)     throw 'Could not add user'; 

  return insertInfo.value;
};

const addUser = async(registrationForm) => { 
  // Add a user by input registrationForm from static/html 
  // => RETURN: user object
    
    let firstName = registrationForm.newUserFistName;
    let lastName = registrationForm.newUserLastName;
    let email = registrationForm.newUserEmail.toLowerCase();
    let userName = registrationForm.newUserName.toLowerCase();
    let password = registrationForm.newUserPassword;
    let city = registrationForm.newUserCity;
    let state = registrationForm.newUserState;
    let age = registrationForm.newUserAge; 
    let type = "user";
    let accountCreationDate = new Date().toLocaleDateString(); 

    //console.log("addUser() input: ", firstName, lastName, email, userName, hashedPassword, city, state, age, type, accountCreationDate);*/

    try{
        // Error handlings
        if(firstName === undefined)           throw 'You must provide your first name';
        if(typeof firstName !== 'string')     throw 'First name must be a string'; 
        else                                  firstName = firstName.trim();
        if(firstName.includes(" "))           throw "firstName input error";
        if(firstName.length < 2)              throw "firstName input error";
        if(firstName.length > 25)             throw "firstName input error";
        if (/\d/.test(firstName))             throw "firstName input error";
        if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(firstName))  throw "firstName input error";  
        //console.log("firstName: ", firstName);

        if(lastName === undefined)            throw 'You must provide your last name';
        if(typeof lastName !== 'string')      throw 'Last name must be a string';  
        else                                  lastName = lastName.trim();  
        if(lastName.includes(" "))           throw "lastName input error";
        if(lastName.length < 2)              throw "lastName input error";
        if(lastName.length > 25)             throw "lastName input error";
        if (/\d/.test(lastName))             throw "lastName input error"; 
        if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(lastName))  throw "lastName input error";  
        //console.log("lastName: ", lastName);
 
        if(email === undefined)           throw 'You must provide your email address';
        if(typeof email !== 'string')     throw 'Email address must be a string';  
        else                              email = email.trim();
        if(email.length===0)              throw "email address input error";
        if(email.includes(" "))           throw "email address input error";
        if(!email.includes("@"))          throw "email address input error";
        if(!email.includes("."))          throw "email address input error";
        if(email.substring(0, email.indexOf('@')).length === 0)                    throw "email address input error";  
        if(email.substring(email.indexOf('@')), email.indexOf('.').length === 0)   throw "email address input error";
        if(email.substring(email.indexOf('.'), -1).length === 0) throw "email address input error";   
        //check if emailAddress exists in db
        const userCollection = await users(); 
        const userGo = await userCollection.findOne({emailAddress: email});  
        if (userGo)     throw "There is already a user with that email address"; 
        //console.log("userName: ", userName);

        if(userName === undefined)            throw 'You must provide your user name';
        if(typeof userName !== 'string')      throw 'User name must be a string';  
        else                                  userName = userName.trim().toLowerCase();
        if(userName.includes(" "))            throw "userName input error";
        if(userName.length < 2)               throw "userName input error";
        if(userName.length > 25)              throw "userName input error";
        if (/\d/.test(userName))              throw "userName input error"; 
        //console.log("userName: ", userName);
 
        if(typeof age !== 'number')           throw 'Age must be a number'; 
        if(age < 18 )                         throw 'Age input error';    
        //console.log("age: ", age); 

        if(typeof password !== 'string')     throw 'password input error';    
        if(password.includes(" "))           throw "password input error"; 
        if(password.length < 8)              throw "password input error"; 
        if (!/[A-Z]/.test(password))         throw "password input error";
        if (!/\d/.test(password))            throw "password input error"; 
        if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password))  throw "password input error";  
        //console.log("hashedPassword: ", hashedPassword);
         
        if(typeof city !== 'string')      throw 'city must be a string';  
        else                              city = city.trim();
        if(city.length < 2)               throw "city input error";
        if(city.length > 25)              throw "city input error";
        //console.log("city: ", city);
 
        if(typeof state !== 'string')             throw 'state must be a string';  
        else                                      state = state.trim();
        if(state.length !== 2)                    throw 'state cannot be an empty string or just spaces';  
        //console.log("state: ", state); 
        //console.log("User field chekc success: ", registrationForm); 
    } catch(e) { 
        console.log(e);
    } 
    try{
        const hashedPassword = await bcrypt.hash(password, saltRounds); 
        let newUser = {
            firstName:                  firstName,
            lastName:                   lastName,
            email:                      email.toLowerCase(), 
            userName:                   userName.toLowerCase(),
            hashedPassword:             hashedPassword,
            city:                       city,
            state:                      state,
            type:                       type, 
            accountCreationDate:        accountCreationDate
        }

        const userCollection = await users();
        const insertInfo = await userCollection.insertOne(newUser);
        if (!insertInfo.acknowledged || !insertInfo.insertedId)     throw 'Could not add user';
  
        return email;
    } catch(e) { 
      console.log(e);
  } 
    //const newId = insertInfo.insertedId.toString();

    //const userId = await get(newId); 
    return insertInfo.value;
  };

  const getByUserName = async(userName)=>{
    // RETURN: object of product by input userGo from the database

    // Error Handlings
    if(!userName)                      throw 'You must provide an userName to search for';
    if(typeof userName !== 'string')   throw 'userName must be a string';
    else                               userName = userName.trim().toLowerCase();
    if(userName.length === 0)          throw 'userName cannot be an empty string or just spaces'; 
    
    const userCollection = await users();
    const userGo = await userCollection.findOne({userName: userName}); 
    if (!userGo)                     throw `No user with ${userGo}`;
    
    return userGo;
}; 

const getByUserEmail = async(newEmail)=>{
    // RETURN: user object by input newEmail
    newEmail = newEmail.toLowerCase();

    // Error Handlings 
    if(!newEmail)                      throw 'You must provide an userEmail to search for';
    if(typeof newEmail !== 'string')   throw 'userEmail must be a string';
    else                               newEmail = newEmail.trim().toLowerCase();
    if(newEmail.length === 0)          throw 'userEmail cannot be an empty string or just spaces';  
    if(newEmail.substring(0, newEmail.indexOf('@')).length === 0)   throw 'Email address address error'; 
    //console.log("getByUserEmail()", newEmail);
    const userCollection = await users();
    const userExist = await userCollection.findOne({email: newEmail}); 
    //console.log("userExist", userExist, !userExist);
    //console.log(userExist);
    if (!userExist)  return null;
    return newEmail; 
}; 

const checkUser = async(emailAddress, password)=>{
    // RETURN: user object by input emailAddress, password 

    // Error Handlings
    if(!emailAddress)                      throw 'You must provide an userEmail to search for';
    if(typeof emailAddress !== 'string')   throw 'userEmail must be a string';
    else                                   emailAddress = emailAddress.trim().toLowerCase();
    if(emailAddress.length === 0)          throw 'userEmail cannot be an empty string or just spaces';  
    if(emailAddress.substring(0, emailAddress.indexOf('@')).length === 0)   throw 'Email address address error'; 

    const hashedPassword = await bcrypt.hash(password, saltRounds);  

    const userCollection = await users();
    const user = await userCollection.findOne({email: emailAddress, hashedPassword: password});  
 
    return user; 
}; 

const getByUserId = async(userId)=>{
    // RETURN: object of user by input userId

    // Error Handlings
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
}; 

const remove = async(userId)=>{ 
    // TO REMOVE: user information by input userId from the database 
    // RETURN: string(if deleting the product success)

    // Error Handlings
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
}; 

export {create, addUser, getByUserName, getByUserId, getByUserEmail, checkUser, remove};
