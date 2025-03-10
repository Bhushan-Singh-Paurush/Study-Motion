import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getInstructorData } from '../../../../services/Operation/profileApi'
import { Spinner } from '../../../Common/Spinner'
import { InstructorChart } from './InstructorChart'
import { IconBtn } from '../../../Common/IconBtn'
import { ThreeCards } from './ThreeCards'

export const Instructor = () => {
    const{token}=useSelector((state)=>state.auth)
    const[courses,setCourses]=useState([])
    const[coursesData,setCoursesData]=useState([])
    const[totalStudent,setTotalStudent]=useState()
    const[totalAmount,setTotalAmount]=useState()
    const[loading,setLoading]=useState(false)
    const[isStudent,setIsStudent]=useState()
    useEffect(()=>{
        ;(async()=>{
            setLoading(true)
            const result = await getInstructorData(token)
            if(result)
            {
                 setCourses(result?.courses)
                 setCoursesData(result?.coursesData)
                 setTotalStudent(result?.coursesData.reduce((acc,cur)=>acc+cur.Students,0))
                 setTotalAmount(result?.coursesData.reduce((acc,cur)=>acc+cur.totalAmount,0))
            }
            setLoading(false)
        })()
    },[])

    return (
    <div className='w-full h-full flex flex-col my-10 items-center gap-10 font-inter'>
    { loading ? <Spinner/> : courses.length===0 ? <div>No Course Till Now</div> :
    
    <div className='w-11/12 md:w-[80%] p-4 flex flex-col gap-5'>
       
       <div className='flex flex-col gap-5 md:gap-0 md:flex-row justify-between'>
       <InstructorChart coursesData={coursesData} isStudent={isStudent}/>
       
       <div className='w-full order-1 md:order-2 md:w-[25%] flex flex-col gap-10'>
         <div className=' w-full bg-richblack-800 p-2 flex gap-2 flex-col rounded-sm border-[1px] border-richblack-700'>
         <div>Statistics</div>
         <div>
         <div className=' text-richblack-100 text-xs'>Total Courses</div>
         <div>{courses?.length}</div>
         </div>
         
         <div>
            <div className=' text-richblack-100 text-xs'>Total Students</div>
            <div>{totalStudent}</div>
         </div>

         <div>
            <div className=' text-richblack-100 text-xs'>Total Income</div>
            <div>{totalAmount}</div>
         </div>
       </div>
       <div className='bg-richblack-800  w-full p-2 flex gap-4 flex-col rounded-sm border-[1px] border-richblack-700'>
        <div>Visulize</div>
        <div className=' flex w-full justify-between'>
        <IconBtn text="Students" outline={true} onclick={()=>setIsStudent(true)}/>
        <IconBtn text="Income" outline={true} onclick={()=>setIsStudent(false)}/>
        </div>
        </div>
       </div>
       </div>

       <ThreeCards courses={courses}/>

       </div>
    }</div>
  )
}
