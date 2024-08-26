const express = require('express');
const router = express.Router();
const { Account } = require('../db');
const authMiddleware = require('../Middleware/auth');
const mongoose = require('mongoose');

// Route to get the balance of the current user
// Assuming you have an accountController that handles balance retrieval
router.get('/balance', authMiddleware, async (req, res) => {
  try {
      const userId = req.userId; // Assuming you have user ID from the JWT token
      const account = await Account.findOne({ userId });
      
      if (!account) {
          return res.status(404).json({ message: "Account not found" });
      }

      res.json({ balance: account.balance });
  } catch (error) {
      console.error('Error fetching balance:', error);
      res.status(500).json({ message: 'Server error' });
  }
});


router.post('/transfer', authMiddleware, async (req, res) => {
    
      const { amount, to } = req.body;
  
      if (!amount || !to) {
        return res.json({ msg: 'Amount and recipient required' });
      }
  
      const transferAmount = parseFloat(amount);
      if (isNaN(transferAmount) || transferAmount <= 0) {
        return res.json({ msg: 'Invalid amount' });
      }
  
      const account = await Account.findOne({ userId: req.userId });
      if (!account || account.balance < transferAmount) {
        return res.json({ msg: 'Insufficient balance' });
      }
  
      const toAccount = await Account.findOne({ userId: to });
      if (!toAccount) {
        return res.json({ msg: 'Invalid recipient account' });
      }
  
      await Account.updateOne({ userId: req.userId }, { $inc: { balance: -transferAmount } });
      await Account.updateOne({ userId: to }, { $inc: { balance: transferAmount } });
  
      res.json({ msg: 'Transfer successful' });
    
  });
  

module.exports = router;
