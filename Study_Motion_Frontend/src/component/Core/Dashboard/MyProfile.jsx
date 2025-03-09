import React from 'react'
import { useSelector } from 'react-redux'
import { CTAbutton } from '../../HomePage/CTAbutton';
import * as Icon1 from "react-icons/fa"

export const MyProfile = () => {
  const{user}=useSelector((state)=>state.profile)
  
  return (
    <div className='w-full h-full flex flex-col my-10 items-center gap-10'>
      {/* section A */}
      <div className=' w-11/12 md:w-[80%] bg-richblack-800 rounded-sm p-2 md:p-8 border-richblack-700 border-[1px] flex flex-col md:flex-row gap-5 md:gap-0 justify-between items-start'>
        <div className=' flex gap-2 md:gap-4 items-center'>
          <img src={user.image} className='w-10 md:w-16 rounded-full'/>
          <div className=' text-sm text-richblack-100'>
            <div className=' text-white font-semibold'>{user.firstname}{" "}{user?.lastname}</div>
            <div>{user.email}</div>
          </div>
        </div>
      <CTAbutton active={true} text={"Edit"} link={"/dashboard/settings"} Icon={Icon1["FaRegEdit"]}/>
      </div>

      {/* section B */}
      <div className=' w-11/12 md:w-[80%] bg-richblack-800 rounded-sm p-2 md:p-8 border-richblack-700 border-[1px] flex flex-col md:flex-row gap-5 md:gap-0 justify-between items-start'>
      
        <div className=' flex flex-col items-start gap-10 text-sm text-richblack-100'>
          <div className=' text-white font-semibold'>About</div>
          <div>{user.additionaldetail?.about || "Write Something about Yourself"}</div> 
        </div>
       
      
      <CTAbutton active={true} text={"Edit"} link={"/dashboard/settings"} Icon={Icon1["FaRegEdit"]}/>
      </div>

      <div className=' w-11/12 md:w-[80%] bg-richblack-800 rounded-sm p-2 md:p-8 border-richblack-700 border-[1px] flex flex-col md:flex-row gap-5 md:gap-0 justify-between items-start'>
          <div className=' flex flex-col gap-5'>
            <div>Personal Details</div>
            <div className=' grid grid-cols-2 gap-x-20 gap-y-5'>
            <div className="flex flex-col">
            <div className=' text-sm text-richblack-100'>First Name</div>
            <div className=' text-xs text-white'>{user.firstname}</div>
            </div>
            <div className="flex flex-col">
            <div className=' text-sm text-richblack-100'>Last Name</div>
            <div className=' text-xs text-white'>{user?.lastname || "Add Last Name"}</div>
            </div>
            <div className="flex flex-col">
            <div className=' text-sm text-richblack-100'>Email</div>
            <div className=' text-xs text-white'>{user.email}</div>
            </div>
            <div className="flex flex-col">
            <div className=' text-sm text-richblack-100'>Phone Number</div>
            <div className=' text-xs text-white'>{user.additionaldetail?.contactNumber || "Add Contact Number"}</div>
            </div>
            <div className="flex flex-col">
            <div className=' text-sm text-richblack-100'>Gender</div>
            <div className=' text-xs text-white'>{user.additionaldetail?.gender || "Add Gender"}</div>
            </div>
            <div className="flex flex-col">
            <div className=' text-sm text-richblack-100'>Date of Birth</div>
            <div className=' text-xs text-white'>{user.additionaldetail?.dateOfBirth || "Add Date of Birth"}</div>
            </div>
            </div>
          </div>
          <CTAbutton active={true} text={"Edit"} link={"/dashboard/settings"} Icon={Icon1["FaRegEdit"]}/>
      </div>
    </div>
  
  )
}
