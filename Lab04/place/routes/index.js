const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Travel Destinations' });
});

router.get('/india', function(req, res, next) {
  res.render('india', { title: 'India' });
});

router.get('/bali', function(req, res, next) {
  res.render('bali', { title: 'Bali' });
});

router.get('/london', function(req, res, next) {
  res.render('london', { title: 'London' });
});

router.get('/maldives', function(req, res, next) {
  res.render('maldives', { title: 'Maldives' });
});

module.exports = router;
