const express = require("express")
const profileRoute = express.Router();

const updateProfile = require('../controllers/profile-controller');

profileRoute.put("/",updateProfile);

module.exports = profileRoute