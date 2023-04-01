const express = require('express');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const connectDB = require('../services/database');

const router = express.Router();

const validateUser = async (username) => {
	const [rows] = await connectDB.execute(
		'SELECT * FROM user WHERE username = ?',
		[username]
	);
	return rows.length > 0;
};

router.get('/product-details', async (req, res) => {
	const token = req.headers.authorization?.split(' ')[1];

	const { id } = req.query;

	try {
		const decoded = jwt.verify(token, 'KprVapS2t3g0bxJBu8iemo3xKNB9A0');
		const username = await decoded.username;

		if (await validateUser(username)) {
			const [products] = await connectDB.query(
				'SELECT * FROM products WHERE id = ?',
				[id]
			);
			const [reviews] = await connectDB.query(
				'SELECT * FROM reviews WHERE product_id = ?',
				[id]
			);

			const canReview =
				(await username) !== products[0].username &&
				!reviews.some((review) => review.username === username);

			res.status(200).json({ products, reviews, canReview });
		} else {
			res.status(401).json({ error: 'Unauthorized' });
		}
	} catch (error) {
		res.status(500).json(error);
	}
});

router.get('/search', async (req, res) => {
	const { category } = req.query;

	try {
		const [products] = await connectDB.query(
			'SELECT * FROM products WHERE category LIKE ?',
			[`%${category.join(', ')}%`]
		);
		res.status(200).json(products);
	} catch (error) {
		res.status(500).json(error);
	}
});

router.get('/all-products', async (req, res) => {
	const token = req.headers.authorization?.split(' ')[1];

	try {
		const decoded = jwt.verify(token, 'KprVapS2t3g0bxJBu8iemo3xKNB9A0');
		const username = await decoded.username;

		const [products] = await connectDB.query(
			'SELECT * FROM products WHERE username != ?',
			[username]
		);
		res.status(200).json(products);
	} catch (error) {
		res.status(500).json(error);
	}
});

router.get('/my-products', async (req, res) => {
	const token = req.headers.authorization?.split(' ')[1];

	try {
		const decoded = jwt.verify(token, 'KprVapS2t3g0bxJBu8iemo3xKNB9A0');
		const username = await decoded.username;

		if (await validateUser(username)) {
			const [products] = await connectDB.query(
				'SELECT * FROM products WHERE username = ?',
				[username]
			);
			res.status(200).json(products);
		}
	} catch (error) {
		res.status(500).json(error);
	}
});

router.post(
	'/insert',
	[
		check('title', 'Title is required')
			.not()
			.isEmpty()
			.isLength({ max: 25 }),
		check('product_desc', 'Product description is required')
			.not()
			.isEmpty(),
		check('category', 'Category is required').isArray().not().isEmpty(),
		check('price', 'Price is required').isNumeric().not().isEmpty(),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: 'Missing Info' });
		}
		const token = req.headers.authorization?.split(' ')[1];

		const { title, product_desc, category, price } = req.body;

		try {
			const decoded = jwt.verify(token, 'KprVapS2t3g0bxJBu8iemo3xKNB9A0');
			const username = await decoded.username;

			await connectDB.execute(
				'INSERT INTO products (username, title, product_desc, category, price) VALUES (?, ?, ?, ?, ?)',
				[
					username,
					title,
					product_desc,
					category.join(', '),
					Number(price),
				]
			);
			res.status(201).send('Product Created');
		} catch (error) {
			res.status(500).json(error);
		}
	}
);

router.post(
	'/submit-review',
	[
		check('product_id', 'product_id is missing').not().isEmpty(),
		check('rating', 'rating is missing').not().isEmpty(),
		check('review_text', 'review text is missing').not().isEmpty(),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: 'Missing Info' });
		}

		const token = req.headers.authorization?.split(' ')[1];

		const { product_id, rating, review_text } = req.body;

		try {
			const decoded = jwt.verify(token, 'KprVapS2t3g0bxJBu8iemo3xKNB9A0');
			const username = await decoded.username;

			const [reviews] = await connectDB.query(
				'SELECT * FROM reviews WHERE product_id = ?',
				[product_id]
			);

			const canReview = !reviews.some(
				(review) => review.username === username
			);

			if (canReview) {
				await connectDB.execute(
					'INSERT INTO reviews (username, product_id, rating, review_text) VALUES (?, ?, ?, ?)',
					[username, product_id, rating, review_text]
				);
				res.status(200).send('Review submitted successfully');
			} else {
				res.status(403).send('Not allowed to submit a review');
			}
		} catch (error) {
			res.status(500).json(error);
		}
	}
);

module.exports = router;
