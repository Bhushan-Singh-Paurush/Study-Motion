import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink, useLocation, useParams } from 'react-router-dom'
import { PiMonitorFill } from "react-icons/pi";
import { FaSquareCheck } from "react-icons/fa6";
import { FaPlay } from "react-icons/fa";
import { FaCircleChevronLeft } from "react-icons/fa6";
import { IconBtn } from '../../Common/IconBtn';
export const ViewCourseSidebar = ({setCourseModal}) => {
  const{courseEntireData,
        totalnoofLecture,
        completedLectures,
        courseSectionData,
      }=useSelector((state)=>state.viewCourse)
  
  const{sectionId,subSectionId}=useParams()
  const location=useLocation()
  const[activeSection,setActiveSection]=useState()
  const[activeSubSection,setActiveSubSection]=useState()
 
  useEffect(()=>{
    ;(()=>{
      const currentSectionIndex=courseSectionData.findIndex((section)=>section._id===sectionId)
      const subSectionIndex=courseSectionData[currentSectionIndex]?.subSection.findIndex((subsection)=>subsection._id===subSectionId)
     
      setActiveSection(courseSectionData?.[currentSectionIndex]?._id)
      setActiveSubSection(courseSectionData[currentSectionIndex]?.subSection[subSectionIndex]._id)
    })()
  },[courseSectionData,courseEntireData,location.pathname])

  return (
    <div className=" bg-richblack-800 w-[20%] font-inter z-10 bg-opacity-75">
      <div className=" flex flex-col w-full gap-2">
        <div className='p-2 py-4 flex gap-4 w-full font-bold flex-wrap text-sm border-b-[1px]  text-richblack-25 border-richblack-400'>
          <NavLink className="text-richblack-400 flex gap-2 items-center" to={"/dashboard/enrolled-courses"}><FaCircleChevronLeft className=' text-xs flex'/> Go Back</NavLink>
         {completedLectures.length === totalnoofLecture && <IconBtn onclick={()=>setCourseModal(true)} text="Add Review" active={true}/>}
          <div>{courseEntireData?.courseName} <span className={`${completedLectures.length === totalnoofLecture ? " text-caribbeangreen-100" : " text-richblack-400"}`}>{completedLectures?.length}{"/"}{totalnoofLecture}</span></div>
          
        </div>
        <div>{courseSectionData.map((section,index)=>(
                 <details  open={section._id===activeSection} key={index}>
                  <summary onClick={()=>setActiveSection(section._id)} className={`p-2 text-richblack-25 text-sm ${section._id===activeSection ? " bg-blue-100 text-white" : " bg-richblack-600"}`}>
                  {section?.sectionName}
                  </summary>
                  <div className=' flex flex-col p-2 gap-2 text-richblack-25'>{section?.subSection.map((subSection)=>(
                    <div key={subSection._id} className=' flex gap-2 items-center'>
                    {activeSubSection===subSection._id ?<FaPlay className=' text-sm text-blue-100'/> : <FaSquareCheck className=' text-sm'/>}
                   <NavLink to={`/view-course/${courseEntireData._id}/section/${section._id}/sub-section/${subSection._id}`} className={`${activeSubSection===subSection._id && " text-blue-100" } ${completedLectures.includes(subSection._id) && "line-through"} text-sm`} >{subSection.title}</NavLink>
                    <PiMonitorFill/>
                    </div>
                  ))}</div>
                 </details>
        ))}</div>
      </div>
      
    </div>
  )
}
