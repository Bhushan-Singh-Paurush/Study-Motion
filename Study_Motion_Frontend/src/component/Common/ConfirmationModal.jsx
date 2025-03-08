import React from 'react'
import { IconBtn } from './IconBtn'

export const ConfirmationModal = ({data}) => {
  return (
    <div className='w-full h-full flex justify-center left-0  absolute bottom-0 bg-richblack-100 bg-opacity-30 backdrop-blur-sm overflow-x-hidden font-inter z-10'>
        <div className='bg-richblack-800 absolute top-36 w-[25%] p-4 flex flex-col gap-4 rounded-md border-[1px] border-richblack-100'>
               <div className=' font-bold text-lg'>{data.heading}</div>
               <p className=' text-xs text-richblack-100'>{data.subheading}</p>
               <div className='flex gap-5'>
                <IconBtn text={data.btn1text} active={true} onclick={data?.btn1handelar}/>
                <IconBtn text={data.btn2text} active={false} onclick={data?.btn2handelar}/>

               </div>
        </div>
    </div>
  )
}
