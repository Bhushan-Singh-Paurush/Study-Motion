const express = require("express")
const upload = require("../Middleware/Multer")
const Router = express.Router()

const{updateProfile,deleteAccount,getAllUserDetails,updateDisplayPicture,getAllEnrollCourse, deleteEnrollCourse, instructorCoursesData, contactUs}=require("../Controller/Profile")

const{auth, isStudent} = require("../Middleware/auth")

const {resetPasswordToken,resetPassword} = require("../Controller/ResetPassword")

//***********************************************************************
// **********************************************************************
//Profile Page

//update profile
Router.put("/updateProfile",upload.none(),auth,updateProfile)

//delete Account
Router.delete("/deleteAccount",auth,deleteAccount)

//Get User Details
Router.get("/getAllUserDetails",auth,getAllUserDetails)

//update Picture
Router.put("/updateDisplayPicture",upload.single("file"), auth,updateDisplayPicture)

//Get All enrolled Courses
Router.get("/getAllEnrollCourse",auth,getAllEnrollCourse)

//Remove Enrolled Course
Router.post("/deleteEnrollCourse",auth,isStudent,deleteEnrollCourse)

//Instructor Courses Data
Router.get("/instructorCoursesData",auth,instructorCoursesData)

//contact Us
Router.post("/contactUs",contactUs)

//*************************************************************************
//*************************************************************************
// Reset Password

Router.post("/resetPasswordToken",resetPasswordToken)

Router.post("/resetPassword",resetPassword)

module.exports=Router