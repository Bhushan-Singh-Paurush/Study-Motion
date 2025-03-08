const CourseProgress = require("../Model/CourseProgress")

exports.addLectureVideo=async(req,res)=>{
    try {
        const{subSectionId,courseId,userId}=req.body

        if(!subSectionId || !courseId || !userId)
        {
            return res.status(400).json({
                success:false,
                message:"Provide all fields"
            })
        }
        const courseprogress=await CourseProgress.findOne({courseId:courseId,userid:userId})

        if(!courseprogress)
        {
            return res.status(400).json({
                success:false,
                message:"Course Progress Not Found"
            })
        }

        const newCourseProgress =await CourseProgress.findOneAndUpdate({courseId:courseId,userid:userId},{$push:{completeVideos:subSectionId}},{new:true})
        
        return res.status(200).json({
            success:true,
            message:"Video Added to Course Progress",
            newCourseProgress
        })
    } catch (error) {
            return res.status(500).json({
                success:false,
                message:"Video not added to course Progress"
            })        
    }
}