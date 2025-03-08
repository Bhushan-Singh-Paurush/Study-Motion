const express = require("express")

const Router = express.Router()

const{capturePayment,verifySignature, sendPaymentSuccessEmail}=require("../Controller/Payment")

const{auth,isStudent}=require("../Middleware/auth")


//***********************************************************************
// **********************************************************************
//Payment Route

//Capture Payment
Router.post("/capturePayment",auth,isStudent,capturePayment)

//Verify Signature
Router.post("/verifySignature",auth,isStudent,verifySignature)

Router.post("/sendPaymentSuccessEmail",auth,sendPaymentSuccessEmail)

module.exports=Router