import express from 'express';
const router = express.Router();
import { transactFuns } from '../data/index.js';

router.route('/summary').get(async (req, res) => {
  try {
    const data = await transactFuns.getAllTransactions();
    return res.render('summary', {
      summary: data
    })
  } catch (error) {
    return res.status(404).render('home', {
      errorMessage: "Summary page not found."
    })
  }

});

router.route('/transaction_summary/:id').get(async (req, res) => {
  const id = req.body.id;
  try {
    return res.render('/transaction_summary', {
      transaction: transaction
    })
  } catch (error) {

  }
  const transaction = await transactFuns(id);

})

export default router
