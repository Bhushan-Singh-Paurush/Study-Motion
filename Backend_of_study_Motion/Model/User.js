const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
        firstname:{
            type:String,
            required:true,
            trim:true
        },
        lastname:{
            type:String,
            required:true,
            trim:true
        },
        email:{
            type:String,
            required:true,
            trim:true,
            unique:[true,"This email is already stored"]
        },
        password:{
            type:String,
            required:true,
        },
        accountType:{
            type:String,
            enum:["Student","Instructor","Admin"],
            required:true,
            trim:true 
        },
        additionaldetail:{
           type:mongoose.Schema.Types.ObjectId,
           ref:"Profile",
           required:true
        },
        courses:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"Course"
            }
        ],
        image:{
           type:String,
        },
        public_id:{
            type:String
        },
        courseProgress:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"CourseProgress"
            }
        ],
        token:{
            type:String,
        },
        resetPasswordExpiers:{
            type:Date
        }
        
})

module.exports=mongoose.model("User",userSchema)