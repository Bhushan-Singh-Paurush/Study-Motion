import React from 'react'
import { useSelector } from 'react-redux'
import { RenderCartCourses } from './RenderCartCourses'
import { RenderTotalAmount } from './RenderTotalAmount'

export const Cart = () => {
  const{totalItems,totalAmount}=useSelector((state)=>state.cart)
  
  return (
    <div className='w-full h-full flex flex-col my-10 gap-4'>
        <div className='w-[90%] mx-auto font-inter text-xl'>Cart</div>
        <div className='mx-auto w-[90%]  border-b-[1px] text-richblack-400 pb-2 border-richblack-400'>{totalItems} Courses in cart</div>
        <div className='w-[90%] mx-auto flex flex-col md:flex-row justify-between items-start'>
        <div className='w-full md:w-[70%]'>
         <RenderCartCourses />
        </div>
         { totalAmount ? <RenderTotalAmount />  : <div></div>}
        </div>
        </div>
  )
}
