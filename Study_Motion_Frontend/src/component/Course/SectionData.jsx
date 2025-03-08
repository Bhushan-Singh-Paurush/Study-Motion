import { IoMdArrowDropdown } from "react-icons/io";
import { MdOutlineScreenShare } from "react-icons/md";
import { TimeDuration } from "../Common/TimeDuration";
export const SectionData = ({section,isExpand}) => {
  
    return (
    <div className='w-full border-[1px] border-richblack-700 font-inter'>
       {section.map((element,index)=>{
        const totalLectureDuration =element.subSection.reduce((acc,cr)=>acc+parseInt(cr.timeDuration),0)
       return (<details open={isExpand} key={index}>
            <summary className=' w-full flex justify-between p-2 bg-richblack-700 text-xs'>
                <div className=' flex items-center gap-2'>
                <div className='text-xl'><IoMdArrowDropdown/></div>
                <div>{element.sectionName}</div>
                </div>
                
                <div className=' flex items-center gap-2'>
                    <div className=' text-yellow-100'>{element.subSection?.length} lectures</div>
                    <div><TimeDuration time={totalLectureDuration}/></div>
                </div>
            </summary>
           <div className=" p-4 flex flex-col gap-2">{element.subSection.map((item,index)=>(
            <details key={index}>
             <summary className='flex w-full justify-between items-center text-sm'>
                <div className=" flex items-center gap-2 text-white">
                <MdOutlineScreenShare className=" text-lg"/>
                  <div>{item.title}</div>
                  <div className='text-xl'><IoMdArrowDropdown/></div>
                </div>
                <div><TimeDuration time={item.timeDuration}/></div>
             </summary>
             <p className=" text-xs">{item.description}</p>
            </details>
           ))}</div>
        </details>) 
       })}
    </div>
  )
}
