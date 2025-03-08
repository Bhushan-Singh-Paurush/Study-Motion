import React from 'react'
import {Swiper,SwiperSlide} from "swiper/react"
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import "swiper/css"
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { NavLink } from 'react-router-dom';
import { Rating } from './Rating';

export const CardSlider = ({data}) => {

  
    return (
    <div>
    <Swiper
     spaceBetween={20}
        centeredSlides={true}
        slidesPerView={3}
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
    >
        {data?.map((category,index)=>(
           <div key={index}>{category.course.map((course)=>(
            <SwiperSlide key={course._id}>
                <NavLink to={`/courses/${course._id}`}>
                    <div className=' flex flex-col gap-1'>
                        <img className=' w-[300px] aspect-square  rounded-md' src={course.thumbnail}/>
                        <div className=' text-lg text-white'>{course.courseName}</div>
                        <Rating courseId={course._id}/>
                    </div>
                </NavLink>
            </SwiperSlide>
           ))}</div>
        ))}
    </Swiper>
    </div>
  )
}
