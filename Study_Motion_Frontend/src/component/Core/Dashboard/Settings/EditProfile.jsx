import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-date-picker'
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { updateProfile } from '../../../../services/Operation/SettingsApi';
export const EditProfile = () => {
  const[state,setState]=useState({firstname:"",
                                   lastname:"",
                                   gender:"",
                                   about:"",
                                   contactNumber:""})
  const{user}=useSelector((state)=>state.profile)
  const[dateOfBirth,setDateofBirth]=useState()
  const dispatch=useDispatch()
  const{token}=useSelector((state)=>state.profile)
  const[upload,setUpload]=useState("Upload")
  useEffect(() => {

      setState((prevState) => ({
        ...prevState,
        firstname: user.firstname || '',
        lastname: user?.lastname || '',
        gender: user?.additionaldetail?.gender || 'Male',
        about: user?.additionaldetail?.about || '',
        contactNumber: user?.additionaldetail?.contactNumber || '',
      }));
      setDateofBirth(user?.additionaldetail?.dateOfBirth)
    
  }, []); 

  function Handelar(event){
    const{name,value}=event.target
    setState((pre)=>({...pre,[name]:value}))
  }

  const formdata=new FormData()
  formdata.append("firstname",state.firstname)
  formdata.append("lastname",state.lastname)
  formdata.append("about",state.about)
  formdata.append("gender",state.gender)
  formdata.append("contactNumber",state.contactNumber)
  formdata.append("dateOfBirth",new Date(dateOfBirth)?.toLocaleDateString())

  function submitHandelar(event){
    event.preventDefault()
    
    dispatch(updateProfile(formdata,token,setUpload))
  }

  return (
   <div className=' w-11/12 md:w-[80%] bg-richblack-800 rounded-sm p-2 md:p-8 border-richblack-700 border-[1px] flex flex-col md:flex-row gap-5 md:gap-0 justify-between items-start'>
  <div className='w-full flex flex-col gap-5'>
    <div>Profile Information</div>
    <form className='flex flex-col gap-5' onSubmit={submitHandelar}>
      <div className=' w-full flex flex-col gap-2 md:gap-0 md:flex-row justify-between items-center'>
      <label className='w-full md:w-[45%]'>
        <div className=' text-sm'>First Name</div>
        <input className="text-richblack-100 text-sm w-[100%] py-2 bg-richblack-700  pl-4 border-b-2 border-gray-300 focus:border-2 focus:outline-none rounded-lg"
        type='text'
        name='firstname'
        value={state.firstname}
        onChange={Handelar}  
        />
      </label>
      <label className='w-full md:w-[45%]'>
        <div className=' text-sm'>Last Name</div>
        <input className="text-richblack-100 text-sm w-[100%] py-2 bg-richblack-700  pl-4 border-b-2 border-gray-300 focus:border-2 focus:outline-none rounded-lg" 
        type='text'
        value={state.lastname}
        name='lastname'
        onChange={Handelar}  
        />
      </label>
      </div>

      <div className=' w-full flex flex-col md:flex-row gap-2 md:gap-0 justify-between items-center'>
      <label className='w-full md:w-[45%]' >
        <div className=' text-sm'>Date of Birth</div>
        <DatePicker 
        className=" w-full rounded-md text-black"
         onChange={(data)=>setDateofBirth(data)}
        format='dd/MM/yyyy'
        value={dateOfBirth}
        required
        />
        
      </label>
      <label className='w-full md:w-[45%]'>
        <div className=' text-sm'>Gender</div>
        <select name='gender' className="text-richblack-100 text-sm w-[100%] py-2 bg-richblack-700  pl-4 border-b-2 border-gray-300 focus:border-2 focus:outline-none rounded-lg"
          onChange={Handelar}>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
      </label>
      </div>

      <div className=' w-full flex flex-col md:flex-row gap-2 md:gap-0 justify-between items-center'>
      <label className='w-full md:w-[45%]'>
        <div className=' text-sm'>Contact Number</div>
        <input className="text-richblack-100 text-sm w-[100%] py-2 bg-richblack-700  pl-4 border-b-2 border-gray-300 focus:border-2 focus:outline-none rounded-lg"
        type='number'
        value={state.contactNumber}
        name='contactNumber'
        onChange={Handelar}  
        required
        />
      </label>
      <label className='w-full md:w-[45%]'>
        <div className=' text-sm'>About</div>
        <input className="text-richblack-100 text-sm w-[100%] py-2 bg-richblack-700  pl-4 border-b-2 border-gray-300 focus:border-2 focus:outline-none rounded-lg"
        type='text'
        value={state.about} 
        name='about'
        onChange={Handelar} 
        />
      </label>
      </div>
    <button className='w-fit text-black text-sm cursor-pointer  px-4 rounded-md py-1 bg-yellow-100'>{upload}</button>
    </form>
  </div>
  
   </div>
  )
}
