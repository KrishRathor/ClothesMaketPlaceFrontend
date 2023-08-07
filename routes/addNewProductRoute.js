const Product = require('../db/Product');
const User = require('../db/User');
const checkAuth = require('../middlewares/checkAuth');
require('dotenv').config({ path: '../.env' });
const algoliasearch = require('algoliasearch');
const algoliaClient = algoliasearch(process.env.ALGOLIA_API_KEY, process.env.ALGOLIA_SEARCH_KEY);
const index = algoliaClient.initIndex('clothesMarketPlace');

const util = require('util');
const indexSaveObjectPromise = util.promisify(index.saveObject);

const addNewProductRoute = async (req, res) => {
    const isAuth = await checkAuth.checkAuth(req.body.token);

    if (isAuth === 200) {

        const { name, brand, color, tags, price, images, size, description, token } = req.body;
        const user = await User.findOne({email:token});

        const newProduct = new Product({
            name: name,
            brand: brand,
            color: color,
            publisher: user.id,
            tags: tags,
            price: price,
            images: images,
            size: size,
            description: description,
        })

        const result = await newProduct.save();

        // await index.addObjects(objects, function(err, content) {
        //     if (err) {
        //       console.error(err);
        //     }
        //   });

        return res.json({'msg':result, 'status':200, 'product':newProduct});


    } else if (isAuth === 404) {
        return res.json({'msg':'user not authenticated', 'status':404});
    } else {
        return res.json({'msg':'internal server error', 'status':500});
    }

}

module.exports = { addNewProductRoute };