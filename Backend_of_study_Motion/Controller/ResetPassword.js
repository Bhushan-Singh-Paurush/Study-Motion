const User = require("../Model/User")
const mailSender = require("../Util/mailSender")
const bcrypt = require("bcrypt")

exports.resetPasswordToken=async(req,res)=>{
    try {
        const{email}=req.body
        
        const ckeckemail=await User.findOne({email})

        if(!ckeckemail)
        {
            return res.status(400).json({
                succcess:false,
                message:`this email : ${email} is not register with us enter a vaild Email`
            })
        }
        
        const token=crypto.randomUUID()
              
        await User.findOneAndUpdate({email},{
            token:token,
            resetPasswordExpiers:Date.now() + 5*60*1000
        })

        const url=`${process.env.CLIENT_URL}/reset-password/${token}`

        await mailSender(email , "Password reset Link" ,`Click on this link to Reset the Password ${url}`)

        return res.status(200).json({
            success:true,
            message:"Email send successfully please check the email to reset the password"
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Something went wrong while reset password mail",
            error:error.message
        })
    }
}

exports.resetPassword=async(req,res)=>{
    try {
       const{password , confirmpassword ,token}=req.body

       if(!password || !confirmpassword || !token)
       {
        return res.status(400).json({
            success:false,
            message:"Provide the cridenticals properly"
        })
       }
       
       if(password !== confirmpassword)
       {
        return res.status(400).json({
            success:false,
            message:"password mismatched"
        })
       }

       const checktoken = await User.findOne({token})

       if(!token)
       {
        return res.status(400).json({
            success:false,
            message:"token invalid"
        })
       }
        
       if(checktoken.resetPasswordExpiers.getTime() < Date.now())
       {
        return res.status(400).json({
            success:false,
            message:"token expires please re-generate the token again"
        })
       }

       const securePassword = await bcrypt.hash(password,10)
       
       await User.findOneAndUpdate({token}, {
        password:securePassword
       })

       return res.status(200).json({
        success:true,
        message:"Password reset successfully"
       })
    } catch (error) {
        return res.status(500).json({
         success:false,
         message:"Failed to reset the password",
         error:error.message      
       })
    }
}