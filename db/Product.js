const mongoose = require('mongoose');
const User = require('./User');

const productSchema = new mongoose.Schema({
    name: String,
    brand: String,
    color: String,
    publishDate: {type: Date, default: Date.now},
    publisher: { type: mongoose.Schema.Types.ObjectId, ref: User },
    tags: [String],
    price: Number,
    images: [String],
    size: [String],
    description: String,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
