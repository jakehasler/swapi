// DEPS ==========================
var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');
var logger = require('morgan');
var mongoose = require('mongoose');
require('dotenv').config();
var debug = require('debug')('app');
var blog = require('./routes/blog')
var api = require('./routes/api')

// HOME PAGE =======================
app.get('/', function (req, res) {
	var obj = { title: 'Welcome to Jakespress!'};
	res.render('index.ejs', obj);
});

// ROUTES ==========================
app.use('/api', api);

// VIEWS ===========================
app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'ejs');

// OTHER ===========================
app.use(logger('dev'));

// STATIC ==========================
app.use(express.static(path.join(__dirname, '/public')));


// ERROR ===========================
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// SERVER ==========================
app.listen(3500, function() {
  console.log('Jakespress is listening on port 3500!');
});


module.exports = app;