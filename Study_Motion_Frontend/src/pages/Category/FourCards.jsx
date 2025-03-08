import React from 'react'
import { NavLink } from 'react-router-dom';
import { Rating } from './Rating';

export const FourCards = ({data}) => {
    
    return (
    <div className=' grid grid-cols-2 gap-10'>
      {data?.map((course)=>(
        <NavLink key={course._id} to={`/courses/${course._id}`}>
                    <div className=' flex flex-col gap-1 justify-center items-center w-[400px]'>
                        <img className='w-[400px] aspect-square rounded-md' src={course.thumbnail}/>
                        <div className=' text-lg text-white w-full'>{course.courseName}</div>
                        <Rating courseId={course._id}/>
                    </div>
                </NavLink>
      ))}
    </div>
  )
}
