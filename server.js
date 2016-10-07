var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');

// Object For Database Transactions
var users = require('./data');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded());

// User Transaction
app.get('/users', users.read);
app.get('/users/:id', users.readById);
app.post('/users', users.create);
app.put('/users/:id', users.update);
app.delete('/users/:id', users.delete);

app.listen(8081);
console.log('Listening on port 8081...');
