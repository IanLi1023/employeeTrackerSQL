const mysql = require('mysql2');
const util = require('util');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'employee_db',
    port: 3306
});

connection.connect((err) => {
    if (err) throw err;
    //console.log('Database connected.');
});
connection.query = util.promisify(connection.query) 

module.exports = connection;
