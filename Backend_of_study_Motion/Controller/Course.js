const Course=require("../Model/Courses")
const Category=require("../Model/Category")
const User = require("../Model/User")
const SubSection = require("../Model/SubSection")
const Section = require("../Model/Section")
const { uploadImageToCloudinary, deleteFilefromCloudinary } = require("../Util/imageUploader")
const fs=require("fs")
const CourseProgress = require("../Model/CourseProgress")
require("dotenv").config()

exports.createCourse=async(req,res)=> {
    try {
       
        
        const{courseName,description,whatYouWillLearn,price,tag,categoryId,instructions}=req.body
        const thumbnail=req.file
           
        if(!courseName || !description || !whatYouWillLearn || !price || !thumbnail || !tag || !instructions){
            return res.status(400).json({
                success:true,
                message:"All fields are required"
            })
        }
        const instructorId=req.user.id
      
        
        const checkTag =await Category.findById(categoryId)
        
        if(!checkTag){
            return res.status(400).json({
                success:false,
                message:"Category Detail not found"
            })
        }
        
        const thumbnailImage=await uploadImageToCloudinary(thumbnail,process.env.FOLDER_NAME)
        
        
        fs.unlinkSync(thumbnail.path)
        
        const newCourse=await Course.create({
            courseName,
            description,
            whatYouWillLearn,
            price,
            tag,
            instructor:instructorId,
            thumbnail:thumbnailImage.secure_url,
            public_id:thumbnailImage.public_id,
            category:categoryId,
            instructions:instructions
        })
        
        if(newCourse)
        {
            await User.findByIdAndUpdate(instructorId,{$push:{courses:newCourse._id}})
            await Category.findByIdAndUpdate(categoryId,{$push:{course:newCourse._id}})
        }
    
        return res.status(200).json({
            success:true,
            message:"Course created successfully",
            newCourse
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message,
            
        })
    }
}

exports.showAllCourse=async(req,res)=>{
    try {
        const allCourses=await Course.find({},{
            courseName:true,
            price:true,
            thumbnail:true,
            ratingAndReveiw:true,
            students:true,
            instructor:true
        }).populate("instructor").exec()

        return res.status(200).json({
            success:true,
            message:"Data of all course fetched",
            allCourses
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"cannot fetch course data",
            error:error.message
        })
    }
}

exports.getCourseDetail=async(req,res)=>{
    try {
        
        const courseId = req.body.courseId
        const id=req.user.id
       
        const courseDetail = await Course.findById(courseId).populate(
                  {
                    path:"instructor",
                    populate:{
                        path:"additionaldetail"
                    }
                  }
        ).populate("ratingAndReveiw")
        .populate("category")
        .populate({
            path:"courseContent",
            populate:{
                path:"subSection"
            }

        }).exec();
     
       
        if(!courseDetail){
            return res.status(400).json({
                success:false,
                message:`This course not found`
            })
        }
        let totalCourseDuration=0
        for(let section of courseDetail.courseContent)   
            {
            totalCourseDuration+=section.subSection.reduce((acc,cur)=>acc + parseInt(cur.timeDuration) , 0) 
            }
            courseDetail.totalCourseDuration=totalCourseDuration
    
        
        const courseProgressCount=await CourseProgress.findOne({courseId:courseId,userid:id})
        
        return res.status(200).json({
            success:true,
            message:"that's all course detail",
            courseDetail,
            completedVideos:courseProgressCount?.completeVideos ?
            courseProgressCount?.completeVideos :
            []
        })

    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            success:false,
            message:"Failed to get course detail",
            error:error.message
        })
    }
}

exports.updateCourse=async(req,res)=>{
    try {
        const{courseId}=req.body
        const file=req.file
        
        if(!courseId)
        {
            return res.status(400).json({
                success:false,
                message:"Provide Course ID"
            })
        }
        
        const course=await Course.findById(courseId)

        if(!course)
        {
            return res.status(400).json({
                success:false,
                message:"Course not fount"
            })
        }

        if(file)
        {
            

            await deleteFilefromCloudinary(course.public_id)
            
            const uploadresp=await uploadImageToCloudinary(file,process.env.FOLDER_NAME)

            if(uploadresp)
            {
                req.body.thumbnail=uploadresp.secure_url
                req.body.public_id=uploadresp.public_id
                fs.unlinkSync(file.path)
            }
        }
        
        const updatedCourse =await Course.findByIdAndUpdate(courseId,req.body,{new:true}).populate({
            path:"courseContent",
            populate:{
                path:"subSection"
            }
        }).exec()

        return res.status(200).json({
            success:true,
            message:"Course Updated Successfully",
            updatedCourse
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message,
           
        })
    }
}

exports.deleteCourse=async(req,res)=>{
    try {
        const{courseId}=req.body
        
        
        if(!courseId)
        {
            return res.status(400).json({
                success:false,
                message:"Course Id not Found"
            })
        }

        const course=await Course.findById(courseId).populate({
            path:"courseContent",
            populate:{
                path:"subSection"
            }
        })

        if(!course)
        {
            return res.status(400).json({
                success:false,
                message:"No course found"
            })
        }
        
        for(studentId of course.students)
        {
            if(studentId)
            {
                try {
                    await User.findByIdAndUpdate(studentId,{$pull:{courses:courseId}})
                } catch (error) {
                    console.log(error);
                }
            }else{
                console.log("No student deleted");
                
            }
        }
        
        

        for(sectionDetail of course.courseContent)
        {
            if(sectionDetail)
                {
                   if(sectionDetail.subSection.length>0)
                   {
        
                    for(let subSection of sectionDetail.subSection)
                    {
                       
                        await deleteFilefromCloudinary(subSection.public_id)
        
                        await SubSection.findByIdAndDelete(subSection._id)
                    }
                    
                    console.log("all sub section deleted properly");
                    
                   }else{
                    console.log("No subSection Deleted");
                   }
                }else{
                    console.log("No section found");
                }
            await Section.findByIdAndDelete(sectionDetail._id)       
            }

        await  Course.findByIdAndDelete(courseId)
        
        return res.status(200).json({
            success:true,
            message:"Course Deleted Successfully"
        })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Course not delete",
            error:error.message
        })
    }
}
