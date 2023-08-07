const fs = require('fs');
const path = require('path')

const Product = require("../db/Product");

const getProductImages = async (req, res) => {
    const { productname } = req.headers;

    const product = await Product.findOne({ name: productname });
    const images = product.images;

    return res.json({'images':images});

}

module.exports = { getProductImages }