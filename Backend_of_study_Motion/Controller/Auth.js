const OTP = require("../Model/OTP")
const otpGenerator=require("otp-generator")
const User=require("../Model/User")
const bcrypt=require("bcrypt")
const Profile=require("../Model/Profile")
const jwt=require("jsonwebtoken")
const mailSender = require("../Util/mailSender")
const passwordUpdated = require("../Template/passwordUpdate")
require("dotenv").config()

//Send OTP Controller
exports.sendOTP=async(req,res)=>{
    try {
        const{email}=req.body

        const checkUserPresent=await User.findOne({email})

        if(checkUserPresent)
        {
            return res.status(400).json({
                success:false,
                message:"This email is already Register"
            })
        }

        const otp=otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false
        })

        const result=await OTP.findOne({otp:otp})
       
        
        while(result)
        {
            otp=otpGenerator.generate(6,{
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false
            })
            result=await OTP.findOne({otp:otp})
        }

        const otppayload={
            email,otp
        }

        const resp=await OTP.create(otppayload)
        
        return res.status(200).json({
            success:true,
            message:"OTP is send to mail correctly"
        })
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"OTP is not send try again",
            error:error.message
        })
    }
}

//SingUp Controller 
exports.signUp=async(req,res)=>{
    try {
        const{
         firstname,
         lastname,
         email,
         password,
         confirmpassword,
         accountType,
         otp 
        }=req.body

        if(!firstname || !lastname || !email || !password || !confirmpassword || !accountType || !otp)
            {
                return res.status(400).json({
                    success:false,
                    message:"Fill the credencials properly"
                })
            }
        const user=await User.findOne({email})
        
        if(user)
        {
            return res.status(400).json({
                success:false,
                message:"This email is already Register please sign in"
        })
        }

        if(password !== confirmpassword)
        {
            return res.status(400).json({
                success:false,
                message:"Password mismatched please try again"
        })
        }

        const checkotp=await OTP.find({email}).sort({createdAt:-1}).limit(1)

        
        if(checkotp.length===0)
        {
            return res.status(400).json({
                success:false,
                message:"OTP not found"
            })

        }
       
        
        else if(!(checkotp[0].otp==otp))
        {
            return res.status(400).json({
                success:false,
                message:"OTP mismatched"
            })
        }
        const securePassword=await bcrypt.hash(password,10)

        const profileDetail=await Profile.create({
            gender:null,
            dateOfBirth:null,
            about:null,
            contactNumber:null
        })

        const usercreated=await User.create({
            firstname,
            lastname,
            email,
            password:securePassword,
            accountType,
            additionaldetail:profileDetail._id,
            image:`https://ui-avatars.com/api/?background=random&name=${firstname}+${lastname}`
        })

        return res.status(200).json({
            success:true,
            message:"Account created Successfully",
            usercreated
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

//Login Controller
exports.login=async(req,res)=>{
    try {
        const{email,password}=req.body

        if(!email || !password)
        {
            return res.status(400).json({
                success:false,
                message:"Fill the credentical property"
            })
        }

        const user=await User.findOne({email}).populate("additionaldetail")

        if(!user)
        {
            return res.status(400).json({
                success:false,
                message:"No account found on this email"
            })
        }

        if(await bcrypt.compare(password,user.password))
        {
            const payload={
                email:user.email,
                id:user._id,
                role:user.accountType
            }
            const option={
                expires:new Date(Date.now() + 2*24*60*60*1000),
                httpOnly:true,
                secure:true,
                sameSite:'none'
            }
            user.password=undefined
            const token = jwt.sign(payload,process.env.SECRET,{expiresIn:'2d'})
            return res.cookie("token",token,option)
                      .status(200)
                      .setHeader("Authorization", `Bearer ${token}`)
                      .json({
                            success:true,
                            message:"logged in successfully",
                            token,
                            user
                            })

        }
        else{
            return res.status(400).json({
                success:false,
                message:"Password is incorrect"
            })
        }

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Logged in failed please try again",
            error:error.message
        })
    }
}

// Change password controller
exports.changePassword=async(req,res)=>{
    try {
        const id = req.user.id
        const{currentPassword,password,confirmpassword}=req.body
         
        if(!currentPassword || !password || !confirmpassword)
        {
            return res.status(400).json({
                success:false,
                message:"provide all fields properly"
            })
        }

        if(password !== confirmpassword)
        {
            return res.status(400).json({
                success:false,
                message:"Password and confirm Password mismatched"
            })
        }

        const checkUser = await User.findById(id)

        if(!checkUser)
        {
            return res.status(400).json({
                success:false,
                message:"User not found"
            })
        }
        
        if(await bcrypt.compare(currentPassword , checkUser.password))
        {
            const securePassword = await bcrypt.hash(password , 10)

            const updatedUser = await User.findByIdAndUpdate(id,{password:securePassword},{new:true})

            try {
                mailSender(updatedUser.email,"Password update successfully",
                    passwordUpdated(updatedUser.email,updatedUser.firstname))

            } catch (error) {
                console.log(error);
                
            }
            
            
            return res.status(200).json({
                success:true,
                message:"Password update successfully",
                updatedUser
            })
        }
        else{
            return res.status(400).json({
                success:false,
                message:"current password is not correct"
            })
        }

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Password not updated",
            error:error.message
        })
    }
}