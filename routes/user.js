import express from 'express';
const router = express.Router();  
import { usersFuncs } from '../data/index.js';

router.route('/register')
    .get(async (req, res) => {
        res.cookie('AuthCookie', req.session);
        console.log("AuthCookie: ", req.session);
        console.log("register/req.session.user:", req.session.user, " => redirecting to dashboard")
        if(req.session.user)        return res.redirect('/');
        else res.status(200).render('register', {layout: 'user', title: 'Register'});
    })
    .post(async (req, res) => {  
        const registrationForm = req.body;  
        
        let emailAddress = registrationForm.newUserEmail.trim().toLowerCase();
        if(emailAddress.length===0)              throw "email address field error";
        if(emailAddress.includes(" "))           throw "email address field error";
        if(!emailAddress.includes("@"))           throw "email address field error";
        if(!emailAddress.includes("."))           throw "email address field error";
        if(emailAddress.substring(0, emailAddress.indexOf('@')).length === 0)                           throw "email address field error";  
        if(emailAddress.substring(emailAddress.indexOf('@')), emailAddress.indexOf('.').length === 0)   throw "email address field error";
        if(emailAddress.substring(emailAddress.indexOf('.'), -1).length === 0) throw "email address field error";
        //console.log("Register: ", emailAddress);   
        const newUser = await usersFuncs.getByUserEmail(emailAddress);  
        //console.log("newUser: ", newUser, newUser!==null); 
        if(newUser!==null)     return res.render('registerError', {error: emailAddress}); 
        console.log("newUser: ", newUser, newUser!==null); 
    
        try {   
            console.log('registrationForm', registrationForm);
            // Error handling  
            if(!registrationForm.newUserFistName) throw "fistName field error"; 
            if(!registrationForm.newUserLastName) throw "lastName field error";
            if(!registrationForm.newUserName) throw "emailAddress field error";
            if(!registrationForm.newUserName) throw "userName field error";
            if(!registrationForm.newUserPassword) throw "newUserPassword field error";
            if(registrationForm.newUserPassword!==registrationForm.confirmPasswordInput) throw "confirmPasswordInput field error";
            if(!registrationForm.newUserCity) throw "newUserCity field error";  
            if(!registrationForm.newUserState) throw "newUserState field error";  

            let firstName = registrationForm.newUserFistName.trim();
                if(firstName.includes(" "))           throw "firstName field error";
                if(firstName.length < 2)              throw "firstName field error";
                if(firstName.length > 25)             throw "firstName field error";
                if (/\d/.test(firstName))             throw "firstName field error";   
                if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(firstName))  throw "firstName field error";
                //console.log("firstName", firstName);

            let lastName = registrationForm.newUserLastName.trim();
                if(lastName.includes(" "))           throw "lastName field error";
                if(lastName.length < 2)              throw "lastName field error";
                if(lastName.length > 25)             throw "lastName field error";
                if (/\d/.test(lastName))             throw "lastName field error"; 
                if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(lastName))  throw "lastName field error";
                //console.log("lastName", lastName);

            let emailAddress = registrationForm.newUserEmail.trim().toLowerCase();
                if(emailAddress.length===0)              throw "email address field error";
                if(emailAddress.includes(" "))           throw "email address field error";
                if(!emailAddress.includes("@"))           throw "email address field error";
                if(!emailAddress.includes("."))           throw "email address field error";
                if(emailAddress.substring(0, emailAddress.indexOf('@')).length === 0)                           throw "email address field error";  
                if(emailAddress.substring(emailAddress.indexOf('@')), emailAddress.indexOf('.').length === 0)   throw "email address field error";
                if(emailAddress.substring(emailAddress.indexOf('.'), -1).length === 0) throw "email address field error";
                //console.log("emailAddress", emailAddress);
                
            let userName = registrationForm.newUserName.trim();
                if(userName.includes(" "))           throw "lastName field error";
                if(userName.length < 2)              throw "lastName field error";
                if(userName.length > 25)             throw "lastName field error"; 
                //console.log("userName", userName);

            let password = registrationForm.newUserPassword.trim();
                if(password.includes(" "))           throw "password field error"; 
                if(password.length < 8)              throw "password field error"; 
                if (!/[A-Z]/.test(password))         throw "password field error";
                if (!/\d/.test(password))            throw "password field error"; 
                if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password))  throw "password field error";
                //console.log("password", password);
                //console.log("confirmPasswordInput", registrationForm.confirmPasswordInput);

                if(registrationForm.confirmPasswordInput !== password) throw "confirmPasswordInput field error"; 
                //console.log("confirmPasswordInput", registrationForm.confirmPasswordInput);

            let city = registrationForm.newUserCity.trim();    
                if(city.length === 0)            throw "city field error";  
                if(city.length < 2)              throw "city field error";
                if(city.length > 25)             throw "city field error";
                if(/\d/.test(city))              throw "city field error";
                if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(city))  throw "city field error";
                //console.log("city", city);
                
            let state = registrationForm.newUserState.trim();    
                if(state.length === 0)            throw "state field error";  
                if(state.length !== 2)            throw "state field error"; 
                if(/\d/.test(state))              throw "state field error";
                if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(state))  throw "state field error";  
                //console.log('state', state);
        } catch (e) {
            res.status(200).render('RegisterError', {layout: 'user', title: 'RegisterError'}); 
        }        
        //console.log("Register the user:\n", registrationForm); 
        const user = await usersFuncs.addUser(registrationForm); 
        console.log("Add user success! :", user);
        res.status(200).render('login', {layout: 'user', email: user.email}); 
    }); //END: router.route('/register') 

router.route('/login')
    .get(async (req, res) => {
        res.cookie('AuthCookie', req.session);
        console.log("AuthCookie: ", req.session);
        console.log("login/req.session.user:", req.session.user, " => redirecting to login page")  
        if(req.session.user)        return res.redirect('/'); 
        else res.status(200).render('login', {layout: 'user', title: 'Login'});
    })
    .post(async (req, res) => {  
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
        
        if(!registeredUser)  return res.status(403).render('loginError', {layout: 'user', error: email});   
 
        console.log("RegisteredUser:",registeredUser);    
        console.log("Registered User Found Success: ", registeredUser.email); 
        
        const currentTime = new Date().toString();  
        req.session.user = { currentTime: currentTime, 
                             email: registeredUser.email};
        console.log("req.session.user", req.session.user)
        res.status(200).redirect("/"); 
    }); //END: router.route('/logIn') 

router.route('/logout').get(async (req, res) => {
    //code here for GET 
    res.cookie('AuthCookie', null); 
    req.session.destroy();
    res.status(200).render('logout', {layout: 'user', logout: "LogoutSuccess"});
});
 

export default router; 
