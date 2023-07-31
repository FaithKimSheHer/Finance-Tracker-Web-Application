import {users} from '../config/mongoCollections.js'; 
import {ObjectId} from 'mongodb'; 


const create = async(
  // Create a user 
  // => RETURN: user object
  firstName,
  lastName,
  email,
  userName,
  hashedPassword,
  city,
  state,
  age ) => { 
   console.log("create() input: ", firstName, lastName, email, userName, hashedPassword, city, state, age);
  // Error handlings
  if(firstName === undefined)           throw 'You must provide your first name';
  if(typeof firstName !== 'string')     throw 'First name must be a string'; 
  else                                  firstName = firstName.trim();
  if(firstName.length === 0)            throw 'First name cannot be an empty string or just spaces'; 
  console.log("firstName: ", firstName);

  if(lastName === undefined)            throw 'You must provide your last name';
  if(typeof lastName !== 'string')      throw 'Last name must be a string';  
  else                                  lastName = lastName.trim(); 
  if(lastName.length === 0)             throw 'Last name cannot be an empty string or just spaces'; 
  console.log("lastName: ", lastName);

  if(userName === undefined)            throw 'You must provide your user name';
  if(typeof userName !== 'string')      throw 'User name must be a string';  
  else                                  userName = userName.trim().toLowerCase();
  if(userName.length === 0)             throw 'User name cannot be an empty string or just spaces'; 
  console.log("userName: ", userName);
 
  if(email === undefined)               throw 'You must provide your email address';
  if(typeof email !== 'string')         throw 'Email address must be a string';  
  else                                  email = email.trim();
  if(email.length === 0)                throw 'Email address cannot be an empty string or just spaces';   
  if(email.substring(0, email.indexOf('@')).length === 0)   throw 'Email address address error'; 

  if(age === undefined)                 throw 'You must provide your age';
  if(typeof age !== 'number')           throw 'Age must be a number'; 
  if(age <=0 )                          throw 'Age must be a positive number';  
  console.log("age: ", age); 

  if(hashedPassword === undefined)          throw 'You must provide your hashedPassword';
  if(typeof hashedPassword !== 'string')    throw 'hashedPassword must be a string';  
  else                                      hashedPassword = hashedPassword.trim();
  if(hashedPassword.length === 0)           throw 'hashedPassword cannot be an empty string or just spaces';  
  console.log("hashedPassword: ", hashedPassword);
  
  if(city === undefined)                    throw 'You must provide your city';
  if(typeof city !== 'string')              throw 'city must be a string';  
  else                                      city = city.trim();
  if(city.length === 0)                     throw 'city cannot be an empty string or just spaces';  
  console.log("city: ", city);

  if(state === undefined)                   throw 'You must provide your state';
  if(typeof state !== 'string')             throw 'state must be a string';  
  else                                      state = state.trim();
  if(state.length === 0)                    throw 'state cannot be an empty string or just spaces';  
  console.log("state: ", state);

  let accountCreationDate = new Date().toLocaleDateString(); 
 
  let newUser = {
    firstName:                  firstName,
    lastName:                   lastName,
    email:                      email.toLowerCase(),
    price:                      price,
    userName:                   userName.toLowerCase(),
    hashedPassword:             hashedPassword,
    city:                       city,
    state:                      state,
    type:                       "user", 
    accountCreationDate:        accountCreationDate
  }
  const userCollection = await users();
  const insertInfo = await userCollection.insertOne(newUser);
  if (!insertInfo.acknowledged || !insertInfo.insertedId)     throw 'Could not add user';

  //const newId = insertInfo.insertedId.toString();

  //const userId = await get(newId); 
  return insertInfo.value;
};

const addUser = async(registrationForm) => { 
  // Add a user by input registrationForm from static/html 
  // => RETURN: user object
   
  //console.log("registrationForm in addUser():");
  //console.log(registrationForm);
  let firstName = registrationForm.newUserFistName;
  let lastName = registrationForm.newUserLastName;
  let email = registrationForm.newUserEmail.toLowerCase();
  let userName = registrationForm.newUserName.toLowerCase();
  let hashedPassword = registrationForm.newUserPassword;
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
      if(firstName.length === 0)            throw 'First name cannot be an empty string or just spaces'; 
      //console.log("firstName: ", firstName);

      if(lastName === undefined)            throw 'You must provide your last name';
      if(typeof lastName !== 'string')      throw 'Last name must be a string';  
      else                                  lastName = lastName.trim(); 
      if(lastName.length === 0)             throw 'Last name cannot be an empty string or just spaces'; 
      //console.log("lastName: ", lastName);

      if(userName === undefined)            throw 'You must provide your user name';
      if(typeof userName !== 'string')      throw 'User name must be a string';  
      else                                  userName = userName.trim().toLowerCase();
      if(userName.length === 0)             throw 'User name cannot be an empty string or just spaces'; 
      //console.log("userName: ", userName);
    
      if(email === undefined)               throw 'You must provide your email address';
      if(typeof email !== 'string')         throw 'Email address must be a string';  
      else                                  email = email.trim();
      if(email.length === 0)                throw 'Email address cannot be an empty string or just spaces';   
      if(email.substring(0, email.indexOf('@')).length === 0)   throw 'Email address address error'; 

      if(age === undefined)                 throw 'You must provide your age';
      if(typeof age !== 'number')           throw 'Age must be a number'; 
      if(age <=0 )                          throw 'Age must be a positive number';  
      //console.log("age: ", age); 

      if(hashedPassword === undefined)          throw 'You must provide your hashedPassword';   
      //console.log("hashedPassword: ", hashedPassword);
      
      if(city === undefined)                    throw 'You must provide your city';
      if(typeof city !== 'string')              throw 'city must be a string';  
      else                                      city = city.trim();
      if(city.length === 0)                     throw 'city cannot be an empty string or just spaces';  
      //console.log("city: ", city);

      if(state === undefined)                   throw 'You must provide your state';
      if(typeof state !== 'string')             throw 'state must be a string';  
      else                                      state = state.trim();
      if(state.length === 0)                    throw 'state cannot be an empty string or just spaces';  
      //console.log("state: ", state);

      //console.log("User field chekc success: ", registrationForm); 
  } catch(e) { 
      console.log(e);
  } 
  try{
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
   
  const userCollection = await users();
  const userExist = await userCollection.findOne({email: newEmail}); 
  console.log(userExist);
  if (userExist)  return null;
  else            return newEmail; 
}; 

