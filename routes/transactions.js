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
  if (!req.session.user) return res.redirect("./login");
  return res.render("transactions", {
    layout: 'user',
    title: "Transaction"
  });
}).post(async (req, res) => {
  const data = req.body;

  try {
    const transactionCollection = await transaction()
    console.log("Heeeere"+data.transactionDate);
    console.log(data.transactionAmount);
    console.log(data.updateSelector);

    const dateObj = new Date(data.transactionDate + 'T00:00:00');
  

    let transactionData = {
      category: data.updateSelector,
      transactionInfo: data.transactionInfo,
      amount: data.transactionAmount,
      dateOfTransaction: new Intl.DateTimeFormat('en-US').format(dateObj),
      receiptFilename: "None",
      pathOfFilename: "None",
      userEmail: req.session.user.email,
      userComments: data.transactionInfo
    }
    const newTransaction = await transactionCollection.insertOne(transactionData);
    if (!newTransaction.acknowledged || !newTransaction.insertedId)
      throw 'Could not add transaction';
    else console.log(transactionData);
    return res.redirect('/');
  } catch (error) {
    console.log(error);
    return res.redirect("/");
  }
});

// router.route("/transaction_summary/:id").get(async (req, res) => {
//   const id = req.params.id;
//   try {
//     const transaction = await transactFuns.getTransactionById(id);
//     if (transaction) {
//       return res.render("partials/update", {
//         transaction: transaction,
//       });
//     } else {
//       throw "Transaction not found";
//     }
//   } catch (error) {
//     console.error(error);
//     return res
//       .status(404)
//       .send(
//         "Transaction not found or an error occurred while fetching the transaction."
//       );
//   }
// });


router.route("/income").get(async (req, res) => {
  const transactions = await transactFuns.getTransactionsByCategory(req.session.user.email, "income");
  const data = await transactFuns.getMostRecentTransactionsByUserEmail(req.session.user.email);
  console.log("/income, user, transactions", [req.session.user.email, transactions]);
  return res.render("categories/income", {
    transactions: transactions,
    user: req.session.user,
    include: "partials/update",
    summary: data
  });
});

router.route("/savings").get(async (req, res) => {
  const transactions = await transactFuns.getTransactionsByCategory(req.session.user.email, "savings");
  const data = await transactFuns.getMostRecentTransactionsByUserEmail(req.session.user.email);
  console.log("/savings, user", [req.session.user]);
  return res.render("categories/savings", {
    transactions: transactions,
    user: req.session.user,
    include: "partials/update",
    summary: data
  });
});

router.route("/expenditures").get(async (req, res) => {
  const transactions = await transactFuns.getTransactionsByCategory(req.session.user.email, "expenditure");
  const data = await transactFuns.getMostRecentTransactionsByUserEmail(req.session.user.email);
  console.log("/expenditures, user", [req.session.user]);
  return res.render("categories/expenditures", {
    transactions: transactions,
    user: req.session.user,
    include: "partials/update",
    summary: data
  });
});

router.route("/investments").get(async (req, res) => {
  const userEmail = req.session.user.email;
  const transactions = await transactFuns.getTransactionsByCategory(
    userEmail,
    "investment"
  );
  const data = await transactFuns.getMostRecentTransactionsByUserEmail(req.session.user.email);
  return res.render("categories/investments", {
    transactions: transactions,
    user: req.session.user,
    include: "partials/update",
    summary: data
  });

});

router.route("/retirement").get(async (req, res) => {
  const userEmail = req.session.user.email;
  const transactions = await transactFuns.getTransactionsByCategory(
    userEmail,
    "retirement"
  );
  const data = await transactFuns.getMostRecentTransactionsByUserEmail(req.session.user.email);
  return res.render("categories/retirement", {
    transactions: transactions,
    user: req.session.user,
    include: "partials/update",
    summary: data
  });
});

export default router;