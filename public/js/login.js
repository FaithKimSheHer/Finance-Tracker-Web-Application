// login.handlebars.loginForm
let loginForm = document.getElementById('log-inForm'); 
let registeredEmail = document.getElementById('registeredEmail').value;
let registeredPassword = document.getElementById('registeredPassword').value;  

if( !loginForm ||
    !loginForm.registeredEmail ||
    !loginForm.registeredPassword){
        console.log("loginForm field error");
        loginForm.reset();  
}
else{
    function btnClick(){  
        try{  
            let email = registeredEmail.trim().toLowerCase();
            if(email.length===0)              throw "email can't be an empty string";
            if(email.includes(" "))           throw "email can't include an empty space";
            if(!email.includes("@"))          throw "email doens't include '@'";
            if(!email.includes("."))          throw "email doesn't include ','";
            if(email.substring(0, email.indexOf('@')).length === 0)                    throw "email doesn't exist";  
            if(email.substring(email.indexOf('@')), email.indexOf('.').length === 0)   throw "email doesn't exist";
            if(email.substring(email.indexOf('.'), -1).length === 0)  throw "email doesn't exist"; 

            let password = registeredPassword.trim();
            if(password.includes(" "))     throw "password can't include an empty space character";
            if(password.length < 8)        throw "password can't be less than 8";
            if (!/[A-Z]/.test(password))   throw "password must include at least one CAPITAL letter";
            if (!/\d/.test(password))      throw "password must include at least one digit";  
            if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) throw "password must include at least one special charactor"; 
 
        } catch (e) { 
            console.log(e);  
            loginForm.reset();  
        }  
    }//END: funtion btnClick()      
}
