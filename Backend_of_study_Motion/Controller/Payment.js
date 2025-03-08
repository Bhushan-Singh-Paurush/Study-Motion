const { default: mongoose } = require("mongoose")
const {razorpayInstance} = require("../Config/razorpay")
const Course = require("../Model/Courses")
const crypto = require("crypto")
const User = require("../Model/User")
const mailSend = require("../Util/mailSender")
const courseEnrollmentEmailTemplate = require("../Template/courseEnrollmentEmailTemplate")
const CourseProgress = require("../Model/CourseProgress")
const paymentSuccessEmail = require("../Template/paymentSuccessEmail")
require("dotenv").config()


exports.capturePayment=async(req,res)=>{
    try {
        const{courses}=req.body
        const id = req.user.id
         
        if(courses.length==0)
        { 
               return res.status(400).json({
                    success:false,
                    messsage:"No course found"
               })
        }
        let amount=0
       
        for(let element of courses)
        {            
            let course
            try {
               course = await Course.findById(element.courseId)    
            } catch (error) {
                console.log(error);
                return res.status(400).json({
                    
                    
                    success:false,
                    message:`course not found`,
                }) 
            }
            
            const userId =new mongoose.Types.ObjectId(id);

            if(course.students.includes(userId))
            {
                return res.status(400).json({
                    success:false,
                    message:"Student is alread enrolled"
                })
            }
           amount=amount+parseInt(course.price)
        }

        const payload = {
            amount:amount*100,
            currency:"INR",
            receipt:Date.now().toString()
        }

        try {
            const paymentResponse=await razorpayInstance.orders.create(payload)

            return res.status(200).json({
                success:true,
                data:paymentResponse
            })
        } catch (error) {
            return res.status(400).json({
                success:false,
                message:"could not initiate order"
                
            })
        }

    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.verifySignature=async(req,res)=>{
    try {
        const order_id=req.body?.razorpay_order_id
        const payment_id=req.body?.razorpay_payment_id
        const signature=req.body?.razorpay_signature
        const courses=req.body?.courses
        const id=req.user.id

        if(!order_id || !payment_id || !signature || !courses || !id)
        {
            return res.status(400).json({
                success:false,
                message:"Provide all field "
            })
        }
        let body=order_id + "|" + payment_id

        const expactedSinature=crypto.createHmac("sha256",process.env.RAZORPAY_KEY_SECRET).
        update(body.toString()).digest("hex")

        if(expactedSinature === signature)
        {       
            await enrollStudents(courses,id,res)
            return res.status(200).json({
                status:true,
                message:"Successfully Enrolled to the course"
            })
        }else
        {
            return res.status(400).json({
            success:false,
            message:"Varified Signature failed"
        })
        }

    } catch (error) {
        return res.status(500).json({
            success:false,
            error:error.message
        })
    }
}

const enrollStudents=async(courses,id,res)=>{
           try {
            if(!courses || !id)
            {
                return res.status(400).json({
                    success:false,
                    message:"Please provide userid and courses"
                })
            }

            for(let element of courses)
            {
                const enrolledcourse=await Course.findByIdAndUpdate(element.courseId,
                    {$push:{students:id}},{new:true})

                if(!enrolledcourse)
                {
                    return res.status(400).json({
                        success:false,
                        message:"course not found",

                    })
                }

                await CourseProgress.create({courseId:element.courseId,userid:id,completeVideos:[]})

                const enrolledStudent =await User.findByIdAndUpdate(id,{$push:{courses:element.courseId}},{new:true})

                if(!enrolledStudent)
                {
                    return res.status(400).json({
                        success:false,
                        message:"Student not enrolled"
                    })
                }
                mailSend(enrolledStudent.email,
                    `Successfully enrolled to ${enrolledcourse.courseName}`,
                    courseEnrollmentEmailTemplate(enrolledcourse.courseName,
                        `${enrolledStudent.firstname} ${enrolledStudent.lastname}`
                    )
                )
            }

           } catch (error) {
                return res.status(500).json({
                    success:false,
                    error:error.message
                })
           }
}

exports.sendPaymentSuccessEmail = async(req,res)=>{
    try {
    const{amount, orderId, paymentId}=req.body
    const id = req.user.id
   
    
    if(!amount || !orderId || !paymentId || !id)
    {
        return res.status(400).json({
            success:false,
            message:"provide all entries properly"
        })
    }
    const enrolledStudent=await User.findById(id)
    const emailResponse = mailSend(enrolledStudent.email,"Payment Recived",
        paymentSuccessEmail(`${enrollStudents.firstname}`,amount/100,orderId,paymentId)
    )

    if(!emailResponse)
    {
        return res.status(400).json({
            success:false,
            message:"Failed to send email"
        })
    }
    return res.status(200).json({
        success:true,
        message:"Email send successfully"
    })
    } catch (error) {
        return res.status(500).json({
            success:false,
            error:error.message
        })
    }
}