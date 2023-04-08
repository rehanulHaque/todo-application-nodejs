const jwt = require("jsonwebtoken")
const User = require("../models/User")


const auth =async(req, res, next) =>{
    try {
        const authHeader = req.header('token')
        if(!authHeader) return res.send("Please Authenticate")
        const token = jwt.decode(authHeader, process.env.SECRET)
        const user = await User.findById(token.id)

        req.user = user
        next()
    } catch (error) {
        console.log(error);
        res.status(500).send("Please Authenticate");
    }
}

module.exports = auth