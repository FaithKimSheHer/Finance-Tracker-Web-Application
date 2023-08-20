import {dbConnection, closeConnection} from '../config/mongoConnection.js';
import {users} from '../config/mongoCollections.js';
import {transaction} from '../config/mongoCollections.js'; 
//import { usersFuncs } from '../data/index.js';
import bcrypt from 'bcrypt'; 
const saltRounds = 10; 

/**
 * The primary seeded user for this app will be:
 * 
 * Email: fkim@stevens.edu
 * Password: fkim@stevens.edu1T
 */

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
    
    let hashedPassword = await bcrypt.hash("fkim@stevens.edu1T", saltRounds); 
    let accountCreationDate = new Date().toLocaleDateString();
    let newPerson_1 = {
        firstName:        "Faith",
        lastName:         "Kim",
        email:            "fkim@stevens.edu",
        userName:         "fkim",
        hashedPassword:   hashedPassword,
        city:             "Fort Lee",
        state:            "NJ", 
        age:              52,
        type:             "user", 
        accountCreationDate:        accountCreationDate
    }

    const insertInfo_1 = await userCollection.insertOne(newPerson_1);
    if (!insertInfo_1.acknowledged || !insertInfo_1.insertedId)     throw 'Could not add user'; 
    else console.log(newPerson_1);
    
    hashedPassword = await bcrypt.hash("ttizen@gmail.com2T", saltRounds);
    let newPerson_2 = {
        firstName:        "Bobby",
        lastName:         "Kim",
        email:            "ttizen@gmail.com",
        userName:         "BBkim",
        hashedPassword:   hashedPassword,
        city:             "Fort Lee",
        state:            "NJ",
        age:              55,
        type:             "user", 
        accountCreationDate:        accountCreationDate
      } 
      const insertInfo_2 = await userCollection.insertOne(newPerson_2);
      if (!insertInfo_2.acknowledged || !insertInfo_2.insertedId)     throw 'Could not add user'; 
      else console.log(newPerson_2);

      hashedPassword = await bcrypt.hash("bt@gmail.com3T", saltRounds);
      let newPerson_3 = {
        firstName:        "Bethesta",
        lastName:         "Kim",
        email:            "bt@gmail.com",
        userName:         "BBkim",
        hashedPassword:   hashedPassword,
        city:             "Fort Lee",
        state:            "NJ",
        age:              24,
        type:             "user", 
        accountCreationDate:        accountCreationDate
      } 
      const insertInfo_3 = await userCollection.insertOne(newPerson_3);
      if (!insertInfo_3.acknowledged || !insertInfo_3.insertedId)     throw 'Could not add user'; 
      else console.log(newPerson_3); 
  }catch (e) {
    console.log(e);
  } 
 
  try{
    const transactionCollection = await transaction();

    let transaction_1 = {
      category:          "income",
      transactionInfo:   "Monthly Remuneration",
      amount:            50000,

      dateOfTransaction: "08/19/2023",
      receiptFilename:   "salary.png",
      pathOfFilename:    "c:/users/project/data/salary.png",
      userEmail:         "fkim@stevens.edu",
      userComments:      "My first Salary of the year"
    } 
    const transactionInfo_1 = await transactionCollection.insertOne(transaction_1);
    if (!transactionInfo_1.acknowledged || !transactionInfo_1.insertedId)     throw 'Could not add transaction'; 
    else console.log(transactionInfo_1);

    let transaction_2 = {
      category:          "income",
      transactionInfo:   "Monthly Remuneration 2",
      amount:            60000,
      dateOfTransaction: "08/19/2023",

      receiptFilename:   "salary2.png",
      pathOfFilename:    "c:/users/project/data/salary2.png",
      userEmail:         "fkim@stevens.edu",
      userComments:      "My trading Income"
    } 
    const transactionInfo_2 = await transactionCollection.insertOne(transaction_2);
    if (!transactionInfo_2.acknowledged || !transactionInfo_2.insertedId)     throw 'Could not add transaction'; 
    else console.log(transactionInfo_2);

    let transaction_3 = {
      category:          "savings",
      transactionInfo:   "Saving for Car",
      amount:            6000,
      dateOfTransaction: "08/19/2023",
      receiptFilename:   "None",
      pathOfFilename:    "None",
      userEmail:         "fkim@stevens.edu",
      userComments:      "Savings Car"
    } 
    const transactionInfo_3 = await transactionCollection.insertOne(transaction_3);
    if (!transactionInfo_3.acknowledged || !transactionInfo_3.insertedId)     throw 'Could not add transaction'; 
    else console.log(transactionInfo_3);

    let transaction_4 = {
      category:          "expenditure",
      transactionInfo:   "Rent",
      amount:            2000,
      dateOfTransaction: "08/19/2023",

      receiptFilename:   "None",
      pathOfFilename:    "None",
      userEmail:         "fkim@stevens.edu",
      userComments:      "Rent Expenses"
    } 
    const transactionInfo_4 = await transactionCollection.insertOne(transaction_4);
    if (!transactionInfo_4.acknowledged || !transactionInfo_4.insertedId)     throw 'Could not add transaction'; 
    else console.log(transactionInfo_4);


    let transaction_5 = {
      category:          "retirement",
      transactionInfo:   "Contribution to 401k",
      amount:            10000,
      dateOfTransaction: "08/19/2023",
      receiptFilename:   "None",
      pathOfFilename:    "None",
      userEmail:         "fkim@stevens.edu",
      userComments:      "Retirement Contribution"
    } 
    const transactionInfo_5 = await transactionCollection.insertOne(transaction_5);
    if (!transactionInfo_5.acknowledged || !transactionInfo_5.insertedId)     throw 'Could not add transaction'; 
    else console.log(transactionInfo_5);

    let transaction_6 = {
      category:          "investment",
      transactionInfo:   "Purchasing Stocks",
      amount:            10000,
      dateOfTransaction: "08/19/2023",
      receiptFilename:   "None",
      pathOfFilename:    "None",
      userEmail:         "fkim@stevens.edu",
      userComments:      "Retirement Contribution"
    } 
    const transactionInfo_6 = await transactionCollection.insertOne(transaction_6);
    if (!transactionInfo_6.acknowledged || !transactionInfo_6.insertedId)     throw 'Could not add transaction'; 
    else console.log(transactionInfo_6);

    
    let transaction_7 = {
      category:          "investment",
      transactionInfo:   "Purchasing Bonds",
      amount:            10000,
      dateOfTransaction: "08/19/2023",
      receiptFilename:   "None",
      pathOfFilename:    "None",
      userEmail:         "fkim@stevens.edu",
      userComments:      "Retirement Contribution"
    } 
    const transactionInfo_7 = await transactionCollection.insertOne(transaction_7);
    if (!transactionInfo_7.acknowledged || !transactionInfo_7.insertedId)     throw 'Could not add transaction'; 
    else console.log(transactionInfo_7);

  }
  catch (e) {
    console.log(e);
  } 
  
console.log("------------------------");
console.log('Done seeding database');
await closeConnection();
}//END: main()
main()
