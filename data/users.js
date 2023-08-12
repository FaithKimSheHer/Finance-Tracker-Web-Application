import {
  users
} from '../config/mongoCollections.js';
import {
  ObjectId
} from 'mongodb';
import bcrypt from 'bcrypt';
import * as validate from './helpers.js'

const saltRounds = 10;

const create = async (
  // Create a user with input parameters 
  // => RETURN: user object
  firstName,
  lastName,
  emailAddress,
  userName,
  password,
  city,
  state,
  age) => {
  const validatedInputs = await validate.validateUserInput(firstName, lastName, emailAddress, userName, age, password, city, state);
  const userCollection = await users();
  let accountCreationDate = new Date().toLocaleDateString();
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  let newUser = {
    firstName: firstName,
    lastName: lastName,
    email: emailAddress.toLowerCase(),
    userName: userName.toLowerCase(),
    hashedPassword: hashedPassword,
    city: city,
    state: state,
    type: "user",
    accountCreationDate: accountCreationDate
  }
  const insertInfo = await userCollection.insertOne(newUser);
  if (!insertInfo.acknowledged || !insertInfo.insertedId) throw 'Could not add user';

  return insertInfo;
};

const addUser = async (registrationForm) => {
  // Add a user by input registrationForm from static/html 
  // => RETURN: user object

  let firstName = registrationForm.newUserFirstName;
  let lastName = registrationForm.newUserLastName;
  let email = registrationForm.newUserEmail.toLowerCase();
  let userName = registrationForm.newUserName.toLowerCase();
  let password = registrationForm.newUserPassword;
  let city = registrationForm.newUserCity;
  let state = registrationForm.newUserState;
  let age = registrationForm.newUserAge;
  let type = "user";
  let accountCreationDate = new Date().toLocaleDateString();

  console.log(firstName, lastName, email, userName, password, city, state, age, type, accountCreationDate);

  try {
    // Error handlings
    const validatedInputs = await validate.validateUserInput(firstName, lastName, email, userName, age, password, city, state);
  } catch (e) {
    console.log(e);
  }
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    let newUser = {
      firstName: firstName,
      lastName: lastName,
      email: email.toLowerCase(),
      userName: userName.toLowerCase(),
      hashedPassword: hashedPassword,
      city: city,
      state: state,
      type: type,
      accountCreationDate: accountCreationDate
    }

    const userCollection = await users();
    const insertInfo = await userCollection.insertOne(newUser);
    if (!insertInfo.acknowledged || !insertInfo.insertedId) throw 'Could not add user';

    return insertInfo.value;
  } catch (e) {
    console.log(e);
  }

};

const getByUserName = async (userName) => {
  // RETURN: object of product by input userGo from the database

  // Error Handlings
  if (!userName) throw 'You must provide an userName to search for';
  if (typeof userName !== 'string') throw 'userName must be a string';
  else userName = userName.trim().toLowerCase();
  if (userName.length === 0) throw 'userName cannot be an empty string or just spaces';

  const userCollection = await users();
  const userGo = await userCollection.findOne({
    userName: userName
  });
  if (!userGo) throw `No user with ${userGo}`;

  return userGo;
};

const getByUserEmail = async (newEmail) => {
  // RETURN: user object by input newEmail
  newEmail = newEmail.toLowerCase();

  // Error Handlings 
  if (!newEmail) throw 'You must provide an userEmail to search for';
  if (typeof newEmail !== 'string') throw 'userEmail must be a string';
  else newEmail = newEmail.trim().toLowerCase();
  if (newEmail.length === 0) throw 'userEmail cannot be an empty string or just spaces';
  if (newEmail.substring(0, newEmail.indexOf('@')).length === 0) throw 'Email address address error';
  const userCollection = await users();
  const userExist = await userCollection.findOne({
    email: newEmail
  });
  if (!userExist) return null;
  delete userExist.hashedPassword;
  return userExist;
};

const checkUser = async (emailAddress, password) => {
  // RETURN: user object by input emailAddress, password

  // Error Handlings

  if (!emailAddress) throw 'You must provide an userEmail to search for';
  if (typeof emailAddress !== 'string') throw 'userEmail must be a string';
  else emailAddress = emailAddress.trim().toLowerCase();
  if (emailAddress.length === 0) throw 'userEmail cannot be an empty string or just spaces';
  if (emailAddress.substring(0, emailAddress.indexOf('@')).length === 0) throw 'Email address address error';
  const userCollection = await users();
  const user = await userCollection.findOne({
    email: emailAddress
  })
  if (!user) throw new Error("Email does not exist or password is incorrect.");

  const passWordTest = await bcrypt.compare(password, user.hashedPassword);
  if (!passWordTest) {
    throw new Error("Invalid password.");
  }
  delete user.hash;
  if (user) return null;
  else return user;
};

const getByUserId = async (userId) => {
  // RETURN: object of user by input userId

  // Error Handlings
  if (!userId) throw 'You must provide an userId to search for';
  if (typeof userId !== 'string') throw 'userId must be a string';
  else userId = userId.trim();
  if (userId.length === 0) throw 'userId cannot be an empty string or just spaces';
  if (!ObjectId.isValid(userId)) throw 'Invalid object ID';

  const userCollection = await users();
  const userGo = await userCollection.findOne({
    _id: new ObjectId(userId)
  });
  if (!userGo) throw `No user with ${userGo}`;
  userGo._id = userGo._id.toString();

  return userGo;
};

const remove = async (userId) => {
  // TO REMOVE: user information by input userId from the database 
  // RETURN: string(if deleting the product success)

  // Error Handlings
  if (!userId) throw 'You must provide an userId to search for';
  if (typeof userId !== 'string') throw 'userId must be a string';
  else userId = userId.trim();
  if (userId.length === 0) throw 'userId cannot be an empty string or just spaces';
  if (!ObjectId.isValid(userId)) throw 'Invalid userId';

  const userCollection = await users();
  const deletionInfo = await userCollection.findOneAndDelete({
    _id: new ObjectId(userId)
  });
  if (deletionInfo.lastErrorObject.n === 0) throw `Could not delete user with id of ${userId}`;

  return `${deletionInfo.value.userName} has been successfully deleted!`;
};

export {
  create,
  addUser,
  getByUserName,
  getByUserId,
  getByUserEmail,
  checkUser,
  remove
};