var express = require('express');
var app = express();
// var fs = require("fs"); // For Hardcoded Retreival
// var users = require('./routes/data');
var users = require('./data');

// app.configure(function () {
// app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
// app.use(express.bodyParser());
// });

logger = require('morgan');
app.use(logger('dev'));
var bodyParser = require('body-parser');
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded());


app.get('/users', users.read);
app.get('/user/:id', users.readById);
app.post('/users', users.create);
app.put('/users/:id', users.update);
app.delete('/users/:id', users.delete);

app.listen(8081);
console.log('Listening on port 8081...');


// Hardcoded Retreival
// app.get('/listUsers', function (req, res) {
//    fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
//       console.log( data );
//       res.end( data );
//    });
// })

// For Hardcoded Retreival

// var server = app.listen(8081, function () {
//    var host = server.address().address
//    var port = server.address().port
//
//    console.log("Example app listening at http://%s:%s", host, port)
// })
