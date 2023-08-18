import express from "express";
const router = express.Router();
import { transactFuns } from "../data/index.js";

router.route("/").get(async (req, res) => {
  console.log("This is inside of the route");
  if (!req.session.user) return res.redirect("/");
  else console.log("This is in the route");
  res.status(200).render("transactions", {
    layout: "user",
    title: "Transaction",
  });
});

router.route("/summary").get(async (req, res) => {
  try {
    const data = await transactFuns.getAllTransactions();
    return res.render("partials/summary", {
      layout: "main",
      title: "Summary",
      summary: data,
    });
  } catch (error) {
    return res.status(404).render("transactions", {
      errorMessage: "Summary page not found.",
    });
  }
});

router.route("/transaction_summary/:id").get(async (req, res) => {
  const id = req.params.id;
  try {
    const transaction = await getTransactionById(id);
    if (transaction) {
      return res.render("summary", {
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
    const { category, transactionInfo, amount, transactionDate } = req.body;
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
  return res.render("categories/income", { transactions: transactions });
});
router.route("/savings").get(async (req, res) => {
  const transactions = await transactFuns.getTransactionsByCategory("Savings");
  return res.render("categories/savings");
});
router.route("/expenditures").get(async (req, res) => {
  const transactions = await transactFuns.getTransactionsByCategory(
    "Expenditures"
  );
  return res.render("categories/expenditures");
});
router.route("/investments").get(async (req, res) => {
  const transactions = await transactFuns.getTransactionsByCategory(
    "Investments"
  );
  return res.render("categories/investments");
});
router.route("/retirement").get(async (req, res) => {
  const transactions = await transactFuns.getTransactionsByCategory(
    "Retirement"
  );
  return res.render("categories/retirement");
});

export default router;
