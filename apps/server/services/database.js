// require(‘dotenv’).config();
const mysql = require('mysql2');

const pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: 'pasadena22',
	database: 'new_schema',
	connectionLimit: 15,
});

module.exports = pool;
