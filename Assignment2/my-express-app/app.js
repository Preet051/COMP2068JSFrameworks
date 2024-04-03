const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const { engine } = require('express-handlebars');

// MongoDB Connection
const mongoDB = 'mongodb+srv://preeet1:preeet1234@cluster0.dzpvaww.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(mongoDB)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const app = express();

// Schema and Model (assuming they are defined here for simplicity)
const Schema = mongoose.Schema;
const TransactionSchema = new Schema({
  date: { type: Date, required: true },
  type: { type: String, required: true, enum: ['Income', 'Expense'] },
  amount: { type: Number, required: true }
});
const Transaction = mongoose.model('Transaction', TransactionSchema);

app.engine('hbs', engine({
  defaultLayout: 'layouts',
  extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Home Page Route
app.get('/', (req, res) => {
  res.render('home', { title: 'Home' }); // Assuming the home view is home.hbs
});

// Add Transaction Page Route
app.get('/add', (req, res) => {
  res.render('add', { title: 'Add New Transaction' }); // Assuming the add view is add.hbs
});

// POST route to create a new transaction
app.post('/add', (req, res) => {
  // Example handling form data to save a new transaction
  // Make sure to have body-parser or express.json() & express.urlencoded() middleware for this to work
  const { date, type, amount } = req.body;
  const transaction = new Transaction({ date, type, amount });

  transaction.save()
    .then(() => res.redirect('/transactions'))
    .catch(err => res.status(500).send('Error saving transaction.'));
});

// Transactions Page Route
app.get('/transactions', (req, res) => {
  Transaction.find()
    .then(transactions => {
      res.render('transactions', { title: 'Transactions', transactions }); // Assuming the transactions view is transactions.hbs
    })
    .catch(err => res.status(500).send('Error retrieving transactions.'));
});

// Summary Page Route
app.get('/summary', (req, res) => {
  // Example aggregation to calculate summary - adjust according to your actual needs
  Transaction.aggregate([
    {
      $group: {
        _id: null,
        totalIncome: { $sum: { $cond: [{ $eq: ["$type", "Income"] }, "$amount", 0] } },
        totalExpenses: { $sum: { $cond: [{ $eq: ["$type", "Expense"] }, "$amount", 0] } },
        netIncome: { $sum: "$amount" } // Simplified; adjust as needed
      }
    }
  ])
  .then(([summary]) => {
    res.render('summary', { title: 'Summary', ...summary });
  })
  .catch(err => res.status(500).send('Error calculating summary.'));
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server running on port ${port}`));

module.exports = app;
