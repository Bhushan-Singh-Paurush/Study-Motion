const mongoose=require("mongoose")
const mailSender = require("../Util/mailSender");
const otpTemplate = require("../Template/emailVerificationTemplate");

const OTPSchema=new mongoose.Schema({
           email:{
            type:String,
            required:true
           },
           otp:{
            type:Number,
            required:true
           },
           createdAt:{
            type:Date,
            default:Date.now,
           } 
})

async function sendVerificationMail(email, otp) {
    try {
        const response=await mailSender(email,"Verification mail from study Motion" ,otpTemplate(otp))
        
    } catch (error) {
        console.log("Error in mail sending" , error);
    }
}
OTPSchema.pre("save", async function (next) {
       await sendVerificationMail(this.email,this.otp)  
       next();  
})
OTPSchema.index({createdAt:1},{expireAfterSeconds:2*60})
module.exports=mongoose.model("OTP",OTPSchema)