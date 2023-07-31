import express from 'express';
const router = express.Router();  
import path from 'path';
import { usersFuncs } from '../data/index.js';

router.route('/').get(async (req, res) => {
    res.sendFile(path.resolve('static/registration.html'));   
});
router.route('/register').post(async (req, res) => {  
    const registrationForm = req.body;  
    
    let email = registrationForm.newUserEmail;  
    // To find if email is valid => if it exists in mongodb
    if(email === undefined)                                   throw 'You must provide your email address'; 
    if(typeof email !== 'string')                             throw 'Email address must be a string';  
    else                                                      email = email.trim();
    if(email.length === 0)                                    throw 'Email address cannot be an empty string or just spaces';   
    if(email.substring(0, email.indexOf('@')).length === 0)   throw 'Email address address error';  
    if(email.substring(email.indexOf('@')), email.indexOf('.').length === 0)   throw 'Email address address error'; 
        
    const newUser = await usersFuncs.getByUserEmail(email);  
    if(newUser === null)     return res.status(200).render('registerError', {error: email}); 
    try {   
        // Error handling 
        if(registrationForm.newUserFistName === undefined)           throw 'You must provide your first name';
        if(typeof registrationForm.newUserFistName !== 'string')     throw 'First name must be a string'; 
        else                                                         registrationForm.newUserFistName = registrationForm.newUserFistName.trim();
        if(registrationForm.newUserFistName.length === 0)            throw 'First name cannot be an empty string or just spaces'; 
        //console.log("firstName: ", registrationForm.newUserFistName);

        if(registrationForm.newUserLastName === undefined)            throw 'You must provide your last name';
        if(typeof registrationForm.newUserLastName !== 'string')      throw 'Last name must be a string';  
        else                                                          registrationForm.newUserLastName = registrationForm.newUserLastName.trim(); 
        if(registrationForm.newUserLastName.length === 0)             throw 'Last name cannot be an empty string or just spaces'; 
        //console.log("lastName: ", registrationForm.newUserLastName);

              
        if(registrationForm.newUserName === undefined)            throw 'You must provide user name';
        if(typeof registrationForm.newUserName !== 'string')      throw 'User name must be a string';  
        else                                                      registrationForm.newUserName = registrationForm.newUserName.trim();
        if(registrationForm.newUserName.length === 0)             throw 'User name cannot be an empty string or just spaces'; 
        //console.log("userName: ", registrationForm.newUserName);

        if(registrationForm.newUserPassword === undefined)        throw 'You must provide your Password'; 
        //console.log("hashedPassword: ", registrationForm.newUserPassword);

        if(registrationForm.newUserAge === undefined)                 throw 'You must provide your age';
        registrationForm.newUserAge = parseInt(registrationForm.newUserAge);
        if(typeof registrationForm.newUserAge !== 'number')           throw 'Age must be a number'; 
        if(registrationForm.newUserAge <=18 )                         throw 'Age must be a greater or equal to 18';  
        //console.log("age: ", registrationForm.newUserAge); 
        
        if(registrationForm.newUserCity === undefined)             throw 'You must provide your city';
        if(typeof registrationForm.newUserCity !== 'string')       throw 'city must be a string';  
        else                                                       registrationForm.newUserCity = registrationForm.newUserCity.trim();
        if(registrationForm.newUserCity.length === 0)              throw 'city cannot be an empty string or just spaces';  
        //console.log("city: ", registrationForm.newUserCity);  
        
        if(registrationForm.newUserState === undefined)             throw 'You must provide your city';
        //console.log("State: ", registrationForm.newUserState);  

        //console.log("Authetication Success!\n", registrationForm); 
    } catch (e) {
        return res.status(200).render('registerError', {error: "Registration error"});
    }        
    //console.log("Register the user:\n", registrationForm); 
    const userEmail = await usersFuncs.addUser(registrationForm); 
    console.log("router user email:", userEmail);
    res.status(200).render('register', {email: userEmail}); 
}); //END: router.route('/').post(async (req, res)

router.route('/log-in').get(async (req, res) => {
    res.sendFile(path.resolve('static/log-in.html'));   
});

router.route('/log-in').post(async (req, res) => {  
    const logInForm = req.body;  
    
    let email = logInForm.registeredEmail;  
    let password = logInForm.registeredPassword;
    // To find if email is valid => if it exists in mongodb
    if(email === undefined)                                   throw 'You must provide your email address'; 
    if(typeof email !== 'string')                             throw 'Email address must be a string';  
    else                                                      email = email.trim();
    if(email.length === 0)                                    throw 'Email address cannot be an empty string or just spaces';   
    if(email.substring(0, email.indexOf('@')).length === 0)   throw 'Email address address error';  
    if(email.substring(email.indexOf('@')), email.indexOf('.').length === 0)   throw 'Email address address error'; 
    console.log("RegisteredUser:",email);    

    const registeredUser = await usersFuncs.checkUser(email, password);   
    
    if(registeredUser === undefined)  return res.status(200).render('logInError', {error: email});   

    console.log("Registered User Found Success!");  
    
    res.status(200).render('logInSuccess', {email: email}); 
}); //END: router.route('/logIn').post(async (req, res)

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
