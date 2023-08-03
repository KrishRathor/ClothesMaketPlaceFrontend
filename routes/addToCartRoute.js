const Cart = require('../db/Cart');
const User = require('../db/User');
const Product = require('../db/Product');

const addToCartRoute = async (req, res) => {
    const { token, productName} = req.body;
    
    const user = await User.findOne({email:token});
    const product = await Product.findOne({name:productName});
    const cart = await Cart.findOne({user:user.id});
    
    if (!cart) {
        const newCart = new Cart({
            user: user.id,
            products: [product.id]
        })
        const result = await newCart.save();
        return res.json({'msg':'created new cart', 'result':result, 'status':200});
    }

    const products = cart.products;
    products.push(product);
    const result = await Cart.findOneAndUpdate({user:user.id}, { $set : {products:products}}, {new:true});

    return res.json({'msg':'added new product', 'status':200, 'result':result});

}

module.exports = {addToCartRoute};