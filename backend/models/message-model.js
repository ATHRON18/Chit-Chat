const mongoose = require("mongoose")
const messageSchema = new mongoose.Schema({
    senderId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Users",
        require : true
    },
    recieverId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Users",
        require : true
    },
    messageText :{
        type : String
    },
    messageImage : {
        type : String
    }
},{timestamps : true})

const Messages = mongoose.model("Messages",messageSchema)

module.exports = {Messages}