const express = require('express')
const dotenv = require("dotenv")

const connectionToMongoDB = require("./lib/connectionn");
const cookieParser =  require("cookie-parser");
const cors = require("cors");
const path = require('path')

dotenv.config();

const {app,server} = require('./lib/socket');
const { checkToken } = require("./middlewares/checkToken");

const authRouter = require("./routes/auth-route");
const messageRouter = require("./routes/message-route");
const profileRoute = require("./routes/profile-route");
const checkAuthRouter = require("./routes/checkAuth-route");

const PORT = process.env.PORT;

//Connection to DB
connectionToMongoDB()
.then(console.log("Database Connected..!")) 

// built-in middlewares
app.use(express.json({limit: '10mb' })); 
app.use(cookieParser())
app.use(cors({
    origin : "http://localhost:5173",
    credentials : true
}))

// coustom middleware as a protect route
app.use("/api",checkToken("uid"))

// Routes
app.use("/auth",authRouter)
app.use("/api/users",messageRouter)
app.use("/api/profile",profileRoute)
  //Below checkAuth is created for frontend to give user as a response. 
app.use("/api/check",checkAuthRouter);

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname,"../frontend/dist")));

  app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
  })
}

server.listen(PORT,console.log(`server started at http://localhost:${PORT}`))
