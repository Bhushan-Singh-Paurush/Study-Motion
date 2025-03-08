const express = require("express")
const Router = express.Router()

const{createCategory,showAllCategory,categoryPageDetails}=require("../Controller/Category")


const{auth,isAdmin}=require("../Middleware/auth")
//**********************************************************************
// *********************************************************************
//Category Routes


//Create Category
Router.post("/createCategory",auth,isAdmin,createCategory)

//Show all Category 
Router.get("/showAllCategory",showAllCategory)

//Category Page Detail
Router.post("/categoryPageDetails",categoryPageDetails)

module.exports=Router