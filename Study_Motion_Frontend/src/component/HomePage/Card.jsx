import React from 'react'
import beginner from "../../assets/Images/beginner.svg"
import lessons from "../../assets/Images/lessons.svg"
export const Card = ({item,index}) => {
  return (
    <div className={`flex font-inter gap-2 flex-col p-4 justify-between ${index==0 ? " bg-white cardshadow text-black" : " text-richblack-100  bg-richblack-800"}`}>
        
        <div className={`font-semibold text-sm ${index==0 ? " text-black" : " text-white"}`}>{item.heading}</div>
        <div className='mb-7 text-sm'>{item.description}</div>
        <div className={`pt-2 flex justify-between w-full border-t-2 border-dashed border-richblack-100 ${index==0 ? " text-blue-300" : ""}`}>
            <div className='flex gap-2 '><img className='' src={beginner}/>{item.level}</div>
            <div className='flex gap-2 '><img src={lessons}/>{item.lessionNumber} lessons</div>
        </div>
    </div>
  )
}
