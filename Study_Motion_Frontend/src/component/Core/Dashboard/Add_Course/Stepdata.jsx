import React from 'react'
import { useSelector } from 'react-redux'
import { CourseInformationForm } from './CourseInformationForm'
import { CourseBuilderForm } from './CourseBuilderForm'
import { PublishCourse } from './Publish_Course'

export const Stepdata = () => {
    const{step}=useSelector((state)=>state.course)
    const steps = [
    {
      id: 1,
      title: "Course Information",
    },
    {
      id: 2,
      title: "Course Builder",
    },
    {
      id: 3,
      title: "Publish",
    },
  ]
    return (
    <div className=' flex flex-col gap-2 w-full'>
     <div className=' flex'>{steps.map((item,index)=>(
        <div key={index} className="flex flex-col gap-2 w-full items-start">
            <div className=' flex items-center w-full'>
            <div className={`${item.id===step ? " bg-yellow-900 text-yellow-50" : " bg-richblack-700 text-richblack-100"} rounded-full py-2 px-4`}>{item.id}</div>
            { index<steps.length-1 && <div className={` w-full flex-grow h-[1px] ${item.id===step ? " bg-yellow-50" : " bg-richblack-100"}`}></div> }
            </div> 
            <div className=' text-sm  flex justify-between'>{item.title}</div>
            
           
          
        </div>
     ))}</div>

     {step === 1 && <CourseInformationForm/>}
     {step ===2 && <CourseBuilderForm/>}
     {step===3 && <PublishCourse/>}
    </div>
  )
}
