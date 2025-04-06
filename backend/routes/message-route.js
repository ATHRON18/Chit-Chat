const express = require("express");
const messageRouter = express.Router();
const {getMessages, sendMessage, getSideBarUsers } = require("../controllers/message-controller");


messageRouter.get("/",getSideBarUsers)

messageRouter.get("/:id",getMessages)

messageRouter.post("/:id",sendMessage)

module.exports = messageRouter