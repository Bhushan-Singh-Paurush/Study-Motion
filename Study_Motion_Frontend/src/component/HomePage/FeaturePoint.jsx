import React from 'react'

export const FeaturePoint = ({heading ,subheading ,logo}) => {
  return (
    <div className='flex gap-5 font-inter'>
          <div className='FeaturesPointshadow w-[50px] h-[50px] rounded-full flex justify-center items-center'>
          <img src={logo}/>
          </div>
         
          <div>
            <div className=' font-semibold'>{heading}</div>
            <div>{subheading}</div>
          </div>
    </div>
  )
}
