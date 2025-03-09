import React from 'react'
import { HiCursorClick } from "react-icons/hi";
import { FaMobile } from "react-icons/fa";
import { PiCertificateBold } from "react-icons/pi";
import { FaShareFromSquare } from "react-icons/fa6";
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {useDispatch} from "react-redux"
import { addtocart } from '../../slices/cart';
import { ACCOUNT_TYPE } from '../../utils/constants';

export const CourseDetailsCard = ({course,setConfirmationModal,purchaseHandler}) => {
    const{token}=useSelector((state)=>state.auth)
    const{user}=useSelector((state)=>state.profile)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    function Handler(active=false){
             if(!token)
             {
                setConfirmationModal({
                    heading:"You are not logged in !!",
                    subheading:"Please login to Buy this Course",
                    btn1text:"LogIn",
                    btn2text:"Cancel",
                    btn1handelar:()=>{navigate("/login")},
                    btn2handelar:()=>setConfirmationModal(null)
                })
             }
            else if(course.students.includes(user._id))
            {
                navigate("/dashboard/enrolled-courses")
            }else if(active){
                purchaseHandler()
            }else if(user.accountType===ACCOUNT_TYPE.INSTRUCTOR){
                toast.error("Course is only added to Student cart")
            }else{
                dispatch(addtocart(course))
            }

    }

    const copyHandler=async()=>{
        try {
         await navigator.clipboard.writeText(window.location.href)
         toast.success("Link copied")
        } catch (error) {
            toast.error("Failed to copied link")
        }
    }

    return (
    <div className='mt-10 md:mt-0 flex flex-col gap-2 bg-richblack-700 border-[1px] border-richblack-600 rounded-lg'>
    <img className='w-full md:w-[250px] h-[300px] md:h-[200px]  aspect-auto rounded-lg brightness-75' src={course.thumbnail}/>
    <div className=' flex flex-col gap-2 p-4 w-full'>
        <div className=' text-white text-2xl'>Rs. {parseInt(course.price).toLocaleString("en-US")}</div>
        <button className=' w-full rounded-md bg-yellow-100 border-[1px] border-yellow-5 text-sm text-black py-1' onClick={()=>Handler(true)}>Buy Now</button>
        <button className=' w-full rounded-md bg-richblack-800 border-[1px] border-richblack-700 text-sm text-white py-1' onClick={()=>Handler()}>Add to Cart</button>
        <div className=' text-xs text-richblack-50'>30-Day Money-Back Guarantee</div>
        <div className=' text-caribbeangreen-300 text-xs font-semibold flex items-center gap-1'><HiCursorClick/>Full Lifetime access</div>
        <div className=' text-caribbeangreen-300 text-xs font-semibold flex items-center gap-1'><FaMobile/>Access on Mobile and TV</div>
        <div className=' text-caribbeangreen-300 text-xs font-semibold flex items-center gap-1'><PiCertificateBold/>Certificate of completion</div>
        <button onClick={copyHandler} className=' flex gap-2  text-yellow-100 w-full justify-center text-xs'><FaShareFromSquare/>Shear</button>
         
    </div>
    </div>
  )
}
