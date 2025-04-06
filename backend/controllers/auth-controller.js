const {Users} = require("../models/user-model")

const createNewUser = async(req,res)=>{
    const {fullName,email,password,profileImg} = req.body;
        try {
            if(await Users.findOne({email : email})){
                return res.status(400).send("Email already registered")
            }
   
        } catch (error) {
            console.error(error);
        }
            
        const user = await Users.create({fullName,email,password,profileImg});
        const token = await Users.matchPassword(email,password)
        res.cookie("uid",token);

    return res.status(201).json({
        _id:user._id,
        fullName:user.fullName,
        email:user.fullName,
        profileImg:user.profileImg
        
    })
}

const generateTokenAndLogin = async(req,res)=>{
    const {email,password} = req.body;
    try {
        
        const token = await Users.matchPassword(email,password);
        const user = await Users.findOne({email}).select("-password -salt");
        
        res.cookie("uid",token);

        return res.status(200).json(user)
    } catch (error) {
        console.error("Error in generateTokenAndLogin :",error)
        return res.status(404).json("Wrong User OR Password..")
    }

}

const checkAuth = (req,res)=>{
    try {
        const user = req.user;
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({"message" : "Error in checkAuth"})
    }
}
module.exports = {createNewUser,generateTokenAndLogin,checkAuth}