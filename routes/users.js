import express from 'express';
const router = express.Router();  
import path from 'path';
import { usersFuncs } from '../data/index.js';
import {users} from '../config/mongoCollections.js'; 

router.route('/').get(async (req, res) => {
    res.sendFile(path.resolve('static/registration.html'));   
});
router.route('/register').post(async (req, res) => {  
    const registrationForm = req.body;  
    
    let emailAddress = registrationForm.newUserEmail.trim().toLowerCase();
    if(emailAddress.length===0)              throw "email address field error";
    if(emailAddress.includes(" "))           throw "email address field error";
    if(!emailAddress.includes("@"))           throw "email address field error";
    if(!emailAddress.includes("."))           throw "email address field error";
    if(emailAddress.substring(0, emailAddress.indexOf('@')).length === 0)                           throw "email address field error";  
    if(emailAddress.substring(emailAddress.indexOf('@')), emailAddress.indexOf('.').length === 0)   throw "email address field error";
    if(emailAddress.substring(emailAddress.indexOf('.'), -1).length === 0) throw "email address field error";
        
    const newUser = await usersFuncs.getByUserEmail(emailAddress);  
    if(newUser === null)     return res.status(200).render('registerError', {error: emailAddress}); 
    try {   
        // Error handling 
        let firstName = registrationForm.newUserFistName;
        let lastName = registrationForm.newUserLastName;
        let emailAddress = registrationForm.newUserEmail;
        let userName = registrationForm.newUserName;
        let password = registrationForm.newUserPassword;
        let confirmPasswordInput = registrationForm.confirmPasswordInput;
        let city = registrationForm.newUserCity;
        let state = registrationForm.newUserState;

        if(!firstName) throw "fistName field error"; 
        if(!lastName) throw "lastName field error";
        if(!emailAddress) throw "emailAddress field error";
        if(!userName) throw "userName field error";
        if(!newUserPassword) throw "newUserPassword field error";
        if(!confirmPasswordInput) throw "confirmPasswordInput field error";
        if(!city) throw "newUserCity field error";  
        if(!state) throw "newUserState field error";  

        firstName = firstName.trim();
        if(firstName.includes(" "))           throw "firstName field error";
        if(firstName.length < 2)              throw "firstName field error";
        if(firstName.length > 25)             throw "firstName field error";
        if (/\d/.test(firstName))             throw "firstName field error";

        lastName = lastName.trim();
        if(lastName.includes(" "))           throw "lastName field error";
        if(lastName.length < 2)              throw "lastName field error";
        if(lastName.length > 25)             throw "lastName field error";
        if (/\d/.test(lastName))             throw "lastName field error"; 
        if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(lastName))  throw "lastName field error";

        emailAddress = emailAddress.trim().toLowerCase();
        if(emailAddress.length===0)              throw "email address field error";
        if(emailAddress.includes(" "))           throw "email address field error";
        if(!emailAddress.includes("@"))           throw "email address field error";
        if(!emailAddress.includes("."))           throw "email address field error";
        if(emailAddress.substring(0, emailAddress.indexOf('@')).length === 0)                           throw "email address field error";  
        if(emailAddress.substring(emailAddress.indexOf('@')), emailAddress.indexOf('.').length === 0)   throw "email address field error";
        if(emailAddress.substring(emailAddress.indexOf('.'), -1).length === 0) throw "email address field error";   
        const userCollection = await users(); 
        const userGo = await userCollection.findOne({emailAddress: emailAddress});  
        if (userGo)     throw "There is already a user with that email address"; 
        
        userName = userName.trim();
        if(userName.includes(" "))           throw "lastName field error";
        if(userName.length < 2)              throw "lastName field error";
        if(userName.length > 25)             throw "lastName field error"; 

        password = password.trim().toLowerCase();
        if(password.includes(" "))           throw "password field error"; 
        if(password.length < 8)              throw "password field error"; 
        if (!/[A-Z]/.test(password))         throw "password field error";
        if (!/\d/.test(password))            throw "password field error"; 
        if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password))  throw "password field error";

        if(confirmPasswordInput !== password) throw "confirmPasswordInput field error"; 

        city = newUserCity.trim();    
        if(city.length === 0)            throw "city field error";  
        if(city.length < 2)              throw "city field error";
        if(city.length > 25)             throw "city field error";
        if(/\d/.test(city))              throw "city field error";
        if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(city))  throw "city field error";
            
        state = state.trim();    
        if(state.length === 0)            throw "state field error";  
        if(state.length !== 2)            throw "state field error"; 
        if(/\d/.test(state))              throw "state field error";
        if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(state))  throw "state field error";
    } catch (e) {
        return res.status(200).render('registerError', {error: "Registration error"});
    }        
    //console.log("Register the user:\n", registrationForm); 
    const userEmail = await usersFuncs.addUser(registrationForm); 
    console.log("router user email:", userEmail);
    res.status(200).render('register', {email: userEmail}); 
}); //END: router.route('/').post(async (req, res)

router.route('/login').get(async (req, res) => {
    res.sendFile(path.resolve('static/login.html'));   
});

router.route('/login').post(async (req, res) => {  
    const logInForm = req.body;  
    
    let email = logInForm.registeredEmail;  
    let password = logInForm.registeredPassword;
    // To find if email is valid => if it exists in mongodb
    if(email === undefined)                                   throw 'You must provide your email address'; 
    if(typeof email !== 'string')                             throw 'Email address must be a string';  
    else                                                      email = email.trim().toLowerCase();
    if(email.length === 0)                                    throw 'Email address cannot be an empty string or just spaces';   
    if(email.substring(0, email.indexOf('@')).length === 0)   throw 'Email address address error';  
    if(email.substring(email.indexOf('@')), email.indexOf('.').length === 0)   throw 'Email address address error'; 
    console.log("RegisteredUser:",email);    

    const registeredUser = await usersFuncs.checkUser(email, password);   
    
    if(registeredUser === undefined)  return res.status(200).render('logInError', {error: email});   

    console.log("Registered User Found Success!");  
    
    res.status(200).render('logInSuccess', {email: email}); 
}); //END: router.route('/logIn').post(async (req, res)

router.route('/logout').get(async (req, res) => {
    //code here for GET 
    res.cookie('AuthCookie', null); 
    req.session.destroy();
    res.status(200).render('logout', {logout: "AuthCooki deleted successfully!"});
});

router.route('/:userName').get(async (req, res) => {  
    
    try {  
        if (!req.params.userName)                     return res.status(400).json({error: "UserId does not exist"});
        if (typeof req.params.userName !== 'string')  return res.status(400).json({error: "UserId Must be a string"});
        req.params.userName = req.params.userName.trim();
        if (req.params.userName.length === 0)         return res.status(400).json({error: "UserId can't be empty string"})    
    } catch (e) {
      return res.status(404).json({error: e});
    }
    try {
        const userInfo = await usersFuncs.get(req.params.userName); 
        res.status(200).json(userInfo);
    } catch (e) {
        res.status(404).json({error: e});
    }
});// END:router.route('/:userName').get(async (req, res)

export default router; 
