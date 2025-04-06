const { getRecieverSocketId,io } = require("../lib/socket");
const Conversation = require("../models/conversation-model");
const { Messages } = require("../models/message-model");
const { Users } = require("../models/user-model");

const getMessages = async(req,res)=>{
    try {
        const myId = req.user.id; //senderID
        const userToChatId  = req.params.id; //ReceiverID
        
        let conversation = await Conversation.findOne({participants :{$all : [myId,userToChatId]}}).populate("messages")
        
        if(!conversation) return res.status(200).json([])
        const messages = conversation.messages
        return res.status(200).json(messages)
   
    } catch (error) {
        console.error("Error in getMessages :",error.message)
        res.status(500).json({error : "Internal server error.."})
    }   
}

const sendMessage = async(req,res)=>{
    try {
        const senderId = req.user.id; //senderID
        const recieverId  = req.params.id; //ReceiverID
        const messageText = req.body.messageText;
        const messageImage = req.body.messageImage;
        const msg = await Messages.create({senderId,recieverId,messageText,messageImage})

        // Socket Messages..
        const recieverSocketId = getRecieverSocketId(recieverId);
        if(recieverSocketId){
            io.to(recieverSocketId).emit("newMessage",msg);
        }

        let conversation = await Conversation.findOne({participants :{$all : [senderId,recieverId]}})

        if(!conversation){
            conversation = await Conversation.create({participants : [senderId,recieverId]})
        }
        if(msg)
        conversation.messages.push(msg._id);
        conversation.save()
        
        res.status(200).json(msg)
    } catch (error) {
        console.error("Error in sendMessage : ",error)
        res.status(500).json({error : "Cannot send Message"})
    }
}

const getSideBarUsers = async(req,res)=>{
    try {
        const myId = req.user.id;
        let sideUsers = await Users.find({_id : {$ne : myId}}).select("-password").select("-salt")
        
        res.status(200).json(sideUsers)
    } catch (error) {
        console.error("Error in getSideBarUsers :",error.message)
        res.status(500).json({error : "Internal server error.."})
    }
}

module.exports = {getMessages,sendMessage,getSideBarUsers}