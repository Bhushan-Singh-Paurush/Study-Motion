import React, { useEffect, useState } from 'react'
import OTPInput from 'react-otp-input'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { signup } from '../services/Operation/authApi'


export const VerifyEmail = () => {
    const[otp,setOtp]=useState()
    const navigate=useNavigate()
    const{signupdata}=useSelector((state)=>state.auth)
    const dispatch=useDispatch()
  function handelar(event){
    event.preventDefault()
    const{firstname,
    lastname,
    email,
    password,
    confirmpassword,accountType}=signupdata

    dispatch(signup(firstname,lastname,email,password,confirmpassword,accountType,otp,navigate))
  }

  useEffect(()=>{
    if(!signupdata)
    {
      navigate("/signup")
    }
  },[])


  return (
    <div className=' font-inter mx-auto w-10/12 max-w-[350px] my-20 flex flex-col items-start gap-4'>
        <div className="ml-4 text-white text-lg">Verify email</div>
        <p className="ml-4 text-richblack-100">A verification code has been sent to you. Enter the code below</p>
        <form onSubmit={handelar} className=' flex flex-col gap-4'>
        <OTPInput
         
          value={otp}
          onChange={setOtp}
          numInputs={6}
          renderInput={(props) => <input {...props}  className=' bg-richblack-800 text-white  rounded-sm text-xl ml-4'/>}
        />
        <button className="py-1 ml-4  w-full bg-yellow-100 border-yellow-5 border-b-2 border-r-2 text-lg rounded-lg">Verify email</button>
        </form>
    </div>
  )
}
