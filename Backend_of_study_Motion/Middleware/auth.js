const jwt = require("jsonwebtoken")

exports.auth=async(req,res,next)=>{
    try {
          const token = req.cookies["token"] || req.header("authorization").replace("Bearer ","")
        
          if(!token)
            {
                return res.status(400).json({
                      success:false,
                      message:"token not found"
                })
            }
    try {
        const decodedtoken=jwt.verify(token,process.env.SECRET)
        req.user=decodedtoken

        next()

    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"invalid token"
        })
    }        

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Token validation failed"
        })
    }
}

exports.isStudent=async(req,res,next)=>{
     try {
        if(req.user.role!=="Student")
            {
                return res.status(400).json({
                    success:false,
                    message:"This is protected route for student only"
                })
            }
       next()               
     } catch (error) {
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified please try again.."
        })
     }
}
exports.isInstructor=async(req,res,next)=>{
     try {
        if(req.user.role!=="Instructor")
            {
                return res.status(400).json({
                    success:false,
                    message:"This is protected route for Instructor only"
                })
            }
       next()               
     } catch (error) {
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified please try again.."
        })
     }
}
exports.isAdmin=async(req,res,next)=>{
     try {       
        if(req.user.role!=="Admin")
            {
                return res.status(400).json({
                    success:false,
                    message:"This is protected route for Admin only"
                })
            }
       next()               
     } catch (error) {
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified please try again.."
        })
     }
}