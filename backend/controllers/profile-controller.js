const { Users } = require("../models/user-model");
const cloudinary = require("../lib/cloudinary")

const updateProfile  = async(req,res)=>{ 
    try {
    const {profileImg} =  req.body;
    const userId  = req.user.id;

    if(!profileImg) return res.status(400).json({"message" : "no profileImg provided"});
    
    const uploadResponse = await cloudinary.uploader.upload(profileImg);
        
    const updatedUser = await Users.findByIdAndUpdate(userId,{profileImg : uploadResponse.secure_url},{new : true}).select("-password -salt")
        
    return res.status(200).json(updatedUser)
    
} catch (error) {
    console.log("errror in updateProfile...",error);
    if (!res.headersSent) {
        return res.status(500).json({ "message": "internal server error" });
        }
}

}

module.exports = updateProfile