const checkUser = async(emailAddress, password)=>{
  // RETURN: user object by input emailAddress, password

  // Error Handlings
  if(!emailAddress)                      throw 'You must provide an userEmail to search for';
  if(typeof emailAddress !== 'string')   throw 'userEmail must be a string';
  else                                   emailAddress = emailAddress.trim().toLowerCase();
  if(emailAddress.length === 0)          throw 'userEmail cannot be an empty string or just spaces';  
  if(emailAddress.substring(0, emailAddress.indexOf('@')).length === 0)   throw 'Email address address error'; 
   
  const userCollection = await users();
  const user = await userCollection.findOne({email: emailAddress, hashedPassword: password}); 
  console.log(user);
  if (user)  return null;
  else       return user; 
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

const update = async(
  // RETURN: object of user updated from the input fields
  firstName,
  lastName,
  email,
  userName,
  hashedPassword,
  city,
  state,
  age )=>{

  // Error handlings
  if(firstName === undefined)           throw 'You must provide your first name';
  if(typeof firstName !== 'string')     throw 'First name must be a string'; 
  else                                  firstName = firstName.trim();
  if(firstName.length === 0)            throw 'First name cannot be an empty string or just spaces'; 
  console.log("firstName: ", firstName);

  if(lastName === undefined)            throw 'You must provide your last name';
  if(typeof lastName !== 'string')      throw 'Last name must be a string';  
  else                                  lastName = lastName.trim(); 
  if(lastName.length === 0)             throw 'Last name cannot be an empty string or just spaces'; 
  console.log("lastName: ", lastName);

  if(userName === undefined)            throw 'You must provide your user name';
  if(typeof userName !== 'string')      throw 'User name must be a string';  
  else                                  userName = userName.trim().toLowerCase();
  if(userName.length === 0)             throw 'User name cannot be an empty string or just spaces'; 
  console.log("userName: ", userName);
 
  if(email === undefined)               throw 'You must provide your email address';
  if(typeof email !== 'string')         throw 'Email address must be a string';  
  else                                  email = email.trim().toLowerCase();
  if(email.length === 0)                throw 'Email address cannot be an empty string or just spaces';   
  if(email.substring(0, email.indexOf('@')).length === 0)   throw 'Email address address error'; 

  if(age === undefined)                 throw 'You must provide your age';
  if(typeof age !== 'number')           throw 'Age must be a number'; 
  if(age <=0 )                          throw 'Age must be a positive number';  
  console.log("age: ", age); 

  if(hashedPassword === undefined)          throw 'You must provide your hashedPassword';
  if(typeof hashedPassword !== 'string')    throw 'hashedPassword must be a string';  
  else                                      hashedPassword = hashedPassword.trim();
  if(hashedPassword.length === 0)           throw 'hashedPassword cannot be an empty string or just spaces';  
  console.log("hashedPassword: ", hashedPassword);
  
  if(city === undefined)                    throw 'You must provide your city';
  if(typeof city !== 'string')              throw 'city must be a string';  
  else                                      city = city.trim();
  if(city.length === 0)                     throw 'city cannot be an empty string or just spaces';  
  console.log("city: ", city);

  if(state === undefined)                   throw 'You must provide your state';
  if(typeof state !== 'string')             throw 'state must be a string';  
  else                                      state = state.trim();
  if(state.length === 0)                    throw 'state cannot be an empty string or just spaces';  
  console.log("state: ", state);
  let accountCreationDate = new Date().toLocaleDateString(); 

  let updatedUser = {
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

  const userCollection = await users();
  const updatedInfo = await userCollection.findOneAndUpdate(
    {_id: new ObjectId(userName)},
    {$set: updatedUser},
    {returnDocument: 'after'}
  );
  if (updatedInfo.lastErrorObject.n === 0)  throw `could not update the user with userName of ${userName}`;  

  updatedInfo.value._id = updatedInfo.value._id.toString();
  return updatedInfo.value;
}; 

export {create, addUser, getByUserName, getByUserId, getByUserEmail, checkUser, remove, update};
