import { transaction } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";

const createTransaction = async (
  category,
  transactionInfo,
  amount,
  dateOfTransaction,
  receiptFilename,
  pathOfFile,
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
      throw new Error("Invalid category value");
    }

    if (!transactionInfo || typeof transactionInfo !== "string") {
      throw new Error("Invalid transactionInfo input");
    }

    if (transactionInfo.length > 200) {
      throw new Error("Transaction info must be less than 200 characters");
    }

    if (/<.*?>/.test(transactionInfo)) {
      throw new Error("Transaction info cannot contain HTML tags");
    }

    if (
      typeof amount !== "number" ||
      amount <= 0 ||
      amount > 1000000000 ||
      !/^[1-9]\d*(\.\d{1,2})?$/.test(amount.toFixed(2)) // Regex to check if amount has no leading zeros and has 2 decimal places
    ) {
      throw new Error("Invalid amount input");
    }

    if (!(dateOfTransaction instanceof Date)) {
      throw new Error("Invalid dateOfTransaction input");
    }

    if (!userEmail || typeof userEmail !== "string") {
      throw new Error("Invalid userEmail input");
    }

    if (!userComments || typeof userComments !== "string") {
      throw new Error("Invalid userComments input");
    }

    if (userComments.length > 200) {
      throw new Error("User comments must be less than 200 characters");
    }

    if (/<.*?>/.test(userComments)) {
      throw new Error("Transaction info cannot contain HTML tags");
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
      newTransaction.userComments = userComments.trim();
    }

    if (transactionInfo) {
      newTransaction.transactionInfo = transactionInfo.trim();
    }

    if (receiptFilename || pathOfFilename) {
      if (
        typeof receiptFilename !== "string" ||
        typeof pathOfFile !== "string"
      ) {
        throw new Error("Invalid receiptFilename or pathOfFile input");
      }

      const fileExtension = receiptFilename.split(".").pop().toLowerCase();
      if (!["jpg", "jpeg", "png"].includes(fileExtension)) {
        throw new Error("Invalid file type, only jpg, jpeg, or png allowed");
      }

      newTransaction.receiptFilename = receiptFilename.trim();
      newTransaction.pathOfFile = pathOfFile.trim();
    }

    const insertInfo = await transactionCollection.insertOne(newTransaction);
    if (!insertInfo.acknowledged || !insertInfo.insertedId) {
      throw new Error("Could not add transaction");
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
      throw new Error("You must provide a transaction ID to search for");
    }

    if (typeof transactionId !== "string" || !ObjectId.isValid(transactionId)) {
      throw new Error("Invalid transaction ID");
    }

    const transactionCollection = await transactions();
    const transaction = await transactionCollection.findOne({
      _id: new ObjectId(transactionId),
    });

    if (!transaction) {
      throw new Error("Transaction not found");
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
      throw new Error("You must provide a user ID to search for transactions");
    }

    if (typeof userEmail !== "string") {
      throw new Error("Invalid user ID");
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
      throw new Error("You must provide a user ID to search for transactions");
    }

    if (typeof userEmail !== "string") {
      throw new Error("Invalid userEmail");
    }

    const transactionCollection = await transaction();
    const userTransactions = await transactionCollection
      .find({
        userEmail: userEmail,
      })
      .sort({
        dateOfTransaction: -1,
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
      throw new Error("Invalid user ID");
    }

    if (!category || typeof category !== "string") {
      throw new Error("Invalid category input");
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
      throw new Error("Invalid category value");
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