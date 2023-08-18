import express from "express";
const router = express.Router();
import {
  transactFuns
} from '../data/index.js';

router.route('/').get(async (req, res) => {
  console.log("This is inside of the route");
  if (!req.session.user)
    return res.redirect('/');
  else
    console.log("This is in the route");
  res.status(200).render('transactions', {
    layout: 'user',
    title: 'Transaction'
  });
})

router.route("/summary").get(async (req, res) => {
  try {
    const data = await transactFuns.getAllTransactions();
    return res.render('partials/summary', {
      layout: 'main',
      title: 'Summary',
      summary: data
    })
  } catch (error) {
    return res.status(404).render('transactions', {
      errorMessage: "Summary page not found."
    })
  }
});

router.route("/transaction_summary/:id").get(async (req, res) => {
  const id = req.body.id;
  const transaction = await transactFuns(id);
  try {
    return res.render('summary', {
      transaction: transaction
    })
  } catch (error) {

  }
});

router.route("/add_transaction").post(async (req, res) => {
  try {
    const newTransaction = req.body;
    await transactFuns.addTransaction(newTransaction);
    return res.redirect("/summary");
  } catch (error) {
    return res
      .status(500)
      .render("error", {
        errorMessage: "Error adding transaction."
      });
  }
});

export default router;
