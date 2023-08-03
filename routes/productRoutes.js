const Product = require('../db/Product');

const productRoutes = async (req, res) => {
    const products = await Product.find();
    return res.json({'products':products})
}

module.exports = { productRoutes };
