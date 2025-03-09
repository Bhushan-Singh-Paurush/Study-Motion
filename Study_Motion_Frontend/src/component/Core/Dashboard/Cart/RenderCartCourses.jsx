import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GoDotFill } from "react-icons/go";
import { RiDeleteBin6Line } from "react-icons/ri";
import { removefromcart } from '../../../../slices/cart';
import { Rating } from '../../../../pages/Category/Rating';

export const RenderCartCourses = () => {
    const dispatch = useDispatch()
    const{cart}=useSelector((state)=>state.cart)  
    
    return (
    <div className=' w-full'>
         {cart.map((item,index)=>(
            <div key={index} className={`flex flex-wrap md:flex-nowrap gap-5 items-start ${index<cart.length-1 && ' border-b-[1px] border-richblack-400'} ${index==0 ? 'pb-4' : 'py-4'}`}>
              <img className=' w-[100px] aspect-square rounded-md' src={item.thumbnail} alt='cover image'/>
              <div className=' flex flex-col gap-1 md:w-[60%]'>
                <div className=' text-sm'>{item.courseName}</div>
                <div className=' text-xs text-richblack-400'>Name</div>
                <div className=' flex gap-2 items-center text-xs text-yellow-100'>
                   <Rating courseId={item._id}/>
                     </div>
                <div className=' flex items-center flex-wrap gap-1 text-xs text-richblack-400'>{JSON.parse(item.tag).map((item,index)=>(
                    <div key={index} className=' flex items-center'><GoDotFill />{item}</div>
                ))}</div>
              </div>
              <div className=' flex flex-col gap-2'>
                <button onClick={()=>dispatch(removefromcart(item._id))} className=' text-pink-400 border-[1px] border-richblack-600 rounded-md items-center flex gap-2 bg-richblack-700 px-2 py-1'>
 <div><RiDeleteBin6Line /></div>
 <div>Remove</div>
                </button>
                <div className=' text-lg text-yellow-100'>Rs {parseInt(item.price).toLocaleString("en-US")}</div>
              </div>
            </div>
         ))}
         
    </div>
  )
}
