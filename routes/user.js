import express from 'express';
const router = express.Router();  
import { usersFuncs } from '../data/index.js';
import validation from '../data/validation.js';

router.route('/register')
    .get(async (req, res) => {
        res.cookie('AuthCookie', req.session);
        console.log("AuthCookie: ", req.session); 
        if(req.session.user)        return res.redirect('/');
        else return res.render('register', {layout: 'user', title: 'Register'});
    })
    .post(async (req, res) => {  
        const registrationForm = req.body;
        if( !registrationForm ||
            !registrationForm.newUserEmail ||
            !registrationForm.newUserFirstName ||
            !registrationForm.newUserLastName ||
            !registrationForm.newUserPassword ||
            !registrationForm.confirmPasswordInput ||
            !registrationForm.newUserCity ||
            !registrationForm.newUserState)       return res.render('register', {layout: 'user', title: 'Register'});   
        try {       
            const email = validation.checkEM(registrationForm.newUserEmail); 
            const newUser = await usersFuncs.getByUserEmail(email);  
            if(!newUser===null){
                console.log(`User with email ${email} `, "already exist"); 
                return res.render('login', {layout: 'user', email: user.email});
            } 

            const firstName = validation.checkFN(registrationForm.newUserFirstName);  
            //console.log("firstName", [registrationForm.newUserFirstName]);

            const lastName = validation.checkLN(registrationForm.newUserLastName); 
            //console.log("lastName", [lastName]); 
                
            const userName = validation.checkUN(registrationForm.newUserName);
            //console.log("userName", [userName]);
  
            const password = validation.checkPW(registrationForm.newUserPassword); 
            //console.log("password", [password]); 

            if(registrationForm.confirmPasswordInput !== password) throw "confirmPasswordInput field error"; 
            //console.log("confirmPassword", [registrationForm.confirmPasswordInput === password]);

            const city = validation.checkCT(registrationForm.newUserCity);     
            //console.log("city", [city]); 

            const state = validation.checkST(registrationForm.newUserState);     
            //console.log('state', [state]); 
        } catch (e) {
            console.log('registrationForm_error', registrationForm);
            return res.render('register', {layout: 'user', title: 'Register Error'}); 
        }         
        const registeredEmail = await usersFuncs.addUser(registrationForm); 
        console.log("User registration success! :", [registeredEmail]);
        return res.render('login', {layout: 'user', email: registeredEmail}); 
    }); //END: router.route('/register') 

router.route('/login')
    .get(async (req, res) => {
        res.cookie('AuthCookie', req.session);
        console.log("AuthCookie: ", req.session); 
        if(req.session.user)        return res.redirect('/'); 
        else                        return res.render('login', {layout: 'user', title: 'Login'});
    })
    .post(async (req, res) => {  
        const logInForm = req.body;  
        if( !logInForm || 
            !logInForm.registeredEmail || 
            !logInForm.registeredPassword)      return res.render('login', {layout: 'user', title: 'Login'});   

            const email = validation.checkEM(logInForm.registeredEmail);  
            const password = validation.checkPW(logInForm.registeredPassword);  
            //console.log("user/login:", [email]);     
        try {        
            const registeredUser = await usersFuncs.checkUser(email, password); 
            //console.log("router/login, registeredUser", [registeredUser]);   
            if(!registeredUser)         return res.render('login', {layout: 'user', title: 'Login Again'});   
        } catch (e) {
            console.log('login_error', logInForm);
            return res.render('login', {layout: 'user', title: 'Login Error'}); 
        }          
        console.log("User login Success: ", [email]); 
        
        const currentTime = new Date().toString();  
        req.session.user = { currentTime: currentTime, 
                             email: email};
        console.log("req.session.user", [req.session.user])
        return res.redirect("/"); 
    }); //END: router.route('/logIn') 

/* Move to transaction route
router.route('/logout').get(async (req, res) => {
    //code here for GET 
    res.cookie('AuthCookie', null); 
    req.session.destroy();
    return res.render('logout', {layout: 'user', logout: "Logout Success"});
}); */
export default router; 
