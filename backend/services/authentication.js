const jwt = require("jsonwebtoken")
const secretKey = process.env.JWT_SECRET;

const generateToken = (user)=>{
    const payload = {
        id : user._id,
        email : user.email
    }
    
    return jwt.sign(payload,secretKey)
}

const validateToken = (token)=>{
    return jwt.verify(token,secretKey)
}

module.exports = {generateToken,validateToken}