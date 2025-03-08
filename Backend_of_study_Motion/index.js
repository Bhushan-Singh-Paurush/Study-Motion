const express = require("express")
const app = express()
require("dotenv").config()

//Parsers
const cors=require("cors")
const cookieparser=require("cookie-parser")

//Routes
const categoryRoutes=require("./routes/category")
const courseRoutes=require("./routes/course")
const paymentRoutes=require("./routes/payment")
const profileRoutes=require("./routes/profile")
const ratingRoutes=require("./routes/rating&review")
const sectionRoutes=require("./routes/section")
const subsectionRoutes=require("./routes/subsection")
const userRoutes=require("./routes/user")

const fs=require("fs")
const port=process.env.PORT || 5000

app.use(cors({
    origin:process.env.CLIENT_URL,
    credentials:true
}))

//Add Parser
app.use(express.json())
app.use(cookieparser())
// app.use(fileupload({
//      useTempFiles : true,
//     tempFileDir : '/tmp/'
// }))

if(fs.existsSync("./public/images") || fs.mkdirSync("./public/images")){}

app.get("/api1/",(req,res)=>{return res.status(200).json({
    success:true,
    message:"Server is running"
})})
app.use("/api1/auth",userRoutes)
app.use("/api1/profile",profileRoutes)
app.use("/api1/course",courseRoutes)
app.use("/api1/payment",paymentRoutes)
app.use("/api1/category",categoryRoutes)
app.use("/api1/rating",ratingRoutes)
app.use("/api1/section",sectionRoutes)
app.use("/api1/subsection",subsectionRoutes)

require("./Config/DbConnection").DbConnection()
require("./Config/Cloudinary").cloudinary()

module.exports=app


