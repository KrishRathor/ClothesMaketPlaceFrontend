const User = require('../db/User');

const loginRoute = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const user = await User.findOne({email:email})
            .then (user => {
                if (user.password === password) {
                    return res.json({'message': 'user logged successfully', 'email':user.email});
                }
                return res.json({'message': 'invalid credentials'});
            })
    } catch (error)  {
        return res.json({'message':error});
    }    
}

module.exports = { loginRoute };