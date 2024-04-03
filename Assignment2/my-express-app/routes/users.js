const express = require('express');
const router = express.Router();

// Login page route
router.get('/login', (req, res) => {
    res.render('login'); // Render login.hbs template for the login page
});

// Register page route
router.get('/register', (req, res) => {
    res.render('register'); // Render register.hbs template for the register page
});

// Handle login form submission
router.post('/login', (req, res) => {
    // Handle login form submission logic here
});

// Handle registration form submission
router.post('/register', (req, res) => {
    // Handle registration form submission logic here
});

module.exports = router;
