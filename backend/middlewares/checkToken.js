const { validateToken } = require("../services/authentication");
const { Users } = require("../models/user-model")
const checkToken = (token) => {
    return async (req, res, next) => {

        try {
            const tokenValue = req.cookies[token]
            if (!tokenValue) return res.status(401).json({ "error": "Token not provided.." });

            const userPayload = validateToken(tokenValue);
            if (!userPayload) return res.status(401).json({ "error": "Wrong token provided.." })

            const user = await Users.findById(userPayload.id).select("-password -salt")
            if(!user) return res.status(401).json({"message" : "User not found"})

            req.user = user;
            
            next();
        } catch (error) {
            return res.status(400).json({"message":"error in checkToken"})
        }
    }
}

module.exports = { checkToken }