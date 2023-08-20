import express from 'express';
import {dbConnection, closeConnection} from '../config/mongoConnection.js';
import {users} from '../config/mongoCollections.js';
import {transaction} from '../config/mongoCollections.js'; 
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
          let income=0,savings=0,expenditure=0,retirement=0,investment=0;
          const transactionList = await transactionCollection.find({userEmail:obj.email}).project({_id:0, category: 1, amount: 1 , dateOfTransaction:1}).toArray();

          for(let i=0;i<transactionList.length;i++)
          {
          
            const dateTime = transactionList[i].dateOfTransaction;
            const parts = dateTime.split("/");
            var month = parts[0];
            var year = parts[2];
            var currentdate = new Date();
            var cur_month = currentdate.getMonth() + 1;
            var cur_year = currentdate.getFullYear();

            if (cur_month == month && year == cur_year) 
            {
                if(transactionList[i].category.toString().toUpperCase()==="INCOME")
                {
                    income+=Number(transactionList[i].amount.toString());
                }

                if(transactionList[i].category.toString().toUpperCase()==="SAVINGS")
                {
                    savings+=Number(transactionList[i].amount.toString());
                }

                if(transactionList[i].category.toString().toUpperCase()==="EXPENDITURE")
                {
                    expenditure+=Number(transactionList[i].amount.toString());
                }

                if(transactionList[i].category.toString().toUpperCase()==="RETIREMENT")
                {
                    retirement+=Number(transactionList[i].amount.toString());
                }

                if(transactionList[i].category.toString().toUpperCase()==="INVESTMENT")
                {
                    investment+=Number(transactionList[i].amount.toString());
                }
            } else {
            //alert("not in this month");
            }
          }

          let resultString = income.toString()+","+savings.toString()+","+expenditure.toString()+","+retirement.toString()+","+investment.toString();
    
        res.status(200).render("dashboard", {
            user: req.session.user,
            layout: "main",
            include: "partials/update",
            summary: data,
            title: 'Overall Transaction Representation',
            piechartdata:resultString
        });
});

export default router;