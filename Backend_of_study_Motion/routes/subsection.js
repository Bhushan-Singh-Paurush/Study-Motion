const express = require("express")
const Router = express.Router()

const{subSectionCreation,updateSubSection,deleteSubSection}=require("../Controller/SubSection")
const upload = require("../Middleware/Multer")
//************************************************************************
// ***********************************************************************
//Sub-Section Route

//Sub-Section Created
Router.post("/subSectionCreation",upload.single("file"),subSectionCreation)

//Sub-Section Update
Router.post("/updateSubSection",upload.single("file"),updateSubSection)

//Sub-Section Delete
Router.post("/deleteSubSection",deleteSubSection)

module.exports=Router