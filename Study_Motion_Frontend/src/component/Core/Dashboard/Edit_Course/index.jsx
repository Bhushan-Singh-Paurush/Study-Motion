import React, { useEffect, useState } from 'react'
import { Stepdata } from '../Add_Course/Stepdata';
import { GoDotFill } from 'react-icons/go';
import { MdElectricBolt } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import { setcourse, setisedit, setsteps } from '../../../../slices/courseSlice';
import { Spinner } from '../../../Common/Spinner';
import { getFullDetailsOfCourse } from '../../../../services/Operation/courseApi';

const tipsData = [
    "Set the Course Price option or make it free.",
    "Standard size for the course thumbnail is 1024x576.",
    "Video section controls the course overview video.",
    "Course Builder is where you create & organize a course.",
    "Add Topics in the Course Builder section to create lessons, quizzes, and assignments.",
    "Information from the Additional Data section shows up on the course single page.",
    "Make Announcements to notify any important.",
    "Notes to all enrolled students at once.",
  ];
export const EditCourse = () => {
    const courseId=useParams()
    
    const[loading,setLoaing]=useState(false)
    const{token}=useSelector((state)=>state.auth)
    const{course}=useSelector((state)=>state.course)
    const dispatch=useDispatch()
    useEffect(()=>{
        ;(async()=>{
          setLoaing(true)
          const result = await getFullDetailsOfCourse(courseId,token)
          
          if(result)
          {
            dispatch(setisedit(true))
            dispatch(setsteps(1))
            dispatch(setcourse(result))
          }
          setLoaing(false)
        })()
    },[])

    if(loading)
    {
        return <div className=' w-full h-full flex items-center justify-center'>
            <Spinner/>
        </div>
    }
    return (
     <div className=" w-full h-full md:p-10 py-2 md:py-0 relative">
     { course ? <div className="w-11/12 md:w-[90%] mx-auto flex flex-col md:flex-row gap-10 items-start">
       
       
       <Stepdata/>
       <div className=" p-4 bg-richblack-700 text-white flex flex-col gap-2 font-inter">
       <div className=" flex gap-2 items-center text-lg">
         <MdElectricBolt className=" text-yellow-100" />
         Course Upload Tips
       </div>
       <div>
         {tipsData.map((ClipboardItem, index) => (
           <div className="flex gap-2 text-xs" key={index}>
           <GoDotFill />{ClipboardItem}
           </div>
         ))}
       </div>
       </div>
     </div> : <div>No course Fount</div>}
 </div>  );
}
