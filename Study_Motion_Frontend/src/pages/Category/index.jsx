import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiConnector } from '../../services/apiconnector'
import { categories } from '../../services/apis'
import { getCategoryDetails } from '../../services/Operation/categoryApi'
import { CardSlider } from './CardSlider'
import { FourCards } from './FourCards'
import { Footer } from '../../component/Common/Footer'

export const Category = () => {
    const{catName}=useParams()
    const[categoryId,setCategoryId]=useState()
    const[active,setActive]=useState(true)
    const[categoryDetail,setCategoryDetail]=useState()
   useEffect(()=>{
    ;(async()=>{
       const allCategory=await apiConnector("GET",categories.CATEGORIES_API) 
       
       
       if(allCategory)
       {
        const category=allCategory.data.allTags.find((ct)=>ct.name===catName)
        
        if(category)
        setCategoryId(category._id);
       }
    })()
   },[catName])

   useEffect(()=>{
    const getCategory=async()=>{
        const result = await getCategoryDetails(categoryId)
        
        if(result)
            setCategoryDetail(result);
    }
    if(categoryId)
        getCategory();
   },[categoryId])
      
      
    return (
    // section 1
    <>
    <div className=' w-full flex bg-richblack-800 flex-col font-inter'>
    <div className=' mx-auto w-10/12 py-10 flex flex-col gap-1 text-sm text-richblack-100'>
     
        <div>Home / Category / <span className=' text-yellow-100'>{catName}</span></div>
        <div className=' text-white text-xl'>{catName}</div>
        <div>{categoryDetail?.selectedCategory?.description}</div>
      
    </div>
    </div>

    <div className=' mx-auto w-10/12 max-w-[1000px] flex flex-col gap-4 my-10 font-inter'>
       <div className=' text-white text-xl'>Courses to get you started</div>
       <div className=' flex items-center gap-4'>
        <button onClick={()=>setActive(!active)} className={` ${active ? " text-yellow-100 border-b-2 border-yellow-100" : " text-richblack-100"} py-1 text-sm`}>Most popular</button>
        <button onClick={()=>setActive(!active)} className={` ${!active ? " text-yellow-100 border-b-2 border-yellow-100" : " text-richblack-100"} py-1 text-sm`}>New</button>
       </div>
       <CardSlider  data={categoryDetail?.selectedCategory}/>
    </div>
     <div className=' mx-auto w-10/12 flex flex-col gap-4 my-10 font-inter'>
     <div className=' text-xl text-white font-bold'>Other Courses</div>
       <CardSlider data={categoryDetail?.otherCategoy}/>
    </div> 

    <div className=' mx-auto w-10/12 flex flex-col gap-5 my-10  font-inter'>
        <div className=' text-xl text-white font-bold'>Frequently Bought</div>
        <FourCards data={categoryDetail?.topSellingCourse.slice(0,4)}/>
    </div>
    <Footer/>
</>
  )
}
