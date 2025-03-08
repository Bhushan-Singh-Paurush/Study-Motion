import React from 'react'

export const IconBtn = ({text,active ,onclick,disabled=null,outline=false,children,type}) => {
  return (
    <button type={type}
    disabled={disabled} 
    onClick={onclick} 
    className={`${outline ? " text-yellow-50 border-yellow-50 border-[1px]" :  active ? " bg-yellow-100 text-black" : " bg-richblack-400 text-richblack-100"} text-sm rounded-md py-1 px-2 font-inter w-fit`}>
    {
      children ? <div className=' flex gap-2 items-center'>{text}{" "}{children}</div> : <div>{text}</div>
    }
    </button>
  )
}
