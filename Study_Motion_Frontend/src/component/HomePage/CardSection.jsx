import React, { useState } from 'react'
import {homePageExplore} from '../../data/homePageExplore'
import { HighlightedText } from './HighlightedText'
import { Card } from './Card'
export const CardSection = () => {
    const[currenttag,setCurrenttag]=useState(homePageExplore[0].tag)
    const[carddata,setCarddata]=useState(homePageExplore)
    const tags=[
        "Free",
        "New to coding",
        "Most popular",
        "Skills paths",
        "Career paths"

    ]
    function ChangeCard(item)
    {
        setCurrenttag(item)
        setCarddata(homePageExplore.filter((courses)=>courses.tag==item))
        
        
    }

    
  return (
  
   <div className='relative mb-20 w-full'>        
        
        <div className=' text-4xl text-white font-inter text-center'>Unlock the <HighlightedText>Power of Code</HighlightedText> </div>
        
        <div className=' flex my-10 gap-5  bg-richblack-800 px-2 text-lg py-1 rounded-full w-fit mx-auto '>{tags.map((item,index)=>(
            <div key={index} 
            className={`${item == currenttag ? " text-white bg-richblack-900 px-2 rounded-2xl" : " text-richblack-100"} transition-all duration-200 cursor-pointer`}
            onClick={()=>(ChangeCard(item))}>
            {item}
            </div>
        ))}</div>

        <div className='flex absolute gap-10 mx-auto transition-all duration-300'>{carddata[0].courses.map((item,index)=>(
            <Card key={index} index={index} item={item}/>
        ))}</div>
       
        </div>

  
  )
}
