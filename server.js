var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');

// Object For Database Transactions
var employees = require('./data');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded());

// User Transaction
app.get('/employees', employees.read);
app.get('/employees/:id', employees.readById);
app.post('/employees', employees.create);
app.put('/employees/:id', employees.update);
app.delete('/employees/:id', employees.delete);

app.listen(8081);
console.log('Listening on port 8081...');
