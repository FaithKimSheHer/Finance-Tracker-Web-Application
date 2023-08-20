import express from 'express';
import { dbConnection, closeConnection } from '../config/mongoConnection.js';
import { users } from '../config/mongoCollections.js';
import { transaction } from '../config/mongoCollections.js';
// import { getTransactionsByUserEmail } from '../data/transactions.js';
import { getTransactionsByUserEmail, getMonthlyAggregateByCategory, getTransactionsByCategory } from '../data/transactions.js';
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

    let totalIncome = 0, totalSavings = 0, totalExpenditure = 0, totalRetirement = 0, totalInvestment = 0;

    for (let i = 0; i < transactionList.length; i++) {

      const dateTime = transactionList[i].dateOfTransaction;
      const parts = dateTime.split("/");
      var month = parts[0];
      var year = parts[2];
      var currentdate = new Date();
      var cur_month = currentdate.getMonth() + 1;
      var cur_year = currentdate.getFullYear();

      //get total values for each category
      if (transactionList[i].category.toString().toUpperCase() === "INCOME") { totalIncome += Number(transactionList[i].amount.toString()); }
      if (transactionList[i].category.toString().toUpperCase() === "SAVINGS") { totalSavings += Number(transactionList[i].amount.toString()); }
      if (transactionList[i].category.toString().toUpperCase() === "EXPENDITURE") { totalExpenditure += Number(transactionList[i].amount.toString()); }
      if (transactionList[i].category.toString().toUpperCase() === "RETIREMENT") { totalRetirement += Number(transactionList[i].amount.toString()); }
      if (transactionList[i].category.toString().toUpperCase() === "INVESTMENT") { totalInvestment += Number(transactionList[i].amount.toString()); }
      ///

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

    function getMonthNumber(monthName) {
      const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      return months.indexOf(monthName) + 1; // +1 because month numbers are usually 1-12 and array indices are 0-11
    }


    //bar chart function to fetch data from db based on month and year
    //month should be number from 1 to 12
    //year should be number
    const getTransactionsDataForMonth = async (email, month, year) => {
      const transactionCollection = await getTransactionsByUserEmail(email);  //get all transactions for given email
      // console.log("getTransactionsDataForMonth: " + transactionCollection)
      // console.log(transactionCollection[1])
      const currentDate = new Date();  //get current date

      let lastDay;
      //if current month and year is the same as the month and year passed in, then last day is the current date
      if (currentDate.getMonth() + 1 === month && currentDate.getFullYear() === year) {
        lastDay = currentDate.getDate();
      } else {
        lastDay = new Date(year, month, 0).getDate();
      }


      const startOfMonth = new Date(year, month - 1, 1);  //get start of month
      const endOfMonth = new Date(year, month - 1, lastDay);  //get end of month

      //sort out transactionCollection to include only transactions for the given month
      const transactions = transactionCollection.filter(transaction => {
        const date = new Date(transaction.dateOfTransaction);
        return date >= startOfMonth && date <= endOfMonth;
      });

      //get all transactions for the month as array
      // const transactions = await transactionCollection.find({
      //   dateOfTransaction: {
      //     $gte: startOfMonth.toISOString(),
      //     $lte: endOfMonth.toISOString(),
      //   }
      // }).toArray();

      //calculate total for each category
      let results = {
        income: 0,
        savings: 0,
        expenditure: 0,
        retirement: 0,
        investment: 0
      };

      //loop through each transaction and add to the total for each category
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

      //return the results
      return results;
    };


    // console.log(getTransactionsDataForMonth(req.session.user.email, 8, 2021));

    //use the above function to get data in the format of array of objects for the past 12 months


    // const bardata = await getTransactionsDataForPast12Months(obj.email);
    const userEmail = req.session.user.email;
    
    const test8 = await getTransactionsByCategory(userEmail, "income")
    // console.log(test8);
    // console.log(expenditureArray);
    // console.log(past12MonthData)

    //convert each array into a string separated by commas
    // const incomeString = incomeArray.join(',');
    // const savingsString = savingsArray.join(',');
    // const expenditureString = expenditureArray.join(',');
    // const retirementString = retirementArray.join(',');
    // const investmentString = investmentArray.join(',');

    // console.log("incomeString: " + incomeString);
    // console.log("savingsString: " + savingsString);
    // console.log("expenditureString: " + expenditureString);
    // console.log("retirementsString: " + retirementString);
    // console.log("investmentString: " + investmentString);

    //monthly values for each category
    //const monthlyInformation = await getMonthlyAggregateByCategory(obj.email);
    const monthlyInformation = await getMonthlyAggregateByCategory(req.session.user.email);
    // console.log(monthlyInformation);

    const monthlyIncome = monthlyInformation.incomeTrxByMonth;
    // console.log(monthlyIncome);
    const monthlySavings = monthlyInformation.savingsTrxByMonth;
    const monthlyExpenditure = monthlyInformation.expenditureTrxByMonth;
    const monthlyRetirement = monthlyInformation.retirementTrxByMonth;
    const monthlyInvestment = monthlyInformation.investmentTrxByMonth;

    const monthNamesShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    //Get current date
    const currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();

    const keyList = [];
    //const monthsFull = [];
    //const yearFull = [];
    for (let i = 0; i < 12; i++) {
      keyList.unshift(`${monthNamesShort[currentMonth]}${currentYear}`);
      
      currentMonth -= 1;
      if (currentMonth < 0) {
        currentMonth = 11;  // Reset to December
        currentYear -= 1;  // Decrease year
      }
    }

    console.log(keyList);

    // with the given keyList, get the values for each category
    const monthlyIncomeValues = [];
    const monthlySavingsValues = [];
    const monthlyExpenditureValues = [];
    const monthlyRetirementValues = [];
    const monthlyInvestmentValues = [];

    for (let i = 0; i < keyList.length; i++) {
      const key = keyList[i];
      monthlyIncomeValues.push(monthlyIncome[key] || 0);
      monthlySavingsValues.push(monthlySavings[key] || 0);
      monthlyExpenditureValues.push(monthlyExpenditure[key] || 0);
      monthlyRetirementValues.push(monthlyRetirement[key] || 0);
      monthlyInvestmentValues.push(monthlyInvestment[key] || 0);
    }
    
    /////////// Suggestion feature ///////////
    const suggestionList = [];

    //Set some thresholds for each category percentages
    
    //If the savings is below this percentage, then 
    const savingsThreshold = 20;
    // const retirementThreshold = 40;
    // const investmentThreshold = 40;
    const expenditureThreshold = 70;


    //Make suggestions based on the all data of 5 categories for the user

    const totalDollars = totalSavings + totalRetirement + totalInvestment - totalExpenditure; //Total current financial assets is everything minus expenditures
    //calculate some percentages
    // const investmentPercent = (totalInvestment / totalDollars) * 100;
    // const retirementPercent = (totalRetirement / totalDollars) * 100;
    const savingsPercent = (totalSavings / totalDollars) * 100;

    const netCashflow = totalIncome - totalExpenditure; //net cashflow value of EVERYTHING to present tallied up (can be negative), excludes financial assets/cash in the bank
    const expenditurePercent = (totalExpenditure / totalIncome) * 100;

    //incorrect syntax vvv
    // const spendingTooMuch = toString("You are spending " + expenditurePercent + "% of your income. Consider cutting back on your expenses. It's recommended to spend no more than " + expenditureThreshold + "% of your income."); //If expenditure is more than 50% of income
    // if (expenditurePercent > 50) { suggestionList.push(spendingTooMuch) }

    if (netCashflow <= 0) { suggestionList.push("You are spending more than you are making. Consider cutting back on your expenses.") } //If cashflow is negative

    // const incomePercent = (totalIncome / totalDollars) * 100;
    // const expenditurePercent = (totalExpenditure / totalDollars) * 100;

    if (savingsPercent > savingsThreshold) { suggestionList.push("You have too much money in savings. Consider moving idle cash into either an investment account or your retirement fund.") } //If savings is less than 20% of total assets
    // if (retirementPercent < )
    // if (investmentPercent < 10) { suggestionList.push(toString("You should invest a greater portion of your financial portfolio. ")) //If investment is less than 10% of total assets



    res.status(200).render("dashboard", {
      user: req.session.user,
      layout: "main",
      include: "partials/update",
      summary: data,
      title: 'Overall Transaction Representation',
      piechartdata: resultString,
      monthlyStatus: statusValue,
      // barchartdata: bardata,
      suggestions: suggestionList,

      incomeData: monthlyIncomeValues,
      savingsData: monthlySavingsValues,
      expenditureData: monthlyExpenditureValues,
      retirementData: monthlyRetirementValues,
      investmentData: monthlyInvestmentValues

      // incomeData: incomeString,
      // savingsData: savingsString,
      // expenditureData: expenditureString,
      // retirementData: retirementString,
      // investmentData: investmentString
    });
  });

export default router;