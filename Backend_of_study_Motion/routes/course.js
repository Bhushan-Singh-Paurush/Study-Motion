const express = require("express")
const Router = express.Router()

const{createCourse,showAllCourse,getCourseDetail, updateCourse, deleteCourse, getUserCourseDetail}=require("../Controller/Course")

const{auth,isInstructor}=require("../Middleware/auth")
const upload = require("../Middleware/Multer")
const { addLectureVideo } = require("../Controller/CourseProgress")

//*******************************************************************
// ******************************************************************
//Courses Routes

Router.post("/createCourse",auth,isInstructor,upload.single("file"), createCourse)

Router.get("/showAllCourse",showAllCourse)

Router.post("/getUserCourseDetail",auth,getUserCourseDetail)

Router.post("/getCourseDetail",getCourseDetail)

Router.post("/updateCourse",upload.single("file"),updateCourse)

Router.delete("/deleteCourse",auth,isInstructor,deleteCourse)

Router.post("/addLectureVideo",addLectureVideo)
module.exports=Router