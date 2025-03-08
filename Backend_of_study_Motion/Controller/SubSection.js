const Section = require("../Model/Section")
const SubSection = require("../Model/SubSection")
const { uploadImageToCloudinary, deleteFilefromCloudinary } = require("../Util/imageUploader")
require("dotenv").config()
const fs=require("fs")

exports.subSectionCreation=async(req,res)=>{
    try {
        const{sectionId,title,timeDuration,description}=req.body
        const file=req.file

        if(!title || !timeDuration || !description || !file)
        {
            return res.status(400).json({
                 success:false,
                 message:"provide all fields"
            })
        }

        const uploadDetails=await uploadImageToCloudinary(file,process.env.FOLDER_NAME)
        fs.unlinkSync(file.path)
        
        const subSetionDetails=await SubSection.create({
            title,
            timeDuration,
            description,
            videoUrl:uploadDetails.secure_url,
            public_id:uploadDetails.public_id
        })
    const updatedSection=await Section.findByIdAndUpdate(sectionId,
        {$push:{subSection:subSetionDetails._id}},{new:true}).populate("subSection")

        return res.status(200).json({
            success:true,
            message:"SubSection Created successfully",
            updatedSection
        })
    
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"SubSection not created",
            error:error.message
        })
    }
}

exports.updateSubSection=async(req,res)=>{
    try {
        const{subSectionId}=req.body
        const{sectionId}=req.body
        
        
        const checkSubSection = await SubSection.findOne({_id:subSectionId})

        if(!checkSubSection)
        {
            return res.status(400).json({
                success:false,
                message:"Do not found Sub-Section"
            })
        }
        let uplodedVideo
        
        if(req.file)
        {
           
          const resp=await deleteFilefromCloudinary(checkSubSection.public_id)
          
          uplodedVideo=await uploadImageToCloudinary(req.file,process.env.FOLDER_NAME)
           req.body.public_id=uplodedVideo.public_id
           req.body.videoUrl=uplodedVideo.secure_url

           fs.unlinkSync(req.file.path)
        }

       await SubSection.findByIdAndUpdate(subSectionId,req.body,{new:true})

       const section = await Section.findById(sectionId).populate("subSection")

    return res.status(200).json({
        success:true,
        message:"Sub-Section updated successfully",
        section
    })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Sub-Section does not updated",
            error:error.message
        })
    }
}

exports.deleteSubSection=async(req,res)=>{
    try {
        const{subSectionId,sectionId}=req.body

    const checkSubSection=await SubSection.findOne({_id:subSectionId})

    if(!checkSubSection)
    {
         return res.status(400).json({
            success:false,
            message:"Sub-Section not found"
         })
    }
    await deleteFilefromCloudinary(checkSubSection.public_id)
    await SubSection.findByIdAndDelete(subSectionId)

    const updatedSection = await Section.findByIdAndUpdate(sectionId,
        {$pull:{subSection:subSectionId}},{new:true}).populate("subSection")
    
       
    
    return res.status(200).json({
          success:true,
          message:"Sub-Section deleted successfully",
          updatedSection
    })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Sub-section not deleted",
            error:error.message
        })
    }
        
}