const express = require("express")
const Router = express.Router()

const{RatingAndReview,getAverageRating,getAllRating}=require("../Controller/Rating&Reviews")
const{auth}=require("../Middleware/auth")
//************************************************************************
// ***********************************************************************

//Rating and Reviews


//Rating and Review Created
Router.post("/RatingAndReview",auth,RatingAndReview)

//Get Average for Particular Course
Router.post("/getAverageRating",getAverageRating)

//Get All Rating in-respact of course
Router.get("/getAllRating",getAllRating)


module.exports=Router