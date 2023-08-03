const Product = require('../db/Product');
const User = require('../db/User');
const checkAuth = require('../middlewares/checkAuth');

const addNewProductRoute = async (req, res) => {
    const isAuth = await checkAuth.checkAuth(req.body.token);

    if (isAuth === 200) {

        const { name, brand, color, tags, price, images, size, description, token } = req.body;
        const user = await User.findOne({email:token});

        console.log(images);

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
        return res.json({'msg':result, 'status':200, 'product':newProduct});


    } else if (isAuth === 404) {
        return res.json({'msg':'user not authenticated', 'status':404});
    } else {
        return res.json({'msg':'internal server error', 'status':500});
    }

}

module.exports = { addNewProductRoute };