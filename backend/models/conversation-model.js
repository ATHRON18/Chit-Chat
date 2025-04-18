const mongoose = require("mongoose")
const conversationSchema = new mongoose.Schema({
    participants : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Users",
        require : true,
    }],
    messages : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Messages",
        default : []
    }]
},{timestamps : true})

const Conversation = mongoose.model("Conversation",conversationSchema)

module.exports = Conversation