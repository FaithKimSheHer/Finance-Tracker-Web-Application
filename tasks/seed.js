import {dbConnection, closeConnection} from '../config/mongoConnection.js';
import {users} from '../config/mongoCollections.js'; 
import { usersFuncs } from '../data/index.js';

let userOne = undefined;  
async function main() {
  try{
    const db = await dbConnection();
    await db.dropDatabase();
  }catch (e) {
    console.log(e);
  } 
  try{ 
    const userCollection = await users();

    let newPerson_1 = {
      firstName:        "Faith",
      lastName:         " Kim",
      email:            "fkim@stevens.edu",
      userName:         "fkim",
      hashedPassword:   "(631) 8967161",
      city:             "Fort Lee",
      state:            "NJ",
      age:              52
    } 
    const insertInfo_1 = await userCollection.insertOne(newPerson_1);
    if (!insertInfo_1.acknowledged || !insertInfo_1.insertedId)     throw 'Could not add user'; 
    else console.log(newPerson_1);
    
    let newPerson_2 = {
        firstName:        "Bobby",
        lastName:         " Kim",
        email:            "ttizen@gmail.com",
        userName:         "BBkim",
        hashedPassword:   "(201)7412604",
        city:             "Fort Lee",
        state:            "NJ",
        age:              55
      } 
      const insertInfo_2 = await userCollection.insertOne(newPerson_2);
      if (!insertInfo_2.acknowledged || !insertInfo_2.insertedId)     throw 'Could not add user'; 
      else console.log(newPerson_2);

      let newPerson_3 = {
        firstName:        "Bethesta",
        lastName:         " Kim",
        email:            "bt@gmail.com",
        userName:         "BBkim",
        hashedPassword:   "(201)7412716",
        city:             "Fort Lee",
        state:            "NJ",
        age:              24
      } 
      const insertInfo_3 = await userCollection.insertOne(newPerson_3);
      if (!insertInfo_3.acknowledged || !insertInfo_3.insertedId)     throw 'Could not add user'; 
      else console.log(newPerson_3); 
  }catch (e) {
    console.log(e);
  } 

  
console.log("------------------------");
console.log('Done seeding database');
await closeConnection();
}//END: main()
main()
