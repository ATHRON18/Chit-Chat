const mongoose = require("mongoose")

const connectionToMongoDB = async()=>{
    return await mongoose.connect(process.env.MONGO_DB_URI)
}
module.exports = connectionToMongoDB

