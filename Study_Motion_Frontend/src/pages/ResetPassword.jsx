import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useLocation } from 'react-router-dom'
import { Spinner } from '../component/Common/Spinner'
import { FaCheckCircle } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa6";
import { changePassword } from '../services/Operation/authApi';

export const ResetPassword = () => {
    const[resetComplete,setResetComplete]=useState(false)
    const[state,setState]=useState({newpass:"",confirmpass:""})
    const[hideNewPass,setHideNewPass]=useState(true)
    const[hideConfirmPass,setHideConfirmPass]=useState(true)
    const dispatch=useDispatch()
    const strongPassword=[
        "one lowercase character",
        "one special character",
        "one uppercase character",
        "8 character minimum",
        "one number"
    ]

    const location=useLocation()
    const token=location.pathname.split("/").at(-1)
    const{loading}=useSelector((state)=>state.auth)
    
function changeHandelar(event)
{
    setState((pre)=>({...pre,[event.target.name]:event.target.value}))
}

function submitHandelar(event)
{
    event.preventDefault()
    dispatch(changePassword(state.newpass,state.confirmpass,token,setResetComplete))
}

  return (
    <div className=' flex justify-center items-center mt-10 font-inter'>
    {loading ? <Spinner/> : <div className=' w-10/12 max-w-[300px] flex flex-col gap-4'>
        {!resetComplete ? <div className=" text-white text-lg">Choose new password</div> : <div className=" text-white text-lg">Reset complete!</div>}
    
        {!resetComplete ? <p className=' text-richblack-100 text-sm'>Almost done. Enter your new password and youre all set.</p> : <p className=' text-richblack-100 text-sm'>All done! We have sent an email to m***********@gmail.com to confirm</p>}   
    
        {!resetComplete && <form className=' flex flex-col w-full gap-4 items-start' onSubmit={submitHandelar} >
            <label className=' w-full relative'>
                <div className=" text-richblack-100 text-sm">New Password<sup className=' text-lg text-pink-500'>*</sup></div>
                <input type={`${hideNewPass ? "password" : "text"}`}
                 placeholder='Enter Password'
                 value={state.newpass}
                 name='newpass'
                 onChange={changeHandelar}
                 className="text-white text-sm w-[100%] py-2 bg-richblack-800  pl-4 border-b-2 border-gray-300 focus:border-2 focus:outline-none rounded-lg"   
                />
                <div className=' cursor-pointer right-2 bottom-2 text-richblack-100 text-xl absolute' onClick={()=>setHideNewPass(!hideNewPass)}>{hideNewPass ? <FaEye /> : <FaEyeSlash />}</div>
            </label>
            <label className=' w-full relative'>
                <div className=" text-richblack-100 text-sm">Confirm Password<sup className=' text-lg text-pink-500'>*</sup></div>
                <input type={`${hideConfirmPass ? "password" : "text"}`}
                 placeholder='Enter Password'
                 value={state.confirmpass}
                 name='confirmpass'
                 onChange={changeHandelar}
                 className="text-white text-sm w-[100%] py-2 bg-richblack-800  pl-4 border-b-2 border-gray-300 focus:border-2 focus:outline-none rounded-lg"
                />
                 <div className=' cursor-pointer right-2 bottom-2 text-richblack-100 text-xl absolute' onClick={()=>setHideConfirmPass(!hideConfirmPass)}>{hideConfirmPass ? <FaEye /> : <FaEyeSlash />}</div>
            </label>
            <div className='w-fll flex flex-wrap justify-between'>
               {strongPassword.map((item,index)=>(
                <div key={index} className='flex gap-2 text-caribbeangreen-500 text-xs'><span><FaCheckCircle /></span>{item}</div>
               ))}
            </div>

            <button className="py-1  w-full bg-yellow-100 border-yellow-5 border-b-2 border-r-2 text-lg rounded-lg">Reset Password</button>
        </form>}
        {resetComplete && <NavLink to={"/login"} className="py-1  w-full bg-yellow-100 border-yellow-5 border-b-2 border-r-2 text-lg rounded-lg">Return to Login</NavLink>}
    
    <div >
        <NavLink to={"/login"} className=" text-white text-sm flex gap-4 items-center"><span><FaArrowLeftLong /></span>Back to Login</NavLink>
    </div>
    </div>}
    </div>
  )
}
