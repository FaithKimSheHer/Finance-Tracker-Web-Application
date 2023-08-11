import { transaction } from '../config/mongoCollections.js';
import { ObjectId } from 'mongodb';

const createTransaction = async (category, transactionInfo, amount, dateOfTransaction, receiptFilename, pathOfFilename, userId, userComments) => {
  //Validation and error handling logic for transaction inputs
    if (!category || typeof category !== 'string') {
    throw 'Invalid category input';
  }
  if (!['Income', 'Savings', 'Expenditure', 'Retirement', 'Investment'].includes(category)) {
    throw 'Invalid category value';
  }
    
    if (!transactionInfo || typeof transactionInfo !== 'string') {
    throw 'Invalid transactionInfo input';
  }

  if (!Number.isInteger(amount) || amount <= 0) {
    throw 'Invalid amount input';
  }

  if (!(dateOfTransaction instanceof Date)) {
    throw 'Invalid dateOfTransaction input';
  }

  if (!userId || typeof userId !== 'string') {
    throw 'Invalid userId input';
  }

  if (!userComments || typeof userComments !== 'string') {
    throw 'Invalid userComments input';
  }

  const transactionCollection = await transaction();
  const newTransaction = {
    category: category,
    amount: amount,
    dateOfTransaction: dateOfTransaction,
    userId: userId,
  };

  // Only add certain fields if they are provided
    if (userComments) {
    newTransaction.userComments = userComments;
    }
    
    if (transactionInfo) {
    newTransaction.transactionInfo = transactionInfo;
    }
    
  if (receiptFilename && pathOfFilename) {
    newTransaction.receiptFilename = receiptFilename;
    newTransaction.pathOfFilename = pathOfFilename;
  }
    


  const insertInfo = await transactionCollection.insertOne(newTransaction);
  if (!insertInfo.acknowledged || !insertInfo.insertedId) throw 'Could not add transaction';

  return insertInfo.ops[0];
};


const getTransactionById = async (transactionId) => {
  if (!transactionId) {
    throw 'You must provide a transaction ID to search for';
  }

  if (typeof transactionId !== 'string' || !ObjectId.isValid(transactionId)) {
    throw 'Invalid transaction ID';
  }

  const transactionCollection = await transactions();
  const transaction = await transactionCollection.findOne({ _id: new ObjectId(transactionId) });

  if (!transaction) {
    throw 'Transaction not found';
  }

  return transaction;
};

const getTransactionsByUserId = async (userId) => {
  if (!userId) {
    throw 'You must provide a user ID to search for transactions';
  }

  if (typeof userId !== 'string') {
    throw 'Invalid user ID';
  }

  const transactionCollection = await transaction();
  const userTransactions = await transactionCollection.find({ userId: userId }).toArray();

  return userTransactions;
};


const getAllTransactions = async () => {
  const transactionCollection = await transaction();
  const allTransactions = await transactionCollection.find({}).toArray();

  return allTransactions;
};

const getMostRecentTransactionsByUserId = async (userId, limit = 5) => {
  if (!userId) {
    throw 'You must provide a user ID to search for transactions';
  }

  if (typeof userId !== 'string') {
    throw 'Invalid user ID';
  }

  const transactionCollection = await transaction();
  const userTransactions = await transactionCollection
    .find({ userId: userId })
    .sort({ dateOfTransaction: -1 }) // Sort by date in descending order
    .limit(limit)
    .toArray();

  return userTransactions;
};



export { createTransaction, getTransactionById, getTransactionsByUserId, getAllTransactions, getMostRecentTransactionsByUserId};
