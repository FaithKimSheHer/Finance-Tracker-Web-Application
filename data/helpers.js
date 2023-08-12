import {
  users
} from '../config/mongoCollections.js';
import {
  ObjectId
} from 'mongodb';

export const validateUserInput = async (firstName, lastName, email, userName, age, password, city, state) => {

  try {
    if (!firstName || !lastName || !email || !userName || age === undefined || !password || !city || !state) {
      throw 'All input parameters must be provided';
    }

    if (firstName.trim() === "" || lastName.trim() === "" || email.trim() === "" ||
      userName.trim() === "" || password.trim() === "" || city.trim() === "" || state.trim() === "") {
      throw 'Input parameters cannot be empty strings';
    }
    const validatedFirstName = validateFirstName(firstName);
    const validatedLastName = validateLastName(lastName);
    const validatedEmail = await validateEmail(email);
    const validatedUserName = await validateUserName(userName);
    const validatedAge = validateAge(age);
    const validatedPassword = validatePassword(password);
    const validatedCity = validateCity(city);
    const validatedState = validateState(state);

    return {
      firstName: validatedFirstName,
      lastName: validatedLastName,
      email: validatedEmail,
      userName: validatedUserName,
      age: validatedAge,
      password: validatedPassword,
      city: validatedCity,
      state: validatedState
    };
  } catch (error) {
    console.error(error);
    // Handle the validation error appropriately
  }
}

function validateFirstName(firstName) {
  if (firstName === undefined) throw 'You must provide your first name';
  if (typeof firstName !== 'string') throw 'First name must be a string';
  else firstName = firstName.trim();
  if (firstName.includes(" ")) throw "firstName input error";
  if (firstName.length < 2) throw "firstName input error";
  if (firstName.length > 25) throw "firstName input error";
  if (/\d/.test(firstName)) throw "firstName input error";
  if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(firstName)) throw "firstName input error";
  return firstName;
}

function validateLastName(lastName) {
  if (lastName === undefined) throw 'You must provide your last name';
  if (typeof lastName !== 'string') throw 'Last name must be a string';
  else lastName = lastName.trim();
  if (lastName.includes(" ")) throw "lastName input error";
  if (lastName.length < 2) throw "lastName input error";
  if (lastName.length > 25) throw "lastName input error";
  if (/\d/.test(lastName)) throw "lastName input error";
  if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(lastName)) throw "lastName input error";
  return lastName;
}

async function validateEmail(email) {
  if (email === undefined) throw 'You must provide your email address';
  if (typeof email !== 'string') throw 'Email address must be a string';
  else email = email.trim();
  if (email.length === 0) throw "email address input error";
  if (email.includes(" ")) throw "email address input error";
  if (!email.includes("@")) throw "email address input error";
  if (!email.includes(".")) throw "email address input error";
  if (email.substring(0, email.indexOf('@')).length === 0) throw "email address input error";
  if (email.substring(email.indexOf('@')), email.indexOf('.').length === 0) throw "email address input error";
  if (email.substring(email.indexOf('.'), -1).length === 0) throw "email address input error";
  // check if emailAddress exists in db
  const userCollection = await users();
  const userGo = await userCollection.findOne({
    email: email
  });
  if (userGo) throw "There is already a user with that email address";
  return email;
}

async function validateUserName(userName) {
  if (userName === undefined || userName === "") throw 'You must provide your user name';
  if (typeof userName !== 'string') throw 'User name must be a string';
  else userName = userName.trim().toLowerCase();
  if (userName.includes(" ")) throw "userName input error";
  if (userName.length < 2) throw "userName input error";
  if (userName.length > 25) throw "userName input error";
  if (/\d/.test(userName)) throw "userName input error";
  const userCollection = await users();
  const userGo = await userCollection.findOne({
    userName: userName
  });
  if (userGo) throw "There is already a user with that user name";
  return userName;
}

function validateAge(age) {
  if (typeof age !== 'number') throw 'Age must be a number';
  if (age < 18) throw 'Age input error';
  return age;
}

function validatePassword(password) {
  if (typeof password !== 'string') throw 'password input error';
  const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/;
  if (!regex.test(password)) throw new Error('Password formatting error');
  return password;
}

function validateCity(city) {
  if (typeof city !== 'string') throw 'city must be a string';
  else city = city.trim();
  if (city.length < 2) throw "city input error";
  if (city.length > 25) throw "city input error";
  return city;
}

function validateState(state) {
  if (typeof state !== 'string') throw 'state must be a string';
  else state = state.trim();
  if (state.length !== 2) throw 'state cannot be an empty string or just spaces';
  return state;
}