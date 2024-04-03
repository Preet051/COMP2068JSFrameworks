const express = require('express');
const router = express.Router();

// Home page route
router.get('/', (req, res) => {
  res.render('index', { title: 'Bookkeeping Home', message: 'Welcome to Your Bookkeeping Dashboard!' });
});

// Transactions page route
router.get('/transactions', (req, res) => {
  // Placeholder data
  const transactions = [
    { date: '2024-04-01', type: 'Income', amount: 100 },
    { date: '2024-04-02', type: 'Expense', amount: 50 }
  ];
  res.render('transactions', { title: 'Transactions', transactions });
});

// Add Transaction page route
router.get('/add', (req, res) => {
  res.render('add', { title: 'Add Transaction' });
});

// POST route for adding a transaction (requires body-parser middleware)
router.post('/add', (req, res) => {
  // Here you would typically add the transaction to a database
  // and then redirect to the transactions page, for example:
  // res.redirect('/transactions');
});

// Summary page route
router.get('/summary', (req, res) => {
  // Placeholder summary data
  const summary = {
    totalIncome: 100,
    totalExpenses: 50,
    netIncome: 50
  };
  res.render('summary', { title: 'Summary', summary });
});

module.exports = router;
