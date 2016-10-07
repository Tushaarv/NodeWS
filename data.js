var dbMysql = require("mysql");

// First you need to create a connection to the db
var dbObject = dbMysql.createConnection({
    host: "localhost",
    user: "root",
    password: "bidchat123",
    database: "NodeWS"
});

dbObject.connect(function(err) {
    if (err) {
        console.log('Error connecting to Db');
        return;
    }
    console.log('Connection established');
});

// Read all rows in User Table
exports.read = function(request, response) {
    dbObject.query('SELECT * FROM employees', function(errorReceived, result) {
        if (errorReceived) {
            response.send({
                'error': 'An error has occurred' + errorReceived
            });
        } else {
            response.send(result);
        }
    });
};

// Read a row in User Table matching supplied id
exports.readById = function(request, response) {
    var requestObjectId = request.params.id;
    console.log('Retrieving : ' + requestObjectId);
    dbObject.query('SELECT * FROM employees Where ID = ?', [requestObjectId], function(errorReceived, result) {
        if (errorReceived) {
            response.send({
                'error': 'An error has occurred \n' + errorReceived
            });
        } else {
            response.send(result);
        }
    });
};

// Saving a User
exports.create = function(request, response) {
    var requestObject = request.body;
    console.log('Adding : ' + JSON.stringify(requestObject));
    dbObject.query('INSERT INTO employees SET ?', requestObject, function(errorReceived, result) {
        if (errorReceived) {
            response.send({
                'error': 'An error has occurred \n' + errorReceived
            });
        } else {
            requestObject.id = result.insertId;
            response.send(requestObject);
        }
    });
};

// Updating User
exports.update = function(request, response) {
    var requestObjectId = request.params.id;
    var requestObject = request.body;

    console.log('Updating : ' + requestObjectId);
    console.log(JSON.stringify(requestObject));

    dbObject.query(
        'UPDATE employees SET ? Where ID = ?', [requestObject, requestObjectId],
        function(errorReceived, result) {
            if (errorReceived) {
                console.log('Error updating User: ' + errorReceived);
                response.send({
                    'error': 'An error has occurred' + errorReceived
                });
            } else {
                console.log('' + result + ' document(s) updated');
                requestObject.id = requestObjectId;
                response.send(requestObject);
            }
        }
    );
};

// Delete User
exports.delete = function(request, response) {
    var requestObjectId = request.params.id;
    console.log('Deleting : ' + requestObjectId);
    dbObject.query(
        'DELETE FROM employees WHERE id = ?', [requestObjectId],
        function(errorReceived, result) {
            if (errorReceived) {
                response.send({
                    'error': 'An error has occurred - ' + errorReceived
                });
            } else {
                console.log('Deleted ' + result.affectedRows + ' rows');
                response.send(null);
            }
        }
    );
};
