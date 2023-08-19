const exportedMethods = {
    checkFN(firstName){
        if(!firstName)                        throw "invalid first name"; 
        if(typeof firstName !== 'string')     throw "first name type error";
        firstName = firstName.trim().toLowerCase();
        if(firstName.includes(" "))           throw "first name can't include an empty space";
        if(firstName.length < 2)              throw "first name can't be < 2"; 
        if (/\d/.test(firstName))             throw "first name can't have a digit"; 
        if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(firstName))  throw "first name can't have a special character";  
        return firstName;
    },
  
    checkLN(lastName){
        if(!lastName)                        throw "invalid last name"; 
        if(typeof lastName !== 'string')     throw "last name type error";
        lastName = lastName.trim().toLowerCase();
        if(lastName.includes(" "))           throw "last name can't include an empty space";
        if(lastName.length < 2)              throw "last name can't be < 2"; 
        if (/\d/.test(lastName))             throw "last name can't have a digit"; 
        if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(lastName))  throw "last name can't have a special character";  
        return lastName;
    },
    
    checkEM(email){
        if(!email)                        throw "invalid email";     
        if(typeof email !== 'string')     throw "email type error";
        email = email.trim().toLowerCase();
        if(email.length===0)              throw "email can't be an empty string";
        if(email.includes(" "))           throw "email can't include an empty space";
        if(!email.includes("@"))          throw "email doesn't include '@'";
        if(!email.includes("."))          throw "email doesn't include '.'";
        if(email.substring(0, email.indexOf('@')).length === 0)                    throw "invalid email";  
        if(email.substring(email.indexOf('@')), email.indexOf('.').length === 0)   throw "invalid email";
        if(email.substring(email.indexOf('.'), -1).length === 0) throw "invalid email"; 
        return email;
    },
    
    checkUN(userName){
        if(!userName)                        throw "invalid username";       
        if(typeof userName !== 'string')     throw "username type error";
        userName = userName.trim();
        if(userName.includes(" "))           throw "username can't include an empty space character";
        if(userName.length < 2)              throw "username can't be less than 2 characters long"; 
        return userName;   
    },
    
    checkPW(password){
        if(!password)                        throw "password doesn't exist";       
        if(typeof password !== 'string')     throw "password type error";
        password = password.trim();
        if(password.includes(" "))           throw "password can't include an empty space character";
        if(password.length < 8)              throw "password can't be less than 8 characters long";
        if (!/[A-Z]/.test(password))         throw "password must include at least one CAPITAL letter";
        if (!/\d/.test(password))            throw "password must include at least one digit";  
        if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password))  throw "password must include at least one special charactor";   
        return password;
    },
    
    checkCT(city){
        if(!city)                        throw "invalid city";       
        if(typeof city !== 'string')     throw "city type error";
        city = city.trim().split(" ").filter(str => str.length > 0).join(" ").toLowerCase()
        if(city.length === 0)            throw "city can't be empty string";  
        if(city.length < 2)              throw "city can't be less than 2 chars long"; 
        if (/\d/.test(city))             throw "city can't include a digit"; 
        if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(city))  throw "city can't include special charactor";   
        return city;
    },
    
    checkST(state){
        if(!state)                        throw "invalid state";       
        if(typeof state !== 'string')     throw "state type error";
        state = state.trim().toUpperCase(); 
        if(state.length !==  2)           throw "state must be two letters"; 
        if (/\d/.test(state))             throw "state can't include a digit"; 
        if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(state))  throw "state can't include special charactor";     
        return state;
    },
    
    checkAG(age){
        if(!age)                                    throw "invalid age";       
        if(typeof age == 'string')                  age = parseInt(age.trim()); 
        if(typeof age == 'number' && age < 18)      throw 'you must be 18 or older';  
        return age;
    }
};
 
export default exportedMethods;