import {
  transaction
} from "../config/mongoCollections.js";
import {
  ObjectId
} from "mongodb";

const createTransaction = async (
  category,
  transactionInfo,
  amount,
  dateOfTransaction,
  receiptFilename,
  pathOfFilename,
  userEmail,
  userComments
) => {
  try {
    // Validation and error handling logic for transaction inputs
    if (!category || typeof category !== "string") {
      throw "Invalid category input";
    }
    if (
      ![
        "income",
        "savings",
        "expenditure",
        "retirement",
        "investment",
      ].includes(category)
    ) {
      throw "Invalid category value";
    }

    if (!transactionInfo || typeof transactionInfo !== "string") {
      throw "Invalid transactionInfo input";
    }

    if (!Number.isInteger(amount) || amount <= 0) {
      throw "Invalid amount input";
    }

    if (!(dateOfTransaction instanceof Date)) {
      throw "Invalid dateOfTransaction input";
    }

    if (!userEmail || typeof userEmail !== "string") {
      throw "Invalid userEmail input";
    }

    if (!userComments || typeof userComments !== "string") {
      throw "Invalid userComments input";
    }

    const transactionCollection = await transaction();
    const newTransaction = {
      category: category,
      amount: amount,
      dateOfTransaction: dateOfTransaction,
      userEmail: userEmail,
    };

    // Only add certain fields if they are provided
    if (userComments) {
      newTransaction.userComments = userComments;
    }

    if (transactionInfo) {
      newTransaction.transactionInfo = transactionInfo;
    }

    if (receiptFilename || pathOfFilename) {
      if (
        typeof receiptFilename !== "string" ||
        typeof pathOfFilename !== "string"
      ) {
        throw "Invalid receiptFilename or pathOfFilename input";
      }

      const fileExtension = receiptFilename.split(".").pop().toLowerCase();
      if (!["jpg", "jpeg", "png"].includes(fileExtension)) {
        throw "Invalid file type, only jpg, jpeg, or png allowed";
      }

      newTransaction.receiptFilename = receiptFilename;
      newTransaction.pathOfFilename = pathOfFilename;
    }

    const insertInfo = await transactionCollection.insertOne(newTransaction);
    if (!insertInfo.acknowledged || !insertInfo.insertedId) {
      throw "Could not add transaction";
    }

    return insertInfo.ops[0];
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

const getTransactionById = async (transactionId) => {
  try {
    if (!transactionId) {
      throw "You must provide a transaction ID to search for";
    }

    if (typeof transactionId !== "string" || !ObjectId.isValid(transactionId)) {
      throw "Invalid transaction ID";
    }

    const transactionCollection = await transactions();
    const transaction = await transactionCollection.findOne({
      _id: new ObjectId(transactionId),
    });

    if (!transaction) {
      throw "Transaction not found";
    }

    return transaction;
  } catch (error) {
    console.error("Error:", error);

    return null;
  }
};

const getTransactionsByUserEmail = async (userEmail) => {
  try {
    if (!userEmail) {
      throw "You must provide a user ID to search for transactions";
    }

    if (typeof userEmail !== "string") {
      throw "Invalid user ID";
    }

    const transactionCollection = await transaction();
    const userTransactions = await transactionCollection
      .find({
        userEmail: userEmail,
      })
      .toArray();

    return userTransactions;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};

const getAllTransactions = async () => {
  const transactionCollection = await transaction();
  const allTransactions = await transactionCollection.find({}).toArray();

  return allTransactions;
};

const getMostRecentTransactionsByUserEmail = async (userEmail, limit = 5) => {
  try {
    if (!userEmail) {
      throw "You must provide a user ID to search for transactions";
    }

    if (typeof userEmail !== "string") {
      throw "Invalid user ID";
    }


    const transactionCollection = await transaction();
    const userTransactions = await transactionCollection
      .find({
        userEmail: userEmail
      })
      .sort({
        dateOfTransaction: -1
      }) // Sort by date in descending order
      .limit(limit)
      .toArray();

    return userTransactions;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};

const getTransactionsByCategory = async (userEmail, category) => {
  try {
    if (!userEmail || typeof userEmail !== "string") {
      throw "Invalid user ID";
    }

    if (!category || typeof category !== "string") {
      throw "Invalid category input";
    }

    if (
      ![
        "income",
        "savings",
        "expenditure",
        "retirement",
        "investment",
      ].includes(category)
    ) {
      throw "Invalid category value";
    }

    const transactionCollection = await transaction();
    const transactionsByCategory = await transactionCollection
      .find({
        userEmail: userEmail,
        category: category,
      })
      .toArray();

    return transactionsByCategory;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }

};

export {
  createTransaction,
  getTransactionById,
  getTransactionsByUserEmail,
  getAllTransactions,
  getMostRecentTransactionsByUserEmail,
  getTransactionsByCategory,
};