const cloudinary = require("cloudinary").v2

exports.uploadImageToCloudinary=async(file,folder,height,quality)=>{
    
    const option={
         folder,
         resource_type:"auto"
    }

    if(height) {option.height=height}
    if(quality) {option.quality=quality}

 
    
    return await cloudinary.uploader.upload(file.path,option)

}
exports.deleteFilefromCloudinary=async(public_id)=>{
        return  resp = await cloudinary.uploader.destroy(public_id)
}