const Cart = require('../db/Cart');
const User = require('../db/User');
const Product = require('../db/Product');

const removeFromCartRoute = async (req, res) => {
    const { token, productName} = req.body;
    
    const user = await User.findOne({email:token});
    const product = await Product.findOne({name:productName});
    const cart = await Cart.findOne({user:user.id});

    const products = cart.products.filter(e => e.toString() !== product.id);
    const result = await Cart.findOneAndUpdate({user:user.id}, { $set : {products:products}}, {new:true});

    return res.json({'msg': 'removed product successfully', 'status':200, 'result':result})

}

module.exports = { removeFromCartRoute };
