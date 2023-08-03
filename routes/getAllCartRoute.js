const Cart = require('../db/Cart');
const Product = require('../db/Product');
const User = require('../db/User');

const getAllCartRoute = async (req, res) => {
    const { token } = req.headers;

    const user = await User.findOne({email:token});
    const cart = await Cart.findOne({user:user.id});
    const products = cart.products;
    const productObject = [];

    await Promise.all(products.map(async (product) => {
        product = await Product.findOne({ _id: product });
        productObject.push(product);
    }));

    return res.json({'msg':'cart items', 'status':200, 'products':productObject});

}

module.exports = {getAllCartRoute};