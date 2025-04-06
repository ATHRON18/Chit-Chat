const express = require("express")
const authRouter = express.Router()
const { createNewUser, generateTokenAndLogin } = require("../controllers/auth-controller")

// Signup
authRouter.post("/signup",createNewUser)

// login
authRouter.post("/login",generateTokenAndLogin)

// Logout
authRouter.post("/logout",(req,res)=>{
    res.clearCookie("uid").json({"info" : "Logedd out.."})
})





module.exports = authRouter