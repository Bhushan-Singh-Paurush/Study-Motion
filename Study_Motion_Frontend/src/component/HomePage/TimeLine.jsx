import React from 'react'
import logo1 from "../../assets/TimeLineLogo/Logo1.svg"
import logo2 from "../../assets/TimeLineLogo/Logo2.svg"
import logo3 from "../../assets/TimeLineLogo/Logo3.svg"
import logo4 from "../../assets/TimeLineLogo/Logo4.svg"
import line from "../../assets/TimeLineLogo/line.svg"
import { FeaturePoint } from './FeaturePoint'
import TimelineImage from "../../assets/Images/TimelineImage.png"
export const TimeLine = () => {
  return (
    <div className='w-11/12 max-w-[1000px] my-5 md:my-20 flex flex-col gap-10 md:gap-0 md:flex-row justify-between md:items-center'>
      {/* left section */}
      <div>
        <FeaturePoint 
        heading={"Leadership"} 
        subheading={"Fully committed to the success company"}
        logo={logo1}  
        />
        <img className=' pl-[25px]' src={line}/>
        <FeaturePoint 
        heading={"Responsibility"} 
        subheading={"Students will always be our top priority"}
        logo={logo2}  
        />
         <img className=' pl-[25px]' src={line}/>
         <FeaturePoint 
        heading={"Flexibility"} 
        subheading={"The ability to switch is an important skills"}
        logo={logo3}  
        />
         <img className=' pl-[25px]' src={line}/>
         <FeaturePoint 
        heading={"Solve the problem"} 
        subheading={"Code your way to a solution"}
        logo={logo4} 
         />
      </div>

      {/* right section */}
      <div className='w-full md:w-[50%] shadow-2xl relative font-inter'>
        <img  src={TimelineImage}/>
        <div className=' text-richblack-25 text-3xl gap-5 p-4 flex absolute -bottom-9 md:right-12 w-full md:w-[80%] aspect-auto bg-caribbeangreen-800'>
               <div className=' flex gap-2 items-center'>
                <div>10</div>
                <div className=' text-richblack-100 text-xs'>YEARS EXPERIENCES</div>
               </div>
               <img src={line}/>
               <div className=' flex gap-2 items-center'>
                <div>250</div>
                <div className=' text-richblack-100 text-xs'>TYPES OF COURSES</div>
               </div>

        </div>
      </div>
    </div>
  );
}
