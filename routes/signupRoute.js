const db = require('../db/db');
const User = require('../db/User');

const signupRoute = async (req, res) => {
    
    const { email, password, username } = req.body;
    const newUser = new  User({
        email: email,
        username: username,
        password: password
    })
    const result = await newUser.save();
    console.log(result);

    res.json({'message': 'request successfull'});
}

module.exports = {signupRoute};