import React from 'react'
const Stats = [
    { count: "5K", label: "Active Students" },
    { count: "10+", label: "Mentors" },
    { count: "200+", label: "Courses" },
    { count: "50+", label: "Awards" },
  ];
  
export const StatsComponent = () => {
  return (
    <div className=' w-full py-8 bg-richblack-800 font-inter'>
    <div className=' w-10/12 max-w-[1000px] flex justify-between mx-auto items-center'>
     {Stats.map((item,index)=>(
        <div key={index} className=' flex flex-col items-center gap-2'>
            <div className=' text-white font-semibold'>{item.count}</div>
            <div className='text-richblack-100'>{item.label}</div>
        </div>
     ))}
    </div>
    </div>
  )
}
