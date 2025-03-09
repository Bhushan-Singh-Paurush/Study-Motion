import React, { useState } from 'react'
import {useForm} from "react-hook-form"
import { useDispatch, useSelector } from 'react-redux'
import {FaPlus} from "react-icons/fa"
import { IconBtn } from '../../../Common/IconBtn'
import { setcourse, setisedit, setsteps } from '../../../../slices/courseSlice'
import { createSection, updateSection } from '../../../../services/Operation/courseApi'
import { NestedView } from './NestedView'
import { toast } from 'react-toastify'
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from 'react-icons/fa6'


export const CourseBuilderForm = () => {
  const{register,
        setValue,
        getValue,
        formState:{errors},
        handleSubmit
       }=useForm()
       const{course}=useSelector((state)=>state.course)
       const[editSubmitName,setEditSubmitName]=useState()
       const[loading,setLoading]=useState(false)
       const{token}=useSelector((state)=>state.auth)
       const dispatch=useDispatch()
       
       function cancelEdit()
       {  
        setValue("sectionName","")
        setEditSubmitName(null)
       }
       const submit=async(data)=>{
        try {
            setLoading(true)
            let result
            if(editSubmitName)
            {
                
              result=await updateSection({
                    sectionName:data.sectionName,
                    sectionId:editSubmitName,
                    courseId:course?._id
                },token)
            }else{
                result = await createSection({sectionName:data.sectionName,
                    courseId:course?._id
                },token)
            }    
            if(result)
            {
                dispatch(setcourse(result))
                setEditSubmitName(null)
                setValue("sectionName","")
            }
        
        } catch (error) {
            console.log(error); 
        }
        setLoading(false)
       }
      
       function handleChangeEditSection(sectionId,sectionName){
              if(editSubmitName === sectionId)
              {
                cancelEdit()
                return 
              }else{
                setEditSubmitName(sectionId)
                setValue("sectionName",sectionName)
              }

       }
       
       function goBack(){
        dispatch(setisedit(true))
        dispatch(setsteps(1))
       }

       function goNext(){
        if(course?.courseContent.length===0)
        {
          toast.error("Add atleast one section")
          return 
        }
        if(course?.courseContent.some((Section)=>Section.subSection.length===0))
        {
          toast.error(`Add atleast one Lecture`)
          return 
        }
        dispatch(setsteps(3))
       }

    return (
    <div className=' bg-richblack-800 p-8'>
        <div className=' flex flex-col gap-6'>
          <h1>Course Builder</h1>
          <form className=' flex flex-col gap-4' onSubmit={handleSubmit(submit)}>
             <label >
            <input type='text'
             name='sectionName'
             className="text-white text-sm w-[100%] py-2 bg-richblack-700  pl-4 border-b-2 border-gray-300 focus:border-2 focus:outline-none rounded-lg"
            placeholder='Add a section to build your course'
            {...register("sectionName",{required:true})}   
            />
           
             </label>
            <div className=' w-full flex justify-between'>
            <IconBtn outline={true} 
            text={editSubmitName ? "Edit Section Name" : "Create Section"}
            type={"Submit"}
             disabled={loading}>
              <FaPlus/>
             </IconBtn>
             {editSubmitName && <IconBtn onclick={cancelEdit}>
                Cancel Edit
             </IconBtn>}
             </div>
          </form>
          {course?.courseContent.length>0 && <NestedView  handleChangeEditSection={handleChangeEditSection}/>}
        
        <div className=' w-full flex gap-2 items-center place-content-end'>

        <IconBtn text={"Back"} onclick={goBack} disabled={loading}>
        <FaAngleLeft />
        </IconBtn>
        <IconBtn text={"Next"} onclick={goNext} disabled={loading} active={true}>
        <FaAngleRight/>  
        </IconBtn>  
        </div>

        </div>
    </div>
  )
}
