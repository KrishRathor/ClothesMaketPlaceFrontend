const Product = require('../db/Product');
const User = require('../db/User');

require('dotenv').config({ path: '../.env' });
const stripe = require('stripe')(process.env.STRIPE_API_KEY);
const frontend_url = process.env.FRONTEND_URL;

const buyItemRoute = async (req, res) => {
    
    const { token, product, quantity } = req.body;

    const user = await User.findOne({email:token});
    const productObj = await Product.findOne({_id:product._id});

    const session = await stripe.checkout.sessions.create({
        line_items: [{
            price_data : {
                currency: 'inr',
                product_data: {
                    name: productObj.name,
                },
                unit_amount: productObj.price * 100,
            },
            quantity: quantity,
        }],
        mode: 'payment',
        success_url: `${frontend_url}/success`,
        cancel_url: `${frontend_url}/cancel`,
      });
    
      res.json({url : session.url});
}

module.exports = { buyItemRoute };