import {
  dbConnection,
  closeConnection
} from '../config/mongoConnection.js';
import {
  users
} from '../config/mongoCollections.js';
import {
  usersFuncs
} from '../data/index.js';

let userOne = undefined;
async function main() {
  try {
    const db = await dbConnection();
  } catch (e) {
    console.log(e);
  }
  try {
    const userCollection = await users();

    let userOne = await usersFuncs.remove("64d7d267c4231a7a56285373");

    // let newPerson_1 = {
    //   firstName:        "Faith",
    //   lastName:         " Kim",
    //   email:            "fkim@stevens.edu",
    //   userName:         "fkim",
    //   hashedPassword:   "helloFinalProject",
    //   city:             "Fort Lee",
    //   state:            "NJ",
    //   age:              52
    // } 
    // const insertInfo_1 = await userCollection.insertOne(newPerson_1);
    // if (!insertInfo_1.acknowledged || !insertInfo_1.insertedId)     throw 'Could not add user'; 
    // else console.log(newPerson_1);

    // let newPerson_2 = {
    //     firstName:        "Bobby",
    //     lastName:         " Kim",
    //     email:            "ttizen@gmail.com",
    //     userName:         "BBkim",
    //     hashedPassword:   "(201)7412604",
    //     city:             "Fort Lee",
    //     state:            "NJ",
    //     age:              55
    //   } 
    //   const insertInfo_2 = await userCollection.insertOne(newPerson_2);
    //   if (!insertInfo_2.acknowledged || !insertInfo_2.insertedId)     throw 'Could not add user'; 
    //   else console.log(newPerson_2);

    //   let newPerson_3 = {
    // firstName:        "Bethesta",
    // lastName:         " Kim",
    // email:            "bt@gmail.com",
    // userName:         "BBkim",
    // hashedPassword:   "(201)7412716",
    // city:             "Fort Lee",
    // state:            "NJ",
    // age:              24
    //   } 
    //   const insertInfo_3 = await userCollection.insertOne(newPerson_3);
    //   if (!insertInfo_3.acknowledged || !insertInfo_3.insertedId)     throw 'Could not add user'; 
    //   else console.log(newPerson_3); 
    // const userOne = await usersFuncs.addUser({
    //   newUserFirstName: "Biu",
    //   newUserLastName: "in",
    //   newUserEmail: "iiiicoqtreg@mail.com",
    //   newUserName: "asoutrewqalllwmnb",
    //   newUserPassword: "K1nn1th!",
    //   newUserCity: "Nutley",
    //   newUserState: "NJ",
    //   type: "user",
    //   newUserAge: 23
    // });

    // const userTwo = await usersFuncs.create(
    //   "Biu",
    //   "in",
    //   "ccpoicoqg@mail.com",
    //   "asoutrewqalll",
    //   "K1nn1th!",
    //   "Nutley",
    //   "NJ",
    //   23
    // );
  } catch (e) {
    console.log(e);
  }


  console.log("------------------------");
  console.log('Done seeding database');


  await closeConnection();
} //END: main()
main()