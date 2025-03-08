import React from 'react'
import { ContactUsForm } from '../Contact/ContactUsForm'

export const ContactFormSection = ({heading ,subheading}) => {
  return (
    <div className='w-10/12 mxa-w-[1000px] my-10 mx-auto flex flex-col items-center gap-5 font-inter'>
        <div className=' text-3xl text-white text-center'>{heading}</div>
        <div className=' text-richblack-100 text-sm text-center'>{subheading}</div>
    <ContactUsForm/>
    </div>
  )
}
