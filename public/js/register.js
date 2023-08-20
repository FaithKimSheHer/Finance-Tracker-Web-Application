// register.handlebars.registration-form
let newUserForm = document.getElementById('newUserForm'); 
let newUserFirstName = document.getElementById('newUserFirstName').value;
let newUserLastName = document.getElementById('newUserLastName').value;
let newUserEmail = document.getElementById('newUserEmail').value;
let newUserName = document.getElementById('newUserName').value;
let newUserPassword = document.getElementById('newUserPassword').value;
let confirmPasswordInput = document.getElementById('confirmPasswordInput').value;
let newUserCity = document.getElementById('newUserCity').value;
let newUserState = document.getElementById('newUserState').value;

if( !newUserForm ||
    !newUserFirstName ||
    !newUserLastName || 
    !newUserEmail ||
    !newUserName ||
    !newUserPassword||
    !confirmPasswordInput||
    !newUserCity ||
    !newUserState){
        console.log("newUserForm field error");
        newUserForm.reset(); 
}  
else{
    function btnClick(){  
        try{  
            let firstName = newUserFirstName.trim().toLowerCase();
            if(firstName.includes(" "))           throw "firstName can't include an empty space";
            if (firstName.length < 2) throw "firstName can't be < 2"; 
            if (firstName.length > 20) throw "firstName can't be > 20";
            if (/\d/.test(firstName))             throw "firstName can't have a digit"; 
            if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(firstName))  throw "firstName can't have a special character";

            let lastName = newUserLastName.trim().toLowerCase();
            if(lastName.includes(" "))           throw "lastName can't include an empty space";
            if (lastName.length < 2) throw "lastName can't be < 2"; 
            if (lastName.length > 20) throw "lastName can't be > 20";
            if (/\d/.test(lastName))             throw "lastName can't have a digit"; 
            if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(lastName))  throw "lastName can't have a special character"; 

            let email = newUserEmail.trim().toLowerCase();
            if(email.length===0)              throw "email can't be an empty string";
            if(email.includes(" "))           throw "email can't include an empty space";
            if(!email.includes("@"))          throw "email doens't include '@'";
            if(!email.includes("."))          throw "email doesn't include ','";
            if(email.substring(0, email.indexOf('@')).length === 0)                           throw "email doesn't exist";  
            if(email.substring(email.indexOf('@')), email.indexOf('.').length === 0)   throw "email doesn't exist";
            if (email.substring(email.indexOf('.'), -1).length === 0) throw "email doesn't exist"; 
            if (/[!#$%^&*()_+\-=[\]{};':"\\|,<>/?]/.test(email)) throw "email can't have certain special character";
            
            let userName = newUserName.trim();
            if(userName.includes(" "))           throw "userName can't include an empty space character";
            if (userName.length < 2) throw "userName can't be less than 2"; 
            if (userName.length > 20) throw "userName can't be more than 20";
            if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(userName)) throw "userName can't have a special character"; 

            let password = newUserPassword.trim();
            if(password.includes(" "))           throw "password can't include an empty space character";
            if (password.length < 8) throw "password can't be less than 8";
            if (password.length > 20) throw "password can't be more than 20";
            if (!/[a-z]/.test(password))         throw "password must include at least one lower case letter";
            if (!/[A-Z]/.test(password))         throw "password must include at least one CAPITAL letter";
            if (!/\d/.test(password))            throw "password must include at least one digit";  
            if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password))  throw "password must include at least one special charactor";

            if(confirmPasswordInput !== password) throw "confirmPasswordInput must be the same with the password"; 

            let city = newUserCity.trim();    
            if(city.length === 0)            throw "city can't be empty string";  
            if (city.length < 2) throw "city can't be less than 2";
            if (city.length > 20) throw "city can't be more than 20";
            if (/\d/.test(city))             throw "city can't include a digit"; 
            if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(city))  throw "city can't include special charactor";   
            city = city.split(" ").filter(str => str.length > 0).join(" ").toLowerCase(); 
            
            let state = newUserState.trim();     
            if(state.length !==  2)           throw "state muste be two letters"; 
            if (/\d/.test(state))             throw "state can't include a digit"; 
            if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(state))  throw "state can't include special charactor";  
        } catch (e) { 
            console.log(e);  
            // The form should reset itself every time after an input has been processed
            newUserForm.reset();  
        }  
    }//END: funtion btnClick()      
}
