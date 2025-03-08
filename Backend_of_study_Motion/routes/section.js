const express = require("express")
const Router = express.Router()

const{createSection,updateSection,deleteSection}=require("../Controller/Section")

const{auth,isInstructor}=require("../Middleware/auth")
//************************************************************************
// ***********************************************************************
//Section Routes

//Section Created
Router.post("/createSection",auth,isInstructor,createSection)

//Section Updated
Router.post("/updateSection",auth,isInstructor,updateSection)

//Section Delete
Router.post("/deleteSection/:sectionId/:courseId",auth,isInstructor,deleteSection)


module.exports=Router