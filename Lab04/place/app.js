const express = require('express');
const path = require('path');
const indexRouter = require('./routes/index');

const app = express();

// Set the view engine to EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Use the index router for the root route
app.use('/', indexRouter);

module.exports = app;
