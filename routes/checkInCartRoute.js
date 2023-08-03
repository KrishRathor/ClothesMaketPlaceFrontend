const Cart = require('../db/Cart');
const User = require('../db/User');

const checkInCartRoute = async (req, res) => {
    const { token, product } = req.body;
    const user = await User.findOne({email:token});
    const cart = await Cart.findOne({user:user.id});

    if (!cart) {
        return res.json({'msg':'no cart found', 'status':404});
    }

    const products = cart.products;
    let present = false;
    
    products.map(p => {
        if (p.toString() === product._id) {
            present = true;
        }
    })

    if (present) {
        return res.json({'msg':'product in cart', 'status':200});
    } else {
        return res.json({'msg':'product not in cart', 'status':404});
    }


}

module.exports = { checkInCartRoute };