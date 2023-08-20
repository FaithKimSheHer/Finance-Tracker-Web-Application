import express from 'express';
import { dbConnection, closeConnection } from '../config/mongoConnection.js';
import { users } from '../config/mongoCollections.js';
import { transaction } from '../config/mongoCollections.js';
//import * as coll from "../config/mongoCollections.js";
const router = express.Router();
import {
  transactFuns
} from "../data/index.js";

//rendering partials: https://waelyasmina.medium.com/a-guide-into-using-handlebars-with-your-express-js-application-22b944443b65
//we want transaction summary, calculations, dashboard to be on home (landing) page.
router
  .route('/')
  .get(async (req, res) => {
    //TODO: check if user is logged in using browser session data
    //if not, load a diff summary bar and other stuff on page.
    //put a register button in middle or smt

    //if logged in, load the data accordingly

    var toKeep = ['email'];

    const obj = JSON.parse(JSON.stringify(
      req.session.user,
      (key, value) => !key || toKeep.indexOf(key) > -1 ? value : undefined,
    ));

    const transactionCollection = await transaction();
    const data = await transactFuns.getMostRecentTransactionsByUserEmail(req.session.user.email);
    let income = 0, savings = 0, expenditure = 0, retirement = 0, investment = 0;
    const transactionList = await transactionCollection.find({ userEmail: obj.email }).project({ _id: 0, category: 1, amount: 1, dateOfTransaction: 1 }).toArray();

    for (let i = 0; i < transactionList.length; i++) {

      const dateTime = transactionList[i].dateOfTransaction;
      const parts = dateTime.split("/");
      var month = parts[0];
      var year = parts[2];
      var currentdate = new Date();
      var cur_month = currentdate.getMonth() + 1;
      var cur_year = currentdate.getFullYear();

      if (cur_month == month && year == cur_year) {
        if (transactionList[i].category.toString().toUpperCase() === "INCOME") {
          income += Number(transactionList[i].amount.toString());
        }

        if (transactionList[i].category.toString().toUpperCase() === "SAVINGS") {
          savings += Number(transactionList[i].amount.toString());
        }

        if (transactionList[i].category.toString().toUpperCase() === "EXPENDITURE") {
          expenditure += Number(transactionList[i].amount.toString());
        }

        if (transactionList[i].category.toString().toUpperCase() === "RETIREMENT") {
          retirement += Number(transactionList[i].amount.toString());
        }

        if (transactionList[i].category.toString().toUpperCase() === "INVESTMENT") {
          investment += Number(transactionList[i].amount.toString());
        }
      } else {
        //alert("not in this month");
      }
    }

    let totalMonthlyStatus = income - savings - expenditure - retirement - investment;
    // let totalMonthlyStatus = income - expenditure;
    let statusValue;

    if (totalMonthlyStatus > 0) {
      statusValue = 'Green';
    }
    else {
      statusValue = 'Red';
    }

    let resultString = income.toString() + "," + savings.toString() + "," + expenditure.toString() + "," + retirement.toString() + "," + investment.toString();


    //bar chart function to fetch data from db based on month and year
    const getTransactionsDataForMonth = async (email, month, year) => {
      const transactionCollection = await transaction();
      let lastDay;

      const currentDate = new Date();
      if (currentDate.getMonth() + 1 === month && currentDate.getFullYear() === year) {
        lastDay = currentDate.getDate();
      } else {
        lastDay = new Date(year, month, 0).getDate();
      }

      const startOfMonth = new Date(year, month - 1, 1);
      const endOfMonth = new Date(year, month - 1, lastDay);

      const transactions = await transactionCollection.find({
        userEmail: email,
        dateOfTransaction: {
          $gte: startOfMonth.toISOString(),
          $lte: endOfMonth.toISOString(),
        }
      }).toArray();

      let results = {
        income: 0,
        savings: 0,
        expenditure: 0,
        retirement: 0,
        investment: 0
      };

      transactions.forEach(transaction => {
        switch (transaction.category.toUpperCase()) {
          case 'INCOME':
            results.income += transaction.amount;
            break;
          case 'SAVINGS':
            results.savings += transaction.amount;
            break;
          case 'EXPENDITURE':
            results.expenditure += transaction.amount;
            break;
          case 'RETIREMENT':
            results.retirement += transaction.amount;
            break;
          case 'INVESTMENT':
            results.investment += transaction.amount;
            break;
        }
      });

      return results;
      

    };

    //use the above function to get data in the format of array of objects for the past 12 months
    const getTransactionsDataForPast12Months = async (email) => {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1;
      const currentYear = currentDate.getFullYear();

      let results = [];
      for (let i = 0; i < 12; i++) {
        let month = currentMonth - i;
        let year = currentYear;
        if (month <= 0) {
          month = 12 + month;
          year = year - 1;
        }
        const data = await getTransactionsDataForMonth(email, month, year);
        results.push(data);
      }

      return results;
    };

    const bardata = await getTransactionsDataForPast12Months(obj.email);

    res.status(200).render("dashboard", {
      user: req.session.user,
      layout: "main",
      include: "partials/update",
      summary: data,
      title: 'Overall Transaction Representation',
      piechartdata: resultString,
      monthlyStatus: statusValue,
      barchartdata: bardata
    });
  });

export default router;