import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { buyCourse } from '../services/Operation/StudentFeatureApi'
import { getFullDetailsOfCourse } from '../services/Operation/courseApi'
import { Spinner } from '../component/Common/Spinner'
import { Rating } from './Category/Rating'
import { FaCreativeCommonsBy } from "react-icons/fa";
import { BsGlobe2 } from "react-icons/bs";
import { ConfirmationModal } from '../component/Common/ConfirmationModal'
import { CourseDetailsCard } from '../component/Course/CourseDetailsCard'
import { CourseContent } from '../component/Course/CourseContent'
import { Footer } from '../component/Common/Footer'
import { ReviewSection } from '../component/Common/ReviewSection'
export const CourseDetails = () => {
    const{user}=useSelector((state)=>state.profile)
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const courseId=useParams()
    const[confirmationModal,setConfirmationModal]=useState()
    const[course,setCourse]=useState()

    useEffect(()=>{
        ;(async()=>{
            const result = await getFullDetailsOfCourse(courseId)    
            if(result)
                setCourse(result);
        })()
    },[courseId])
    const purchaseHandler=async()=>{
        await buyCourse(user,token,navigate,[courseId],dispatch)
    }
  
    if(!course)
    {
        return (
            <div className=' w-full h-[100vh] flex justify-center items-center'>
                <Spinner/>
            </div>
        )
    }
    return (
    <div className=' relative'>
     <div className=' w-full flex bg-richblack-800 flex-col font-inter'>
    <div className=' mx-auto w-10/12 py-10 flex flex-col gap-2 text-sm text-richblack-50'>
     
        <div>Home / Category / <span className=' text-yellow-100'>{course.category.name}</span></div>
        <div className=' text-white text-2xl'>{course.courseName}</div>
        <div className=' text-xs text-richblack-50 max-w-[600px]'>{course.description}</div>
        <div className=' flex gap-2 items-center'>
        <Rating courseId={courseId.courseId}/> 
        <div>({course.ratingAndReveiw.length} ratings)</div>
        <div>{course.students.length} students</div>
        </div>
        <div>Created by {course.instructor.firstname + " " + course.instructor?.lastname}</div>
        <div className=' flex gap-2 items-center'>
        <FaCreativeCommonsBy className=' text-xs text-white'/>
        <div>Created at </div>
        <div>{new Date(course.createdAt).toLocaleString().replace(","," ")}</div>
        <BsGlobe2 className=' text-xs text-white'/>
        <div>English</div>
        </div>
    </div>
   
    </div>
    
    <div className=' mx-auto my-10 w-10/12 font-inter relative'>
      <div className=' flex flex-col gap-2 max-w-[600px] border-[1px] border-richblack-700 p-5'>
      <div className=' text-white text-2xl'>What you'll learn</div>
      <div className=' text-xs text-richblack-50 flex flex-col gap-2'>{course.whatYouWillLearn.split(".").map((line,index)=>(
        <div key={index}>{line}</div>
      ))}</div>
      </div>
      <div className='md:absolute right-0 -top-64'><CourseDetailsCard course={course} setConfirmationModal={setConfirmationModal}
        purchaseHandler={purchaseHandler}/></div>
      <CourseContent course={course}/>  
    </div>
   
    
      <ReviewSection/>
    <Footer/>
    {confirmationModal && <ConfirmationModal data={confirmationModal}/>}
    </div>
  )
}
