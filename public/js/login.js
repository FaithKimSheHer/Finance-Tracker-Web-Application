// login.handlebars.loginForm
let loginForm = document.getElementById('log-inForm');
if(loginForm){
    function btnClick(e){  
        try{ 
            let registeredEmail = document.getElementById('registeredEmail').value;
            let registeredPassword = document.getElementById('registeredPassword').value;  

            let emailAddress = registeredEmail.trim().toLowerCase();
            if(emailAddress.length===0)              throw "email address field error";
            if(emailAddress.includes(" "))           throw "email address field error";
            if(!emailAddress.includes("@"))           throw "email address field error";
            if(!emailAddress.includes("."))           throw "email address field error";
            if(emailAddress.substring(0, emailAddress.indexOf('@')).length === 0)                           throw "email address field error";  
            if(emailAddress.substring(emailAddress.indexOf('@')), emailAddress.indexOf('.').length === 0)   throw "email address field error";
            if(emailAddress.substring(emailAddress.indexOf('.'), -1).length === 0) throw "email address field error";

            let password = registeredPassword.trim();
            if(password.includes(" "))           throw "password field error"; 
            if(password.length < 8)              throw "password field error"; 
            if (!/[A-Z]/.test(password))         throw "password field error";
            if (!/\d/.test(password))            throw "password field error"; 
            if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password))  throw "password field error"; 
 
        } catch (err) { 
            e.preventDefault();
            console.log(err); 
            // error.innerHTML = err;
            // The form should reset itself every time after an input has been processed
            loginForm.reset();  
        }  
    }//END: funtion btnClick()      
}
