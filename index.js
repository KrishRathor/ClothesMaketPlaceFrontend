const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config({ path: './.env' });

const stripe = require('stripe')(process.env.STRIPE_API_KEY);

const { signupRoute } = require('./routes/signupRoute');
const { loginRoute } = require('./routes/loginRoute');
const { productRoutes } = require('./routes/productRoutes');
const { addNewProductRoute } = require('./routes/addNewProductRoute');
const { addToCartRoute } = require('./routes/addToCartRoute');
const { removeFromCartRoute } = require('./routes/removeFromCartRoute');
const { getAllCartRoute } = require('./routes/getAllCartRoute');
const { checkInCartRoute } = require('./routes/checkInCartRoute')
const { buyItemRoute } = require('./routes/buyItemRoute');

const app = express()
app.use(cors());
app.use(bodyParser.json());

app.post('/signup', signupRoute);
app.post('/login', loginRoute);
app.get('/getAllProducts', productRoutes);
app.post('/addNewProduct', addNewProductRoute);
app.post('/addToCart', addToCartRoute);
app.post('/removeFromCart', removeFromCartRoute);
app.get('/getAllCart', getAllCartRoute);
app.post('/checkInCart', checkInCartRoute);
app.post('/buyItem', buyItemRoute);

const port = 3001
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})