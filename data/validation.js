const exportedMethods = {
    checkFN(firstName){
        let goodFN = undefined; 
        if(!firstName)                        throw "fistName doesn't exist"; 
        if(typeof firstName !== 'string')     throw "firstName type error";
        firstName = firstName.trim().toLowerCase();
        if(firstName.includes(" "))           throw "firstName can't include an empty space";
        if(firstName.length < 2)              throw "firstName can't be < 2"; 
        if (/\d/.test(firstName))             throw "firstName can't have a digit"; 
        if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(firstName))  throw "firstName can't have a special character";  
        goodFN = firstName.toLowerCase();   
        return goodFN;
    },
  
    checkLN(lastName){
        let goodLN = undefined; 
        if(!lastName)                        throw "lastName doesn't exist"; 
        if(typeof lastName !== 'string')     throw "lastName type error";
        lastName = lastName.trim().toLowerCase();
        if(lastName.includes(" "))           throw "lastName can't include an empty space";
        if(lastName.length < 2)              throw "lastName can't be < 2"; 
        if (/\d/.test(lastName))             throw "lastName can't have a digit"; 
        if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(lastName))  throw "lastName can't have a special character";  
        goodLN = lastName;   
        return goodLN;
    },
    
    checkEM(email){
        let goodEMA = undefined; 
        if(!email)                        throw "email doesn't exist";     
        if(typeof email !== 'string')     throw "email type error";
        email = email.trim().toLowerCase();
        if(email.length===0)              throw "email can't be an empty string";
        if(email.includes(" "))           throw "email can't include an empty space";
        if(!email.includes("@"))          throw "email doens't include '@'";
        if(!email.includes("."))          throw "email doesn't include ','";
        if(email.substring(0, email.indexOf('@')).length === 0)                    throw "email doesn't exist";  
        if(email.substring(email.indexOf('@')), email.indexOf('.').length === 0)   throw "email doesn't exist";
        if(email.substring(email.indexOf('.'), -1).length === 0) throw "email doesn't exist"; 
        goodEMA = email;  
        return goodEMA;
    },
    
    checkUN(userName){
        let goodUN = undefined; 
        if(!userName)                        throw "userName doesn't exist";       
        if(typeof userName !== 'string')     throw "userName type error";
        userName = userName.trim();
        if(userName.includes(" "))           throw "userName can't include an empty space character";
        if(userName.length < 2)              throw "userName can't be less than 2"; 
        goodUN = userName;   
        return goodUN;
    },
    
    checkPW(password){
        let goodPW = undefined; 
        if(!password)                        throw "password doesn't exist";       
        if(typeof password !== 'string')     throw "password type error";
        password = password.trim();
        if(password.includes(" "))           throw "password can't include an empty space character";
        if(password.length < 8)              throw "password can't be less than 8";
        if (!/[A-Z]/.test(password))         throw "password must include at least one CAPITAL letter";
        if (!/\d/.test(password))            throw "password must include at least one digit";  
        if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password))  throw "password must include at least one special charactor";   
        goodPW = password;   
        return goodPW;
    },
    
    checkCT(city){
        let goodCT = undefined;  
        if(!city)                        throw "city doesn't exist";       
        if(typeof city !== 'string')     throw "city type error";
        city = city.trim(); 
        if(city.length === 0)            throw "city can't be empty string";  
        if(city.length < 2)              throw "city can't be less than 2"; 
        if (/\d/.test(city))             throw "city can't include a digit"; 
        if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(city))  throw "city can't include special charactor";   
        goodCT = city.split(" ").filter(str => str.length > 0).join(" ").toLowerCase();   
        return goodCT;
    },
    
    checkST(state){
        let goodST = undefined;  
        if(!state)                        throw "state doesn't exist";       
        if(typeof state !== 'string')     throw "state type error";
        state = state.trim(); 
        if(state.length !==  2)           throw "state muste be two letters"; 
        if (/\d/.test(state))             throw "state can't include a digit"; 
        if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(state))  throw "state can't include special charactor";     
        goodST = state.toUpperCase();    
        return goodST;
    },
    
    checkAG(age){
        let goodAG = undefined; 
            if(!age)                                    throw "age doesn't exist";       
            if(typeof age == 'string')                  goodAG = parseInt(age.trim()); 
            else if(typeof age == 'number' && age < 18) throw 'You must be 18 or older';  
            if(age >= 18 || goodAG >=18)                goodAG = age;    
        return goodAG;
    }
};
 
export default exportedMethods;