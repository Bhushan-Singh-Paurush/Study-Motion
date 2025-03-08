import React from 'react'
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom"
import { deleteProfile } from '../../../../services/Operation/SettingsApi';

export const DeleteAccount = () => {
  const{token}=useSelector((state)=>state.profile)
  const navigate=useNavigate()
  const dispatch=useDispatch()
  function Handelar(){
    dispatch(deleteProfile(token,navigate))
  }
  return (
    <div className=' w-[80%] bg-pink-900 rounded-sm p-6 border-pink-700 border-[1px] flex gap-5 items-center font-inter'>
    <div className=' text-pink-200 text-xl bg-pink-700 p-4 rounded-full'><RiDeleteBin6Line /></div>
    <div className=' text-richblack-50 text-xs flex flex-col items-start'>
      <div className=' text-sm'>Delete Account</div>
      <div>Would you like to delete account?</div>
      <div>This account contains Paid Courses. Deleting your account will remove all the contain associated with it.</div>
      <div onClick={Handelar} className=' cursor-pointer italic text-pink-200 py-2'>I want to delete my account.</div>
    </div>
    </div>
  )
}
