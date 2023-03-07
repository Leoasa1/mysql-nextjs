const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connectDB = require('../services/database');

const router = express.Router();

router.post(
	'/register',
	[
		check('firstName', 'Name is required').not().isEmpty(),
		check('lastName', 'Lastname is required').not().isEmpty(),
		check('email', 'Please include a valid email').isEmail(),
		check(
			'password',
			'Please enter a password with 6 or more characters'
		).isLength({ min: 6 }),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: 'Invalid credentials' });
		}

		const { username, password, firstName, lastName, email } = req.body;

		try {
			// Check if user already exists
			const promisePool = connectDB.promise();
			const [rows] = await promisePool.execute(
				'SELECT * FROM user WHERE (username, email) = (?, ?)',
				[username, email]
			);
			if (rows.length > 0) {
				return res.status(400).json({ errors: 'Invalid credentials' });
			}

			// Hash password
			const salt = await bcrypt.genSalt(10);
			const hashedPassword = await bcrypt.hash(password, salt);

			// Insert user into database
			await promisePool.execute(
				'INSERT INTO user (username, password, firstName, lastName, email) VALUES (?, ?, ?, ?, ?)',
				[username, hashedPassword, firstName, lastName, email]
			);

			// Generate JWT token
			const token = jwt.sign({ username }, 'secret_key');

			// Return registered user's information and token
			res.status(201).json({
				username,
				firstName,
				lastName,
				email,
				token,
			});
		} catch (error) {
			console.error(error);
			res.status(500).send('Internal server error');
		}
	}
);

router.post(
	'/login',
	[check('password', 'Password is required').exists()],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({
				errors: errors.array(),
			});
		}
		const { username, password } = req.body;
		const promisePool = connectDB.promise();
		try {
			const [rows] = await promisePool.execute(
				'SELECT * FROM user WHERE username = ?',
				[username]
			);

			if (rows.length === 0) {
				return res.status(401).json({ errors: 'Invalid credentials' });
			}

			const user = rows[0];

			const isMatch = await bcrypt.compare(password, user.password);

			if (!isMatch) {
				return res.status(401).json({ errors: 'Invalid credentials' });
			}

			const payload = {
				user: {
					id: user.id,
				},
			};

			jwt.sign(
				payload,
				'secret_key',
				{ expiresIn: '1h' },
				(err, token) => {
					if (err) throw err;
					res.json({
						username: user.username,
						firstName: user.firstName,
						lastName: user.lastName,
						email: user.email,
						token,
					});
				}
			);
		} catch (error) {
			console.error(error);
			res.status(500).json({ errors: 'Internal Server Error' });
		}
	}
);

// Protect routes that require authentication
// router.get('/protected', (req, res) => {
// 	const token = req.headers.authorization?.split(' ')[1];
// 	try {
// 		const decoded = jwt.verify(token, 'secret_key');
// 		const username = decoded.username;
// 		// ...
// 	} catch (error) {
// 		res.status(401).send('Unauthorized');
// 	}
// });

module.exports = router;
