import React, { useEffect, useState } from 'react'
import {useForm} from "react-hook-form"
import { FaAngleLeft } from "react-icons/fa";
import { IconBtn } from '../../../../Common/IconBtn';
import {useDispatch, useSelector} from "react-redux"
import { resetCourseState, setsteps } from '../../../../../slices/courseSlice';
import {useNavigate} from "react-router-dom"
import { COURSE_STATUS } from '../../../../../utils/constants';
import { editCourseDetails } from '../../../../../services/Operation/courseApi';
export const PublishCourse = () => {
  const{register,setValue,handleSubmit,getValues}=useForm()
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const{course}=useSelector((state)=>state.course)
  const[loading,setLoading]=useState(false)
  const{token}=useSelector((state)=>state.auth)

  function gotoBack(){
    dispatch(setsteps(2))
  }
  function gotoCourses(){
        dispatch(resetCourseState())
        navigate("/dashboard/my-courses")
  }
  useEffect(()=>{
    if(course?.status===COURSE_STATUS.PUBLISHED)
    {
      setValue("public",true)
    }
  },[])
  const Submit=async(data)=>{
       if((course?.status===COURSE_STATUS.PUBLISHED && getValues("public")===true)
          || (course?.status===COURSE_STATUS.DRAFT  && getValues("public")===false))
        {
          gotoCourses()
          return 
        }else{
          const formdata=new FormData()
          const status=getValues("public") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT
          formdata.append("courseId",course?._id)
          formdata.append("status",status)
          
          setLoading(true)

          const result = await editCourseDetails(formdata,token)
          
          if(result)
          {
            setLoading(false)
            gotoCourses()
          }
            setLoading(false)
        }
  }
  return (
    <div className=' bg-richblack-800 p-8 font-inter'>
        <div className=' flex flex-col gap-6'>
        Publish Settings
        <form onSubmit={handleSubmit((data)=>Submit(data))} className=' flex flex-col gap-5'>
          <label className=' flex gap-2  text-richblack-400'>
            <input type='checkbox' {...register("public")}/>
            <div>Make this Course Public</div>
          </label>
          <div className='flex gap-2 place-content-end'>
            <IconBtn disabled={loading} text={"Back"} type={"button"} onclick={gotoBack}>
            <FaAngleLeft />
            </IconBtn>
            <button type='Submit' className='bg-yellow-100 text-black text-sm rounded-md py-1 px-2 font-inter w-fit' >Save Changes</button>
          </div>
        </form>
        </div>
        </div>
  )
}
