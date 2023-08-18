import express from "express";
const router = express.Router();
import {
  transactFuns
} from "../data/index.js";
import {
  dbConnection,
  closeConnection
} from '../config/mongoConnection.js';
import {
  transaction
} from '../config/mongoCollections.js';

router.route("/").get(async (req, res) => {
  if (!req.session.user) return res.redirect("/");
  res.status(200).render("transactions", {
    layout: "user",
    title: "Transaction",
  });
}).post(async (req, res) => {
  const data = req.body;

  try {
    const transactionCollection = await transaction()
    console.log(data.transactionDate);
    console.log(data.transactionAmount);
    console.log(data.updateSelector);
    let transactionData = {
      category: data.updateSelector,
      transactionInfo: data.transactionInfo,
      amount: data.transactionAmount,
      dateOfTransaction: data.transactionDate,
      receiptFilename: "None",
      pathOfFilename: "None",
      userEmail: req.session.user.email,
      userComments: data.transactionInfo
    }
    const newTransaction = await transactionCollection.insertOne(transactionData);
    if (!newTransaction.acknowledged || !newTransaction.insertedId)
      throw 'Could not add transaction';
    else console.log(transactionData);
    res.status(200).render("transactions", {
      layout: "user",
      title: "Transaction",
    });
  } catch (error) {
    console.log(error);
    return res.redirect("/");
  }
});

router.route("/summary").get(async (req, res) => {
  try {
    const data = await transactFuns.getTransactionsByUserId(req.session.user.email);
    return res.render("partials/update", {
      layout: "main",
      title: "Update",
      summary: data,
    });
  } catch (error) {
    return res.status(404).render("transactions", {
      errorMessage: "Update page not found.",
    });
  }
});

router.route("/transaction_summary/:id").get(async (req, res) => {
  const id = req.params.id;
  try {
    const transaction = await transactFuns.getTransactionById(id);
    if (transaction) {
      return res.render("partials/update", {
        transaction: transaction,
      });
    } else {
      throw "Transaction not found";
    }
  } catch (error) {
    console.error(error);
    return res
      .status(404)
      .send(
        "Transaction not found or an error occurred while fetching the transaction."
      );
  }
});

router.route("/add_transaction").post(async (req, res) => {
  try {
    const {
      category,
      transactionInfo,
      amount,
      transactionDate
    } = req.body;
    const userId = req.session.user;
    const dateOfTransaction = new Date(transactionDate);

    // Need to update for input such as receiptFilename, pathOfFilename.
    const newTransaction = await transactFuns.createTransaction(
      category,
      transactionInfo,
      amount,
      dateOfTransaction,
      null,
      null,
      userId,
      ""
    );

    if (newTransaction) {
      return res.redirect("/summary");
    } else {
      throw "Failed to create transaction";
    }
  } catch (error) {
    return res.status(500).render("error", {
      errorMessage: "Error adding transaction.",
    });
  }
});


router.route("/income").get(async (req, res) => {
  const transactions = await transactFuns.getTransactionsByCategory("Income");
  return res.render("categories/income", {
    transactions: transactions
  });
});
router.route("/savings").get(async (req, res) => {
  const transactions = await transactFuns.getTransactionsByCategory("Savings");
  return res.render("categories/savings", {
    transactions: transactions
  });
});
router.route("/expenditures").get(async (req, res) => {
  const transactions = await transactFuns.getTransactionsByCategory(
    "Expenditures"
  );
  return res.render("categories/expenditures", {
    transactions: transactions
  });
});
router.route("/investments").get(async (req, res) => {
  const transactions = await transactFuns.getTransactionsByCategory(
    "Investments"
  );
  return res.render("categories/investments", {
    transactions: transactions
  });
});
router.route("/retirement").get(async (req, res) => {
  const transactions = await transactFuns.getTransactionsByCategory(
    "Retirement"
  );
  return res.render("categories/retirement", {
    transactions: transactions
  });
});

export default router;