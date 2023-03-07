const express = require('express');

const app = express();
const port = 5000;

app.use(express.json());
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	next();
});
app.use('/user', require('./routes/users'));

app.listen(port, () => {
	console.log(`Server listening at http://localhost:${port}`);
});
