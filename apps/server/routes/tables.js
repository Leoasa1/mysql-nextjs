const express = require('express');
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

const router = express.Router();

const createTablesSql = fs
	.readFileSync(path.join(__dirname, '../SQLite.sql'), 'utf8')
	.toString();

router.post('/createTables', async (req, res) => {
	const tableArray = createTablesSql.split(/;/);
	const connection = await mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: 'pasadena22',
		database: 'new_schema',
		connectionLimit: 15,
	});

	try {
		for (let i = 0; i < tableArray.length - 1; i++) {
			await connection.query(`${tableArray[i]}`);
		}
		res.status(200).send('Tables created successfully');
	} catch (error) {
		console.error(error);
		res.status(500).send('Error creating tables');
	} finally {
		connection.end();
	}
});

module.exports = router;
