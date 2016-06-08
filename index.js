// DEPS ==========================
'use strict';
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const logger = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();
const debug = require('debug')('app');
const routes = require('./routes/index');

// ROUTES ==========================
app.use('/', routes);

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
app.listen(4000, function() {
  console.log('Swapi is listening on port 4000!');
});


module.exports = app;