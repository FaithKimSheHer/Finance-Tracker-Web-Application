// register.handlebars.registration-form
let newUserForm = document.getElementById('newUserForm'); 

if(newUserForm){
    function btnClick(e){  
        try{
            let newUserFistName = document.getElementById('newUserFistName').value;
            let newUserLastName = document.getElementById('newUserLastName').value;
            let newUserEmail = document.getElementById('newUserEmail').value;
            let newUserName = document.getElementById('newUserName').value;
            let newUserPassword = document.getElementById('newUserPassword').value;
            let confirmPasswordInput = document.getElementById('confirmPasswordInput').value;
            let newUserCity = document.getElementById('newUserCity').value;
            let newUserState = document.getElementById('newUserState').value;

            if(!newUserFistName) throw "newUserFistName field error"; 
            if(!newUserLastName) throw "newUserLastName field error";
            if(!newUserEmail) throw "newUserEmail field error";
            if(!newUserName) throw "newUserName field error";
            if(!newUserPassword) throw "newUserPassword field error";
            if(!confirmPasswordInput) throw "confirmPasswordInput field error";
            if(!newUserCity) throw "newUserCity field error";  
            if(!newUserState) throw "newUserState field error";  

            let firstName = newUserFistName.trim();
            if(firstName.includes(" "))           throw "firstName field error";
            if(firstName.length < 2)              throw "firstName field error";
            if(firstName.length > 25)             throw "firstName field error";
            if (/\d/.test(firstName))             throw "firstName field error";   
            if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(firstName))  throw "firstName field error";

            let lastName = newUserLastName.trim();
            if(lastName.includes(" "))           throw "lastName field error";
            if(lastName.length < 2)              throw "lastName field error";
            if(lastName.length > 25)             throw "lastName field error";
            if (/\d/.test(lastName))             throw "lastName field error"; 
            if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(lastName))  throw "lastName field error";

            let emailAddress = newUserEmail.trim().toLowerCase();
            if(emailAddress.length===0)              throw "email address field error";
            if(emailAddress.includes(" "))           throw "email address field error";
            if(!emailAddress.includes("@"))           throw "email address field error";
            if(!emailAddress.includes("."))           throw "email address field error";
            if(emailAddress.substring(0, emailAddress.indexOf('@')).length === 0)                           throw "email address field error";  
            if(emailAddress.substring(emailAddress.indexOf('@')), emailAddress.indexOf('.').length === 0)   throw "email address field error";
            if(emailAddress.substring(emailAddress.indexOf('.'), -1).length === 0) throw "email address field error";
            
            let userName = newUserName.trim();
            if(userName.includes(" "))           throw "lastName field error";
            if(userName.length < 2)              throw "lastName field error";
            if(userName.length > 25)             throw "lastName field error"; 

            let password = newUserPassword.trim();
            if(password.includes(" "))           throw "password field error"; 
            if(password.length < 8)              throw "password field error"; 
            if (!/[A-Z]/.test(password))         throw "password field error";
            if (!/\d/.test(password))            throw "password field error"; 
            if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password))  throw "password field error";

            if(confirmPasswordInput !== password) throw "confirmPasswordInput field error"; 

            let city = newUserCity.trim();    
            if(city.length === 0)            throw "city field error";  
            if(city.length < 2)              throw "city field error";
            if(city.length > 25)             throw "city field error";
            if(/\d/.test(city))              throw "city field error";
            if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(city))  throw "city field error";
            
            let state = newUserState.trim();    
            if(state.length === 0)            throw "state field error";  
            if(state.length !== 2)            throw "state field error"; 
            if(/\d/.test(state))              throw "state field error";
            if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(state))  throw "state field error";

        } catch (err) { 
            e.preventDefault();
            console.log(err);  
            // The form should reset itself every time after an input has been processed
            newUserForm.reset();  
        }  
    }//END: funtion btnClick()      
}
