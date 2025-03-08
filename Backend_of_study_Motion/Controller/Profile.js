const User = require("../Model/User")
const Profile = require("../Model/Profile")
const Course = require("../Model/Courses")
const fs = require("fs")
const { uploadImageToCloudinary, deleteFilefromCloudinary } = require("../Util/imageUploader")
const CourseProgress = require("../Model/CourseProgress")
const mailSender = require("../Util/mailSender")
const { contactUsEmail } = require("../Template/contactFormRes")
require("dotenv").config()

exports.updateProfile=async(req,res)=>{
    try {
        const{
            dateOfBirth="",
            about="",
            contactNumber,
            gender,
            firstname="",
            lastname=""
        }=req.body
        const id = req.user.id
        if(!contactNumber || !gender || !id)
        {
            return res.status(400).json({
                success:false,
                message:`Fill the fields Properly ${!contactNumber && "contact Number"} ${!gender && "Gender"}`
            })
        }
        const checkUser = await  User.findById(id)
        
        const profileId = checkUser.additionaldetail
        const profileDetails = await Profile.findById(profileId)
        profileDetails.dateOfBirth=dateOfBirth
        profileDetails.gender=gender
        profileDetails.contactNumber=contactNumber
        profileDetails.about=about
    
        await profileDetails.save()
       
        const user=await User.findByIdAndUpdate(id,
                              {firstname,lastname},
                              {new:true}).populate("additionaldetail")
    
        return res.status(200).json({
            success:true,
            message:"Profile updated successfully",
            user
        })
    } catch (error) {
        return res.status(500).json({
            succes:false,
            message:"Profile not updated",
            error:error.message
        })
    }

}

exports.deleteAccount=async(req,res)=>{
    try {
        const id = req.user.id

    const checkAccount = await User.findById(id)

    if(!checkAccount)
    {
        return res.status(400).json({
            success:false,
            message:"Account not found"
        })
    }
    
    if(checkAccount.public_id)
    {
        await deleteFilefromCloudinary(checkAccount.public_id)
    }
    
   await Profile.findByIdAndDelete(checkAccount.additionaldetail)
   
   
    await Course.updateMany({students:id},{$pull:{students:id}})

    await User.findByIdAndDelete(id)

    return res.status(200).json({
         success:true,
         message:"Account deleted successfully"
    })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Account not deleted",
            error:error.message
        })
    }
    

}

exports.getAllUserDetails=async(req,res)=>{
    try {
        const id = req.user.id
        const userDetails = await User.findById(id).populate("additionaldetail")

        return res.status(200).json({
            success:true,
            message:"All details of User",
            userDetails,
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Failed to find user details"
        })
    }
}

exports.updateDisplayPicture=async(req,res)=>{
    try {
        const id = req.user.id
        const file = req.file
        
        if(!file)
        {
            return res.status(400).json({
                success:false,
                message:"Display Image not found please try again.."
            })
        }
      
        const updatedDetail = await User.findById(id)

        if(updatedDetail.public_id)
        {
            await deleteFilefromCloudinary(updatedDetail.public_id)
        }
         
        const cloudResponse=await uploadImageToCloudinary(file,process.env.FOLDER_NAME)
       
          
        fs.unlinkSync(file.path)
        if(!cloudResponse)
        {
            return res.status(400).json({
                success:false,
                message:"Image is not upload to cloudinary",
            })
        }

        updatedDetail.image=cloudResponse.secure_url
        updatedDetail.public_id=cloudResponse.public_id

        await updatedDetail.save()

        return res.status(200).json({
            success:true,
            message:"Image updated successfully",
            updatedDetail
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Error in Image upload"
        })
    }
}

exports.getAllEnrollCourse=async(req,res)=>{
    try {
        const id=req.user.id

        const user=await User.findById(id).populate({
            path:"courses",
            populate:{
                path:"courseContent",
                populate:{
                    path:"subSection"
                }
            }
        }).exec()

        if(!user){
            return res.status(400).json({
                success:false,
                message:"User not found"
            })
        }
         
        for(let course of user.courses)
        {
            let totalCourseDuration=0
            let totalSubSection=0
            for(let section of course.courseContent)   
            {
            totalCourseDuration+=section.subSection.reduce((acc,cur)=>acc + parseInt(cur.timeDuration) , 0)
            totalSubSection+=section.subSection.length   
            }
            course.totalCourseDuration=totalCourseDuration
            
            
            
            if(user.accountType==="Student")
            {
                const courseprogress=await CourseProgress.findOne({courseId:course._id, userid:id}).populate("completeVideos")        
                
                if(totalSubSection==0)
                course.progress=100;
                    
                
                else if(courseprogress.completeVideos.length===0)
                course.progress=0;
                    
                
                else
                {
                course.progress=Math.round(
                    (courseprogress.completeVideos.length/totalSubSection)*100)
                }     
               
            }
            }
           
          
        return res.status(200).json({
            success:true,
            message:"Enrolled Courses",
            user
        })

    } catch (error) {
        return res.status(500).json({
            succcess:false,
            message:error.message,
            
        })
    }
}

exports.deleteEnrollCourse=async(req,res)=>{
    try {
        const courseId=req.body.courseId
        const id=req.user.id

        if(!courseId || !id)
        {
            return res.status(400).json({
                success:false,
                message:"Provide all fields"
            })
        }
        const user=await User.findByIdAndUpdate(id,{$pull:{courses:courseId}})


        if(!user)
        {
            return res.status(400).json({
                success:false,
                message:"User not found"
            })
        }
        
        await Course.findByIdAndUpdate(courseId,{$pull:{students:id}})

        await CourseProgress.findOneAndDelete({userid:id,courseId:courseId})

        return res.status(200).json({
            success:true,
            message:"You removed from enrolled course"
        })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Not removed from enrolled course",
            error:error.message
        })
    }
}

exports.instructorCoursesData=async(req,res)=>{
    try {
        const id=req.user.id
        if(!id)
        {
            return res.status(400).json({
                success:false,
                message:"Instructor Id not found"
            })
        }
        const courses=await Course.find({instructor:id})

        if(courses.length===0)
        { 
             return res.status(400).json({
                success:false,
                message:"No course found"
             })
        }
        
        const coursesData=courses.map((element)=>{
                  const Students=element.students?.length
                  const totalAmount=Students*element.price
                  const courseName=element.courseName
                  return {
                    Students,totalAmount,courseName
                  }
        })
        
        return res.status(200).json({
            sucess:true,
            message:"Course data",
            courses,
            coursesData
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
exports.contactUs=async(req,res)=>{
    try {
    const{countryCode,email,firstname,lastname,message,number}=req.body

    if(!countryCode || !email || !firstname || !lastname || !message || !number)
    {
        return res.status(400).json({
            success:false,
            message:"Provide all fields"
        })
    }

    await mailSender(email,"Thank you for contacting us",contactUsEmail( email,
        firstname,
        lastname,
        message,
        number,))
    
    return res.status(200).json({
        success:true,
        message:"We have received your message"
    })    
    } catch (error) {
        return res.status(500).json({
            succcess:false,
            message:"Message not received"
        })
    }
}