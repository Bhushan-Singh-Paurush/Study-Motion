const Course = require("../Model/Courses")
const Section = require("../Model/Section")
const SubSection = require("../Model/SubSection")
const { deleteFilefromCloudinary } = require("../Util/imageUploader")
exports.createSection=async(req,res)=>{
    try {
        const{sectionName,courseId}=req.body

        if(!sectionName || !courseId)
        {
            return res.status(400).json({
                success:false,
                message:"Provide all properties"
            })
        }

    const sectionCreated=await  Section.create({sectionName})
    
    const updatedCourse = await Course.findByIdAndUpdate(courseId,
        {$push:{courseContent:sectionCreated._id}},{new:true})
        .populate({
            path:"courseContent",
            populate:{
                path:"subSection"
            }
        })
    
    return res.status(200).json({
        success:true,
        message:"Section created successfully",
        updatedCourse
    })    

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message,
            error:error.message
        })
    }
}


exports.updateSection=async(req,res)=>{
    try {
        const{sectionName,sectionId,courseId}=req.body
        if(!sectionName || !sectionId || !courseId)
        {
            return res.status(400).json({
                success:false,
                message:"Provide all fields"
            })
        }

    const section = await  Section.findByIdAndUpdate(sectionId,
                                                    {sectionName:sectionName},
                                                    {new:true})

    if(!section)
    {
        return res.status(400).json({
            success:false,
            message:"Section not updated"
        })
    }

    const course=await Course.findById(courseId).populate({
        path:"courseContent",
        populate:{
            path:"subSection"
        }
    })
                                                    
    return res.status(200).json({
        success:true,
        message:"Section updated successfully",
        section,
        course
    })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Section not updated",
            error:error.message  
        })
    }
}

exports.deleteSection=async(req,res)=>{
    try {
        const{sectionId,courseId}=req.params
        
        if(!sectionId || !courseId)
        {
            return res.status(400).json({
                success:false,
                message:"Section id not found"
            })
        }
     
        const course=await Course.findByIdAndUpdate(courseId , {$pull:{courseContent:sectionId}},{new:true}).populate({
            path:"courseContent",
            populate:{
                path:"subSection"
            }
        })
    
        const sectionDetail = await Section.findById(sectionId).populate("subSection")
        
         
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

        await Section.findByIdAndDelete(sectionId)
       
        return res.status(200).json({
            success:true,
            message:"Section deleted successfully",
            course
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Section not deleted"
        })
    }
}
