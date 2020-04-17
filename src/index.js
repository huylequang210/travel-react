const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const middlewares = require('./middlewares');
const logs = require('./api/logs');

require('dotenv').config();

const connectDB = async () => {
  await mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  console.log('db connected...');
}

connectDB();

const logger = (req, res, next) => {
	const timestamp = new Date();
	console.log(`${timestamp} A request was made to: ${req.path}`);
	next();
}

app.use(express.json());
app.use(logger);
app.use(helmet());
app.use(cors({
	origin: process.env.CORS_ORIGIN,
}));

app.get('/', (req,res) => {
	res.json({
		message: 'Hello world!',
	});
});

app.use('/api/logs', logs);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler)


const PORT = process.env.PORT || 1337;

app.listen(PORT, () => {`Listenning at ${PORT}`})