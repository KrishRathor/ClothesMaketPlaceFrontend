const mongoose = require('mongoose');
const Product = require('./Product');

const productImageSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: Product },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: Product }],
});

const ProductImages = mongoose.model('ProductImages', productImageSchema);

module.exports = ProductImages;
