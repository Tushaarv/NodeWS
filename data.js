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

var getTableName = function(request) {
  var tableName = request.route.path;
  console.log(tableName);
  tableName = tableName.substring(1, tableName.length);
  console.log(tableName);
  if(tableName.indexOf('/') > 1 ) {
    tableName = tableName.substring(0, tableName.indexOf('/'));
  }
  console.log(tableName);
  return tableName;
};

// Read all rows in User Table
exports.read = function(request,response) {
    var tableName = getTableName(request);
    dbObject.query('SELECT * FROM ' + tableName, function(errorReceived, result) {
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
    var tableName = getTableName(request);
    console.log('Retrieving : ' + requestObjectId);
    dbObject.query('SELECT * FROM '+ tableName + ' Where ID = ?', [requestObjectId], function(errorReceived, result) {
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
    var tableName = getTableName(request);
    console.log(tableName);
    dbObject.query('INSERT INTO ' + tableName + ' SET ?', requestObject, function(errorReceived, result) {
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
    var tableName = getTableName(request);

    dbObject.query(
        'UPDATE ' + tableName + ' SET ? Where ID = ?', [requestObject, requestObjectId],
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
    var tableName = getTableName(request);

    dbObject.query(
        'DELETE FROM ' + tableName + ' WHERE id = ?', [requestObjectId],
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
