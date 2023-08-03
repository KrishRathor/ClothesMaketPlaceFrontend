const User = require('../db/User');

const checkAuth = async (token) => {
    const user = await User.findOne({email:token})
    if (user) return 200;
    return 404;
}

module.exports = { checkAuth };