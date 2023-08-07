const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path')
require('dotenv').config({ path: './.env' });
const algoliasearch = require('algoliasearch');
const algoliaClient = algoliasearch(process.env.ALGOLIA_API_KEY, process.env.ALGOLIA_SEARCH_KEY);
const index = algoliaClient.initIndex('clothesMarketPlace');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {

    cb(null, 'uploads/'); // Define the destination folder
  },
  filename: function (req, file, cb) {
    // Generate a specific filename based on the current timestamp and the original file extension
    const filename = file.originalname;
    cb(null, filename);
  },
});


const upload = multer({ storage:storage });
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
const { uploadImageRoute } = require('./routes/uploadImageRoute');
const { getProductImages } = require('./routes/getProductImages');
const { searchRoute } = require('./routes/searchRoute');

const app = express()
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.urlencoded({extended: false}))
const uploadDir = path.join(__dirname, 'uploads');

app.post('/signup', signupRoute);
app.post('/login', loginRoute);
app.get('/getAllProducts', productRoutes);
app.post('/addNewProduct', addNewProductRoute);
app.post('/uploadImage',upload.array('image', 5), uploadImageRoute);
app.post('/addToCart', addToCartRoute);
app.post('/removeFromCart', removeFromCartRoute);
app.get('/getAllCart', getAllCartRoute);
app.post('/checkInCart', checkInCartRoute);
app.post('/buyItem', buyItemRoute);
app.get('/getProductImages', getProductImages);
app.use('/uploads', express.static(uploadDir));
app.post('/search', searchRoute);

const port = 3001
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

module.exports = { index };