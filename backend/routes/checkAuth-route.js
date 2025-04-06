const express = require('express')
const checkAuthRouter = express.Router();

const {checkAuth} = require("../controllers/auth-controller")

checkAuthRouter.get("/",checkAuth);

module.exports = checkAuthRouter

