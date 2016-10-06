var mysql = require("mysql");

// First you need to create a connection to the db
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "bidchat123",
  database: "NodeWS"
});

con.connect(function(err){
  if(err){
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
});

// Read
con.query('SELECT * FROM employees',function(err,rows){
  if(err) throw err;

  console.log('Data received from Db:\n');
  console.log(rows);

  for (var i = 0; i < rows.length; i++) {
    console.log(rows[i].name);
  };

});

// Create
// var employee = { name: 'Haresh', password: 'password4', profession:'Sailor'};
// con.query('INSERT INTO employees SET ?', employee, function(err,res){
//   if(err) throw err;
//
//   console.log('Last insert ID:', res.insertId);
// });

// Update
// con.query(
//   'UPDATE employees SET profession = ? Where ID = ?',
//   ["FisherMan", 13],
//   function (err, result) {
//     if (err) throw err;
//
//     console.log('Changed ' + result.changedRows + ' rows');
//   }
// );

//Delete
// con.query(
//   'DELETE FROM employees WHERE id = ?',
//   [13],
//   function (err, result) {
//     if (err) throw err;
//
//     console.log('Deleted ' + result.affectedRows + ' rows');
//   }
// );

con.query('SELECT * FROM employees',function(err,rows){
  if(err) throw err;

  console.log('Data received from Db:\n');
  console.log(rows);

  for (var i = 0; i < rows.length; i++) {
    console.log(rows[i].name);
  };

});

con.end(function(err) {
  // The connection is terminated gracefully
  // Ensures all previously enqueued queries are still
  // before sending a COM_QUIT packet to the MySQL server.
});
