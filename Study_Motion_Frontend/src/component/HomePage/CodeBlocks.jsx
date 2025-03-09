import React from 'react'
import { NavLink } from 'react-router-dom'
import {TypeAnimation} from "react-type-animation"
import { CTAbutton } from './CTAbutton'

export const CodeBlocks = ({heading,subheading,position,button1,button2,codetext,codecolor}) => {
  return (
    <div className={`${position} gap-10 w-full mx-auto items-start my-20 md:my-40 flex flex-col  md:flex-row`}>
       
        {/* right section */}
        <div className=' flex flex-col gap-5 w-[100%]'>
            <h1 className=' text-3xl text-white font-inter'>{heading}</h1>
            <p className=' text-richblack-100 font-inter'>{subheading}</p>
            <div className='flex w-full gap-10'>
            <CTAbutton text={button1.text} active={button1.active} link={button1.link}/>
            <CTAbutton text={button2.text} active={button2.active} link={button2.link}/>
            </div>
        </div>

        {/* left section */}
        <div className= {`flex gap-2 ${codecolor} w-[100%] p-4 bg-richblack-800 bg-opacity-30`} >
              <div className=' text-white'>
                <div>1</div>
                <div>2</div>
                <div>3</div>
                <div>4</div>
                <div>5</div>
                <div>6</div>
                <div>7</div>
                <div>8</div>
                <div>9</div>
                <div>10</div>
                <div>11</div>
              </div>
              <div>
      <TypeAnimation
          sequence={[codetext, 1000, '']}
          repeat={Infinity}
          cursor={true}
          style={
            {
                whiteSpace:"pre-line",
                display:"block"
            }
          }
          omitDeletionAnimation={true}
      />
              </div>
        </div>
    </div>
  )
}
