const Category = require("../Model/Category")
const Course = require("../Model/Courses")
exports.createCategory=async(req,res)=>{
    try {
        const{name,description}=req.body

        if(!name || !description)
        {
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }

        const categoryDetails=await Category.create({name,description})

        return res.status(200).json({
            success:true,
            message:"Category created Successfully",
            categoryDetails
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.showAllCategory=async(req,res)=>{
    try {
        const allTags=await Category.find({},{name:true,description:true})

        return res.status(200).json({
            success:true,
            message:"All tags Returned",
            allTags
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


exports.categoryPageDetails=async(req,res)=>{
    try {
        const categoryId = req.body.categoryId
        const selectedCategory = await Category.find({_id:categoryId}).populate({
            path:"course",
            match:{status:"Published"},
            populate:[
                {
                path:"courseContent",
                populate:{
                    path:"subSection"
                } 
            },
            {
                path:"instructor"
            },
            {
                path:"ratingAndReveiw"
            }
        ]}).exec()

        if(!selectedCategory){
            return res.status(400).json({
                success:false,
                message:"Data not found",
                error:error.message
            })
        }

        const otherCategoy = await Category.find({_id:{$ne:categoryId}}).populate({
            path:"course",
            match:{status:"Published"},
            populate:[
                {
                path:"courseContent",
                populate:{
                    path:"subSection"
                } 
            },
            {
                path:"instructor"
            },
            {
                path:"ratingAndReveiw"
            }
        ]}).exec()
    
       const topSellingCourse = await Course.find({status:"Published"}).populate({
        path:"courseContent",
        populate:{
        path:"subSection"  
        },
       }).populate("instructor").populate("ratingAndReveiw").exec()

       topSellingCourse.sort((a,b)=>b.students.length - a.students.length)
       
       
        return res.status(200).json({
            success:true,
            message:"category page details",
            selectedCategory,
            otherCategoy,
            topSellingCourse  
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            error:error.message
        })
    }
}