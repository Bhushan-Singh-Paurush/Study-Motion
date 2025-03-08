const RatingAndReview = require("../Model/RatingAndReview")
const Course = require("../Model/Courses")
const { default: mongoose } = require("mongoose")

exports.RatingAndReview=async(req,res)=>{
    try {
        const{rating,review,courseId}=req.body
        const studentId = req.user.id 

        if( !review || !courseId)
        {
            return res.status(400).json({
                success:false,
                message:"Provide all fields"
            })
        }

        const checkStudent = await Course.find({_id:courseId,students:{$elemMatch:{$eq:studentId}}})

        if(!checkStudent)
        {
            return res.status(400).json({
                success:false,
                message:"Student is not enrolled for this course"
            })
        }

        const alreadyReviewed = await RatingAndReview.findOne({user:studentId,course:courseId})
        
        if(alreadyReviewed)
        {
            return res.status(400).json({
                success:false,
                message:"Student already review for this course"
            })
        }

        const RatingAndReviewDetail = await RatingAndReview.create({
            rating,review,
            course:courseId,
            user:studentId
        })

        await Course.findByIdAndUpdate(courseId,{$push:{ratingAndReveiw:RatingAndReviewDetail._id}},{new:true})
    
    return res.status(200).json({
        success:true,
        message:"Rating and Review Stored successfully",
    })
    } catch (error) {
        return res.status(400).json({
            success:false,
            error:error.message
        })
    }
}

exports.getAverageRating=async(req,res)=>{
    try {
        const courseId = req.body.courseId
        const result = await RatingAndReview.aggregate([
            {
                $match:{
                    course:new mongoose.Types.ObjectId(courseId)
                }
                
            },
            {
                $group:{
                    _id:null,
                    AverageRating:{$avg:"$rating"}
                }
            }
        ])

        if(result.length>0)
        {
            return res.status(200).json({
                success:true,
                AverageRating:result[0].AverageRating
            })
        }

        return res.status(200).json({
             success:true,
             messsage:"Average rating is zero",
             AverageRating:0
        })
    } catch (error) {
        return res.status(400).json({
            success:false,
            error:error.message
        })
    }
}


exports.getAllRating=async(req,res)=>{
    try {
        const AllRating =await RatingAndReview.find({}).sort({rating:"desc"}).
                    populate({
                        path:"user",
                        select:"firstname lastname email image"
                    }).populate({
                        path:"course",
                        select:"courseName thumbnail"
                    }).exec();

        return res.status(200).json({
            success:true,
            message:"All Rating and Reviews",
            AllRating
        })            
                            
    } catch (error) {
        return res.status(500).json({
            success:false,
            error:error.message
        })
    }
}
