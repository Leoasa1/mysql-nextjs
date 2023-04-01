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
			const [rows] = await connectDB.execute(
				'SELECT * FROM user WHERE username = ? OR email = ?',
				[username, email]
			);
			if (rows.length > 0) {
				return res.status(409).json({ errors: 'User Already Exists' });
			}

			// Hash password
			const salt = await bcrypt.genSalt(10);
			const hashedPassword = await bcrypt.hash(password, salt);

			// Insert user into database
			await connectDB.execute(
				'INSERT INTO user (username, password, firstName, lastName, email) VALUES (?, ?, ?, ?, ?)',
				[username, hashedPassword, firstName, lastName, email]
			);

			// Generate JWT token
			const token = jwt.sign(
				{ username },
				'KprVapS2t3g0bxJBu8iemo3xKNB9A0'
			);

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
		// validate if values are empty
		if (!errors.isEmpty()) {
			return res.status(400).json({
				errors: errors.array(),
			});
		}
		// create a connect to sql-db and check for username
		const { username, password } = req.body;
		try {
			const [rows] = await connectDB.execute(
				'SELECT * FROM user WHERE username = ?',
				[username]
			);

			if (rows.length === 0) {
				return res.status(401).json({ errors: 'Invalid credentials' });
			}

			const user = rows[0];

			// check if password matches after dycrption
			const isMatch = await bcrypt.compare(password, user.password);
			if (!isMatch) {
				return res.status(401).json({ errors: 'Invalid credentials' });
			}

			// respond with user info
			const payload = {
				username: user.username,
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
			};

			jwt.sign(
				payload,
				'KprVapS2t3g0bxJBu8iemo3xKNB9A0',
				{ expiresIn: '10h' },
				(err, token) => {
					if (err) throw err;
					res.json({
						username: user.username,
						firstName: user.firstName,
						lastName: user.lastName,
						email: user.email,
						token: token,
					});
				}
			);
		} catch (error) {
			console.error(error);
			res.status(500).json({ errors: 'Internal Server Error' });
		}
	}
);

module.exports = router;
