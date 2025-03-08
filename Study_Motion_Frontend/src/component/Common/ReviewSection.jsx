import React, { useEffect, useState } from 'react'
import {Swiper,SwiperSlide} from "swiper/react"
import { Autoplay } from 'swiper/modules';
import "swiper/css"
import "swiper/css/autoplay"; 

import { apiConnector } from '../../services/apiconnector';
import { rating } from '../../services/apis';
import { Rating } from '../../pages/Category/Rating';

export const ReviewSection = () => {
  const[allReviews,setAllReviews]=useState([])
  useEffect(()=>{
    ;(async()=>{
      try {
        const result=await apiConnector("GET",rating.GET_ALL_REVIEWS)   
        if(result)
         setAllReviews(result.data.AllRating); 
      } catch (error) {
        console.log(error);
      }
       
    })()
  },[])
 
  return (
    <div className=' mx-auto w-10/12 max-w-[1000px] font-inter my-10 flex flex-col gap-10  items-center'>
    <h1 className=' text-white text-3xl'>Reviews from other Learners</h1>
     <div className=' w-full'>
     <Swiper
        centeredSlides={true}
        slidesPerView={3}
        loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            speed={10000}
            modules={[Autoplay]}
            className="mySwiper"
       >
      {allReviews.length>0 && allReviews.map((item,index)=>(
        <SwiperSlide key={index}>
          <div className='flex flex-col w-fit gap-4 p-2 bg-richblack-800 text-richblack-100'>
            <div className=' flex gap-2 items-center'>
              <img src={item?.user?.image} className=' w-14 aspect-square rounded-full'/>
              <div>
                <div className=' text-white'>{item?.user?.firstname + " " + item?.user?.lastname}</div>
                <div className=' text-xs'>{item?.user?.email}</div>
              </div>
            </div>
            <div className=' text-xs w-[300px]'>{item?.review}</div>
            <Rating count={item?.rating}/>
          </div>
        </SwiperSlide>
      ))}
       </Swiper>
       </div>
    </div>
  )
}
