import { toast } from "react-toastify"
import { apiConnector } from "../apiconnector"
import { payment } from "../apis"
const RAZORPAY_KEY=import.meta.env.VITE_RAZORPAY_KEY_ID
import razorpayLogo from "../../assets/Logo/razorpayLogo.webp"
import { resetcart } from "../../slices/cart"
function loadScript(src) {
    return new Promise((resolve)=>{
        const script = document.createElement("script");
        script.src=src;
        
        
        script.onload=()=>{
            resolve(true);
        }
        script.onerror=()=>{
            resolve(false);
        }
        document.body.appendChild(script);
    })
    
}

export async function buyCourse(user,token,navigate,courses,dispatch) {
    const toastId=toast.loading("Loading...")
    try {
        
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")
        
            if(!res)
            {
                toast.error("Failed to load Razorpay SDK")
                toast.dismiss(toastId)                
                return ;
            }
        const orderResponse = await apiConnector("POST",
            payment.CAPTURE_PAYMENT,
            {courses},
            {
                Authorization : `Bearer ${token}`
            })    

            if(!orderResponse.data.success)
                { 
                     throw new Error("Failed to make order");
                     
                }
              
            const options={
                key:RAZORPAY_KEY,
                currency:orderResponse.data.data.currency,
                amount:orderResponse.data.data.amount,
                order_id:orderResponse.data.data.id,
                name:"Study Motion",
                description: "Thank You for Purchasing the Course",
                image:razorpayLogo,
                prefill:{
                    name:user.firstname,
                    email:user.email
                },
                handler:function(response){
                        sendPaymentSuccessfulEmail(response,orderResponse.data.data.amount,token)
                        verifyPayment({...response,courses},navigate,dispatch,token)
                }

            }
        
            const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("payment.failed", function(response) {
            toast.error("oops, payment failed");
            console.log(response.error);
        })
            
            
    } catch (error) {
        toast.error(error.response.data.message)
        console.log(error);
        
        
    }
    toast.dismiss(toastId)
}

async function sendPaymentSuccessfulEmail(response,amount,token) {
    try {
            await apiConnector("POST",
            payment.SENT_EMAIL,
            {amount,orderId:response.razorpay_order_id,paymentId:response.razorpay_payment_id},
        {
            Authorization : `Bearer ${token}`
        }
        )
        
    } catch (error) {
        console.log(error);
    }
    
}

async function verifyPayment(databody,navigate,dispatch,token) {
    try {
        const response=await apiConnector("POST",
            payment.VERIFY_SIGNATURE,
            databody,
        {
            Authorization :`Bearer ${token}`
        }
        )
        if(!response.data.message)
        {
            throw new Error("Failed to verify payment");
        }
        
        toast.success(response.data.message)
        dispatch(resetcart())
        navigate("/dashboard/enrolled-courses")
    } catch (error) {
        toast.error(error.response.data.message)
        console.log(error);
    }
}