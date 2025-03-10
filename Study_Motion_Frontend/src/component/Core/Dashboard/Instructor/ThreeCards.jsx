import React from 'react'
import { NavLink } from 'react-router-dom'

export const ThreeCards = ({courses}) => {
  return (
    <div className=' flex flex-col w-full gap-4 bg-richblack-800 p-4 rounded-sm border-[1px] border-richblack-700'>
    <div className='text-sm flex justify-between'>
        <div>Your Courses</div>
        <NavLink className=" text-yellow-100" to={"/dashboard/my-courses"}>View All</NavLink>
    </div>
    <div className=' w-full flex flex-col md:flex-row gap-4'>{courses.slice(0,3).map((course,index)=>(
        <div className=' flex flex-col gap-2 w-full' key={index}>
            <img className='w-[200px] rounded-sm aspect-square' src={course.thumbnail}/>
            <div className='text-sm'>{course.courseName}</div>
            <div className=' flex gap-2 text-xs text-richblack-100'>
                <div>{course.students?.length} Student</div>
                <div>|</div>
                <div>{course.price} Price</div>
            </div>
        </div>
    ))}</div>
    </div>
  )
}
