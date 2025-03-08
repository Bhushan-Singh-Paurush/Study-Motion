const express = require("express")
const Router = express.Router()

const {sendOTP,signUp,login,changePassword} = require("../Controller/Auth")

const {auth} = require("../Middleware/auth")

//**************************************************************************
//**************************************************************************
//Authentation

//send otp route
Router.post("/sendOTP",sendOTP)

//login
Router.post("/login",login)

//sign up
Router.post("/signUp",signUp)

//change password 
Router.post("/changePassword",auth,changePassword)




module.exports=Router

