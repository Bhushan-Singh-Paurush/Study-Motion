import { toast } from "react-toastify"
import { setLoaing, setToken } from "../../slices/authSlice"
import { apiConnector } from "../apiconnector"
import {auth} from "../apis"
import { setUser } from "../../slices/profileSlice"

export function getPasswordResetToken(email,setEmailSend){
    return async(dispatch)=>{
           dispatch(setLoaing(true))
           try {
            
        
            
            const response=await apiConnector("POST",auth.RESETPASSTOKEN ,{email,})
            
            if(!response.data.success)
            {
                throw new Error(response.data.message)
                
            }
            toast.success(response.data.message)
            setEmailSend(true)
           } catch (error) {
              toast.error(error.response.data.message)
           }
           dispatch(setLoaing(false))
    }
}

export function changePassword(password,confirmpassword,token,setResetComplete){
    return async(dispatch)=>{
        try {
            dispatch(setLoaing(true))

            const response = await apiConnector("POST",auth.CHANGEPASS, {password,confirmpassword,token})
            
            if(!response.data.success)
            {
             throw new Error(response.data.message)
            }

            toast.success(response.data.message)
            setResetComplete(true)
        } catch (error) {
            toast.error(error.response.data.message)
        }
        dispatch(setLoaing(false))
    }
}

export function sendOtp(email , navigate)
{
    return async(dispatch)=>{
        const toastId=toast.loading("loading...")
        try {
            dispatch(setLoaing(true))

            const response=await apiConnector("POST",auth.SENDOTP,{email})

            if(!response.data.success)
            {
                throw new Error(response.data.message)
            }
            toast.success(response.data.message)
            navigate("/verify-email")
        } catch (error) {
            toast.error(error.response.data.message)
            console.log(error);
            
        }
        toast.dismiss(toastId)
        dispatch(setLoaing(false))

    }
}

export function signup(firstname,lastname,email,password,confirmpassword,accountType,otp,navigate)
{
    return async()=>{
        const toastid=toast.loading("loading...")
        try {

            const response =await apiConnector("POST",auth.SIGNUP,{
                firstname,lastname,email,password,confirmpassword,accountType,otp
            })

            if(!response.data.success)
            {
                throw new Error(response.data.message)
            }
            toast.success(response.data.message)
            navigate("/login")
        } catch (error) {
            toast.error(error.response.data.message)
            console.log(error);
            
        }
        toast.dismiss(toastid)
    }
}

export function login(email,password,navigate)
{
    return async(dispatch)=>{
        dispatch(setLoaing(true))
        try {
            const response = await apiConnector("POST",auth.LOGIN,{email,password})

            if(!response.data.success)
            {
                throw new Error(response.data.message)
            }

            dispatch(setToken(response.data.token))
            response.data.user.image=response.data.user.image || 
            `https://ui-avatars.com/api/?background=random&name=${response.data?.user?.firstname}+${response.data?.user?.lastname}`
            
            dispatch(setUser({...response.data.user}))
            
            localStorage.setItem("token",JSON.stringify(response.data.token))
            localStorage.setItem("user",JSON.stringify(response.data.user))

            toast.success(response.data.message)
            navigate("/") 
        } catch (error) {
            toast.error(error.response.data.message)
        }
        dispatch(setLoaing(false))
    }
}

export function logout(navigate){

    
    return (dispatch)=>{
        dispatch(setToken(null))
        dispatch(setUser(null))
        localStorage.clear("token")
        localStorage.clear("user")
        toast.success("Logged out successfully")
        navigate("/")
    }
}

export function googleLogin(credential,navigate){
    return async(dispatch)=>{
          dispatch(setLoaing(true))
          try {
            const response = await apiConnector("GET",auth.GOOGLELOGIN,{},{},
                {token:credential}
            )
            
            if(!response.data.success)
            {
                throw new Error(response.data.message)
            }

            dispatch(setToken(response.data.token))
            response.data.user.image=response.data.user.image || 
            `https://ui-avatars.com/api/?background=random&name=${response.data?.user?.firstname}+${response.data?.user?.lastname}`
            
            dispatch(setUser({...response.data.user}))
            
            localStorage.setItem("token",JSON.stringify(response.data.token))
            localStorage.setItem("user",JSON.stringify(response.data.user))

            toast.success(response.data.message)
            navigate("/") 

          } catch (error) {
               toast.error(error.response.data.message)
          }
          dispatch(setLoaing(false))
    }
}
