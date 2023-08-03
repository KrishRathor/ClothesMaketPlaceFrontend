const mongoose = require('mongoose');

const url = 'mongodb://127.0.0.1:27017/ecomdb';

mongoose.connect(url);
mongoose.set('strictQuery', false);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB database');
});

module.exports = db;
