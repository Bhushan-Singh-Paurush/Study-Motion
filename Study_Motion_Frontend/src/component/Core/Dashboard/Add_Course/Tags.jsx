import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { VscError } from "react-icons/vsc";
export const Tags = ({register, 
    errors,
    label, 
    name, 
    placeholder,
    setValue,
    type,
    color,
    addButton
    }) => {
    
     
    const[chips,setChips]=useState([])
    const{isedit,course}=useSelector((state)=>state.course)
    const[tag,setTag]=useState('')
    
    useEffect(()=>{
        if(isedit)
        {

        type === "tag" ? setChips(JSON.parse(course?.tag)) 
        : type==="Requirements" && setChips(JSON.parse(course?.instructions))
        }
        register(name,{required:true , validate:(value)=>value.length>0})
    },[]) 
    useEffect(()=>{
        setValue(name,chips)
    },[chips]) 
    function addTags(event)
    {
        if(event.key==="Enter")
        {
            if(event && !chips.includes(event.target.value))
            {
                setChips([...chips,event.target.value])
                setTag('')
            }
            
        }
        
    } 
    function addTagByButton()
    {
        
        if(tag && !chips.includes(tag))
            {
               
                
                setChips([...chips,tag])
                setTag('')
            } 
            
    } 
    function deleteTag(index)
    {
        const newchip=[...chips]
        newchip.splice(index,1)        
        setChips(newchip)
        
        
    }
    return (
    <div>
        <label className=' gap-1 flex flex-col'>
        <div>{label}<sup className="text-pink-500">*</sup></div>
        
       <div className='flex flex-wrap gap-2'> {chips?.map((item,index)=>(
            <div className={` ${color ? 'bg-yellow-600 my-4 text-yellow-50' : ' text-white'} px-2 py-1 rounded-lg flex items-center gap-1`} key={index}>
            <div>{item}</div>
            <div onClick={()=>deleteTag(index)}><VscError /></div>
            </div>
        ))}</div>
        <input 
        onKeyDown={addTags}
        type='text' 
        placeholder={placeholder} 
         className="text-white text-sm w-[100%] py-2 bg-richblack-700  pl-4 border-b-2 border-r-2 border-richblack-100 focus:border-2  focus:outline-none rounded-md"
        onChange={(event)=>setTag(event.target.value)} 
        value={tag}     
        />
        {addButton && <div onClick={addTagByButton} className='w-fit my-1 text-black text-sm cursor-pointer  px-4 rounded-md py-1 bg-yellow-100'>Add</div>}
        {errors.name && <span>Add some tags</span>}
        </label>
    </div>
  )
}
