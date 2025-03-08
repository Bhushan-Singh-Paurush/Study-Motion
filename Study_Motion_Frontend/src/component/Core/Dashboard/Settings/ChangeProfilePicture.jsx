import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateDisplayPicture } from '../../../../services/Operation/SettingsApi'

export const ChangeProfilePicture = () => {
  const{user}=useSelector((state)=>state.profile)
  const{token}=useSelector((state)=>state.auth)
  const[upload,setUpload]=useState("Upload")
  const[file,setFile]=useState()
  const dispatch=useDispatch()
  const formdata=new FormData()
  formdata.append("file",file)
  function uploadHandelar(){
    dispatch(updateDisplayPicture(token,formdata,setUpload))
  }
  
  return (
    <div className=' w-[80%] bg-richblack-800 rounded-sm p-6 border-richblack-700 border-[1px] flex justify-between items-start font-inter'>
    
    <div className=' flex items-start gap-5'>
    <img className='w-16 rounded-full border-[1px] border-richblack-800' src={file ? URL.createObjectURL(file) :user?.image}/>
    <div className=' flex flex-col gap-2'>
        <div>Change Profile Picture</div>
        <div className=' flex gap-2'>
        <label>
            <div className=' text-sm cursor-pointer text-richblack-100 px-4 rounded-md border-[1px] border-richblack-100 py-1 bg-richblack-700'>Select</div>
            <input 
            className=' hidden' 
            type='file' 
            accept='image/*'
            onChange={(event)=>setFile(event.target.files[0])}    
            />
        </label>
        <div className=' text-sm cursor-pointer text-richblack-100 px-4 rounded-md border-[1px] border-richblack-100 py-1 bg-richblack-700' onClick={()=>setFile()}>Clear</div>
        <div onClick={uploadHandelar} className=' text-black text-sm cursor-pointer  px-4 rounded-md py-1 bg-yellow-100'>{upload}</div>
        
        </div>
    </div>
    </div>
    
    </div>
  )
}
