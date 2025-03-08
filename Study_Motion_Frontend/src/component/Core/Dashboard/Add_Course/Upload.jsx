import React, { useCallback, useEffect, useRef, useState } from 'react'
import {useDropzone} from 'react-dropzone'
import { FaCloudUploadAlt } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
export const Upload = ({register, 
    errors,
    label, 
    name, 
    placeholder,
    setValue,
    video=false,
    viewData=null,
    editData=null
    }) => {
     const inputRef=useRef()
     const[disableDropZone,setDisableDropZone]=useState()
    const[file,setFile]=useState()
    const[preview,setPreview]=useState(viewData ? viewData : editData ? editData : '')

    const onDrop=useCallback((files)=>{
       setFile(files[0])
      setPreview(URL.createObjectURL(files[0]))
      
  },[]) 

    const {getRootProps,getInputProps,isDragActive}=useDropzone({
        accept:!video ? {"image/*":[".jpeg",".jpg",".png"]} : {"video/*":[".mp4"]},
        onDrop
    })
  function removeHandelar(event)
  {
    event.preventDefault()
    setFile()
    setPreview()
    setValue(name,null)
  }
   
  useEffect(()=>{
    register(name,{required:true})
    if(viewData)
    {
      setDisableDropZone(true)
    }
  },[register])

  useEffect(()=>{
    setValue(name,file)   
  },[file,setValue])

  
  return (
    <div>
        <label className=' flex flex-col gap-1'>
        <div>{label}<sup className="text-pink-500">*</sup></div>
            <div className='rounded-md cursor-pointer max-w-full min-h-[200px] p-2  bg-richblack-700 flex items-center justify-center'  {...getRootProps()}>
              <input {...getInputProps()} ref={inputRef}/> 
                { !preview ? 
                <div className='w-full flex flex-col  justify-center items-center'>
                 <div className=' flex justify-center items-center text-yellow-50 rounded-full text-lg  w-[40px] aspect-square bg-yellow-900'><FaCloudUploadAlt /></div>
                <span className=' text-richblack-100 text-xs'>{placeholder}</span>
                <div className=' flex w-[80%] justify-between mt-5'>
                  <div className=' flex items-center gap-1  text-richblack-100 text-xs'><GoDotFill /> Aspect ratio 16:9</div>
                  <div className=' flex items-center gap-1  text-richblack-100 text-xs'><GoDotFill /> Recommended size 1024x576</div>
                </div>
                </div>
                   :
                   <div className=' flex flex-col gap-1 items-center'>
                   {!video ? <img width={300} src={preview}/>: <video width={300} controls src={preview}/>}
                  {!viewData && <button className=' cursor-pointer rounded-md px-1  bg-richblack-400' onClick={removeHandelar}>Remove</button>}
                   </div>
                }
            </div>
            {errors[name] && <span>{label} is required</span>}
        </label>
    </div>
  )
}
