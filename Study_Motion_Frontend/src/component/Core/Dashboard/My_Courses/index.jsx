import React, { useEffect, useState } from 'react'
import { IconBtn } from '../../../Common/IconBtn'
import {CiCirclePlus} from "react-icons/ci"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { resetCourseState } from '../../../../slices/courseSlice'
import { getUserEnrolledCourses } from '../../../../services/Operation/profileApi'
import { CourseTable } from './CourseTable'
export const MyCourses = () => {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const[courses,setCourses]=useState([])
    const{token}=useSelector((state)=>state.auth)


    function AddNewCourse(){
       dispatch(resetCourseState())
       navigate("/dashboard/add-course")
    }
    const getInstructorCourses=async()=>{
        try {
            const result = await getUserEnrolledCourses(token)
            if(result)
            {
                setCourses(result)
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        getInstructorCourses()
    },[])
    return (
    <div className='w-full h-full flex flex-col my-10 items-center gap-10'>
    <div className='w-11/12 md:w-[80%] flex flex-col gap-5'>
    <div className=' flex w-full justify-between text-xl'>
        <div>My Course</div>
        <IconBtn  active={true} onclick={AddNewCourse} text={"Add Course"}>
       <CiCirclePlus/>
    </IconBtn>
    </div>
    <CourseTable courses={courses} setCourses={setCourses}/>
    </div>
    </div>
    
  )
}
