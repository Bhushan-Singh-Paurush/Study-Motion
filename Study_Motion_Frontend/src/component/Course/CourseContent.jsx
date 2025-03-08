import React, { useState } from 'react'
import { GoDotFill } from "react-icons/go";
import { SectionData } from './SectionData';
import { TimeDuration } from '../Common/TimeDuration';

export const CourseContent = ({course}) => {
  const[isExpand,setIsExpand]=useState(false)
  const totalLecture=course.courseContent.reduce((acc,cr)=>acc+cr.subSection.length,0)
  
    return (
    <div className=' w-10/12 max-w-[600px] text-richblack-50 font-inter my-10 flex flex-col gap-2'>
    <div className=' text-white text-2xl'>CourseContent</div>
    <div className=' flex w-full justify-between items-center text-xs'>
        <div className=' flex gap-3 items-center'>
        {course.courseContent?.length} Sections<GoDotFill/>{totalLecture} Lectures <GoDotFill/> <TimeDuration time={course.totalCourseDuration}/> total lenght</div>
    <div className=' flex gap-3 items-center text-yellow-100'>
     <button onClick={()=>setIsExpand(true)}>expend all sections</button>
    <button onClick={()=>setIsExpand(false)}>Collapse all sections</button>
    </div>
    </div>
    <SectionData isExpand={isExpand} section={course.courseContent}/>
    <div className=' flex flex-col gap-1 my-4'>
      <div className=' text-white text-2xl'>Author</div>
      <div className=' flex gap-3 items-center'>
        <img src={course.instructor.image} className=' rounded-full' alt='Instructor Image'/>
        <div>{`${course.instructor.firstname + " " + course.instructor?.lastname}`}</div>
      <div>{course.additionaldetail?.about}</div>
      </div>
    </div>
    </div>
  )
}
