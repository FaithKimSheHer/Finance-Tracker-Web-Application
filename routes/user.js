import express from 'express';
const router = express.Router();  
import { usersFuncs } from '../data/index.js';
import validation from '../data/validation.js';

router.route('/register')
    .get(async (req, res) => {
        res.cookie('AuthCookie', req.session);
        console.log("AuthCookie: ", req.session); 
        return res.status(200).render('register', {layout: 'user'});
    })
    .post(async (req, res) => {  
        const registrationForm = req.body;
        try {       
            
            const firstName = validation.checkFN(registrationForm.newUserFirstName);  
            const lastName = validation.checkLN(registrationForm.newUserLastName); 

            const email = validation.checkEM(registrationForm.newUserEmail); 
            const userExists = await usersFuncs.getByUserEmail(email);  
            if(userExists) throw 'user already exists';
            
            const userName = validation.checkUN(registrationForm.newUserName);
            const password = validation.checkPW(registrationForm.newUserPassword); 
            if(registrationForm.confirmPasswordInput !== password) throw "please confirm your password"; 
            const city = validation.checkCT(registrationForm.newUserCity);     
            const state = validation.checkST(registrationForm.newUserState);     
            const age = validation.checkAG(registrationForm.newUserAge);
        } catch (e) {
            console.log(`register error: ${e}`);
            return res.status(403).render('register', {layout: 'user', notice: e}); 
        }         
        
        let registeredEmail;
        
        try {
            registeredEmail = await usersFuncs.addUser(registrationForm); 
            if(!registeredEmail) throw "there was an error registering your account. please try again"
        } catch(e) {
            console.log(`register error: ${e}`);
            if(e === "problem adding user")
                return res.status(500).render('register', {layout: 'user', notice: e}); 
            return res.status(403).render('register', {layout: 'user', notice: e}); 
        }

        console.log("User registration success: ", [registeredEmail]);
        return res.status(200).render('login', {layout: 'user', email: registeredEmail}); 
    }); //END: router.route('/register') 

router.route('/login')
    .get(async (req, res) => {
        res.cookie('AuthCookie', req.session);
        console.log("AuthCookie: ", req.session); 
        return res.status(200).render('login', {layout: 'user'});
    })
    .post(async (req, res) => {  
        const logInForm = req.body;  
        let email = logInForm.registeredEmail;
        let password = logInForm.registeredPassword;
        try {
            email = validation.checkEM(logInForm.registeredEmail);  
            password = validation.checkPW(logInForm.registeredPassword);  
        } catch(e) {
            console.log(`login error: ${e}`);
            return res.status(403).render('login', {layout: 'user', notice: e});
        }
        try {        
            const registeredUser = await usersFuncs.checkUser(email, password); 
            if(!registeredUser) throw "there was an error logging in. please try again" 
        } catch (e) {
            console.log(`login error: ${e}`)
            console.trace();
            return res.status(403).render('login', {layout: 'user', notice: e}); 
        }          
        console.log("User login Success: ", [email]); 
        
        const currentTime = new Date().toString();  
        req.session.user = { 
            currentTime: currentTime, 
            email: email
        };
        console.log("Session User: ", [req.session.user])
        return res.status(200).redirect("/"); 
    }); //END: router.route('/logIn') 

router.route('/logout').get(async (req, res) => {
    res.cookie('AuthCookie', null);
    req.session.destroy();
    return res.status(200).render('logout', {layout: 'user'});
});

export default router; 
