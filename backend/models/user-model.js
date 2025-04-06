const mongoose = require("mongoose")
const {generateToken} = require("../services/authentication")
const {createHmac,randomBytes} = require("crypto")


const userSchema = new mongoose.Schema({
    fullName:{
        type : String,
        require : true
    },
    email:{
        type : String,
        require : true,
        unique : true
    },
    password:{
        type : String,
        require : true
    },
    salt:{
        type : String,
    },
    profileImg:{
        type : String,
        default : null
    },
    // role : {
    //     type : String,
    //     enum : "USER" || "ADMIN",
    //     default : "USER"
    // }
},{timestamps : true})

userSchema.pre("save",async function (next) {
    const user = this;
    if(!user.isModified("password")) return

    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac("sha256",salt)
    .update(user.password)
    .digest("hex");

    user.salt = salt;
    user.password = hashedPassword;
    const token = generateToken(user);
    next();
})


userSchema.static("matchPassword",async function (email,password){
    
    const user = await Users.findOne({email})
    if(!user) throw new Error("unable to find User")
    const salt = user.salt;
    const originalHashPassword = user.password;

    const userProvidedHashPassword = createHmac("sha256",salt)
    .update(password)
    .digest("hex")
    
    if(originalHashPassword !== userProvidedHashPassword) throw new Error("Wrong Password")
            
    const token = generateToken(user);
    
    
    return token; 
})

const Users = mongoose.model("Users",userSchema)

module.exports = {Users}