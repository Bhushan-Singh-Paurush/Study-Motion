import React, { useState } from 'react'
import { FaEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa6";
import { changePassword } from '../../../../services/Operation/SettingsApi';
import { useSelector } from 'react-redux';

export const ChangePassword = () => {
  const[form,setForm]=useState({password:"",confirmpassword:"",currentPassword:""})
  const[showpass1,setShowpass1]=useState(false)
  const[showpass2,setShowpass2]=useState(false)
  const[showpass3,setShowpass3]=useState(false)
  const{token}=useSelector((state)=>state.profile)
  const[upload,setUpload]=useState("Upload")

  function changehandelar(event){
    setForm((pre)=>({...pre,[event.target.name]:event.target.value}))
  }


  function  submitHandelar(event){
         event.preventDefault()
        changePassword(form,token,setUpload)
  }

  return (
    <div className=' w-11/12 md:w-[80%] bg-richblack-800 rounded-sm p-2 md:p-8 border-richblack-700 border-[1px] flex flex-col md:flex-row gap-5 md:gap-0 justify-between items-start'>
          <form onSubmit={submitHandelar} className='flex flex-col gap-5 w-full'>
          <div  className=' flex flex-col md:flex-row gap-2 md:gap-0 w-full justify-between flex-wrap gap-y-4'>
          <label className="w-full md:w-[45%] relative">
              <p className=" text-white text-sm ">
                Current Password <sup className="text-lg text-pink-500">*</sup>
              </p>
              <input
                className="text-white text-sm w-[100%] py-2 bg-richblack-700  pl-4 border-b-2 border-r-2 border-richblack-100 focus:border-2 focus:outline-none rounded-lg"
                onChange={changehandelar}
                name="currentPassword"
                value={form.currentPassword}
                type={showpass3 ? "text" : "password"}
                required
                placeholder="Enter Password"
              />
              <span
                className="absolute text-xl bottom-2 right-2 text-richblack-100"
                onClick={() => {
                  setShowpass3(!showpass3);
                }}
              >
                {showpass3 ? <FaEyeSlash /> : <FaEye />}
              </span>
            </label>
          
          
          <label className=" relative w-full md:w-[45%]">
              <p className=" text-white text-sm ">
                Creat Password <sup className="text-lg text-pink-500">*</sup>
              </p>
              <input
                className="text-white text-sm w-[100%] py-2 bg-richblack-700  pl-4 border-b-2 border-r-2 border-richblack-100 focus:border-2 focus:outline-none rounded-lg"
                onChange={changehandelar}
                name="password"
                value={form.password}
                type={showpass1 ? "text" : "password"}
                required
                placeholder="Enter Password"
              />
              <span
                className="absolute text-xl bottom-2 right-2 text-richblack-100"
                onClick={() => {
                  setShowpass1(!showpass1);
                }}
              >
                {showpass1 ? <FaEyeSlash /> : <FaEye />}
              </span>
            </label>
            <label className=" relative w-full md:w-[45%]">
              <p className=" text-white text-sm ">
                Confirm Password <sup className="text-lg text-pink-500">*</sup>
              </p>
              <input
                className="text-white text-sm w-[100%] py-2 bg-richblack-700  pl-4 border-b-2 border-r-2 border-richblack-100 focus:border-2 focus:outline-none rounded-lg"
                onChange={changehandelar}
                name="confirmpassword"
                value={form.confirmpassword}
                type={showpass2 ? "text" : "password"}
                required
                placeholder="Confirm Password"
              />
              <span
                className="absolute text-xl bottom-2 right-2 text-richblack-100"
                onClick={() => {
                  setShowpass2(!showpass2);
                }}
              >
                {showpass2 ? <FaEyeSlash /> : <FaEye />}
              </span>
            </label>
            </div>
            <button className='w-fit text-black text-sm cursor-pointer  px-4 rounded-md py-1 bg-yellow-100'>{upload}</button>
            </form>
    </div>
  )
}
