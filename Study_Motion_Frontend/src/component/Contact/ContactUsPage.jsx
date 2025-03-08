import React from 'react'
import {contactDetails} from "../../data/ContactUsDetail"
import * as Icon1 from "react-icons/bi"
import * as Icon3 from "react-icons/hi2"
import * as Icon2 from "react-icons/io5"
import { ContactFormSection } from '../About_Page/ContactFormSection'
import { Footer } from '../Common/Footer'


export const ContactUsPage = () => {
  return (
    <>
    <div className='mx-auto my-20 w-10/12 max-w-[1000px] flex gap-10 items-start font-inter'>
        <div className=' flex flex-col gap-5 bg-richblack-700 w-[40%]  p-10 rounded-md'>{contactDetails.map((item,index)=>{
            let Icon=Icon1[item.icon] || Icon2[item.icon] || Icon3[item.icon] 
         
            return (<div key={index}>
                <div className='flex gap-2 items-center text-white text-sm'><Icon/>{item.heading}</div>
                <p className='text-richblack-100 text-xs'>{item.description}</p>
                <p className='text-richblack-100 text-xs'>{item.details}</p>
               </div>)
        })}</div>

        <div className=' border-2 border-richblack-700 rounded-md'>
            
                
            <ContactFormSection 
            heading={"Got a Idea? We’ve got the skills. Let’s team up"}
            subheading={"Tall us more about yourself and what you’re got in mind."}    
            />

        </div>
    </div>
    <Footer/>
    </>
  )
}
