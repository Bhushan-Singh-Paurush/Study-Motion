import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { buyCourse } from '../../../../services/Operation/StudentFeatureApi'
import {useNavigate} from "react-router-dom"

export const RenderTotalAmount = () => {
    const{totalAmount}=useSelector((state)=>state.cart)
    const{cart}=useSelector((state)=>state.cart)
    const[courses,setCourses]=useState([])
    const{user}=useSelector((state)=>state.profile)
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const{token}=useSelector((state)=>state.auth)

    const purchaseHandler=async()=>{
        setCourses([])
        cart.forEach(element => {
            courses.push({courseId:element._id})
        });  
       await buyCourse(user,token,navigate,courses,dispatch)
        
       }
    return (
    
   <div className=' bg-richblack-700 p-4 flex flex-col gap-2 justify-start w-full md:w-[20%] font-inter rounded-md'>
        <div className=' text-richblack-400 text-xs'>Total:</div>
        <div className=' text-yellow-100'>Rs {parseInt(totalAmount).toLocaleString("en-US")}</div>
        <button onClick={purchaseHandler} className=' bg-yellow-100 text-black text-sm rounded-md py-1'>Buy Now</button>
    </div>
    )
}
