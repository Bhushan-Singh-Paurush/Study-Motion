import React, { useEffect, useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { Footer } from '../component/Common/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { setCompletedLectures, setCourseEntireData, setCourseSectionData, setTotalnoofLecture } from '../slices/ViewCourseSlice'
import { ViewCourseSidebar } from '../component/Core/ViewCourse/ViewCourseSidebar'
import { getFullDetailsOfUserCourse } from '../services/Operation/courseApi'
import {Swiper,SwiperSlide} from "swiper/react"
import { Autoplay } from 'swiper/modules';
import {bgImageUrl} from  "../data/ViewDetailImages"
import "swiper/css"
import { CourseReviewModal } from '../component/Core/ViewCourse/CourseReviewModal'

export const ViewCourse = () => {
    const{courseId}=useParams()
    
    const{token}=useSelector((state)=>state.auth)
    const dispatch=useDispatch()
     const[courseModal,setCourseModal]=useState()
    useEffect(()=>{
        ;(async()=>{
            const result = await getFullDetailsOfUserCourse({courseId},token)
            {   
                dispatch(setCourseEntireData(result?.courseDetail))
                dispatch(setCourseSectionData(result?.courseDetail?.courseContent))
                let lectures=result?.courseDetail?.courseContent?.reduce((acc,cur)=>acc+cur.subSection?.length,0)
                dispatch(setTotalnoofLecture(lectures))
                dispatch(setCompletedLectures(result?.completedVideos))
            }
        })()
    },[])
    return (
    <div className=' relative'>
    <div className='flex min-h-[calc(100vh-3.5rem)] text-white'>
    <div className='absolute top-0 left-0 w-full'>
   <Swiper
    centeredSlides={true}
    slidesPerView={1}
    loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        speed={10000}
        modules={[Autoplay]}
        className="mySwiper"
   >
    {bgImageUrl.map((item,index)=>(
      <SwiperSlide key={index}>
        <img className=' brightness-50 w-full object-cover max-h-[calc(100vh-3.5rem)]' src={item}/>
      </SwiperSlide>  
    ))}
   </Swiper>
   </div>
    <ViewCourseSidebar setCourseModal={setCourseModal}/>
    <div className='flex-1 min-h-[calc(100vh-3.5rem)]'>
       <Outlet/>
    </div>
    </div>
    <Footer/>
    {courseModal && <CourseReviewModal setCourseModal={setCourseModal}/>}
    </div>
  )
}
