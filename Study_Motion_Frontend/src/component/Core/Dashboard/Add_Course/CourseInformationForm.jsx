import React, { useEffect, useState } from 'react'
import {useForm} from "react-hook-form"
import { TbCoinRupee } from "react-icons/tb";
import { addCourseDetails, editCourseDetails, getAllCategories } from '../../../../services/Operation/courseApi';
import { Tags } from './Tags';
import { Upload } from './Upload';
import { useDispatch, useSelector } from 'react-redux';
import { setcourse, setsteps } from '../../../../slices/courseSlice';
import { toast } from 'react-toastify';
import { COURSE_STATUS } from '../../../../utils/constants';


export const CourseInformationForm = () => {
    const[loading,setLoading]=useState(false)
    const[category,setCategory]=useState([])
    const{isedit,course}=useSelector((state)=>state.course)
    const{token}=useSelector((state)=>state.auth)
    const dispatch=useDispatch()
    
    const{
        register,
        handleSubmit,
        setValue,
        getValues,
        formState:{errors}
    
    }=useForm()

    useEffect(()=>{
        async function getCategory() {
            setLoading(true)
            const result=await getAllCategories()
            if(result.length>0)
            {
                setCategory(result)
            }
            setLoading(false)
        }
        if(isedit)
        {
              setValue("courseTitle",course?.courseName)
              setValue("courseDescription",course?.description)
              setValue("Category",course?.category)
              setValue("thumnail",course?.thumbnail)
              setValue("courseBenefits",course?.whatYouWillLearn)
              setValue("Requirements",JSON.parse(course?.instructions))
              setValue("courseTag",JSON.parse(course?.tag))
              setValue("coursePrice",course?.price)
        }
       getCategory()
    },[])

    function isFormUpdated(){
       const currentValues=getValues()
       
       if(currentValues.courseTitle !==course?.courseName
        || currentValues.courseDescription !==course?.description
        || currentValues.Category !==course?.category
        || currentValues.thumnail !==course?.thumbnail
        || currentValues.courseBenefits !==course?.whatYouWillLearn
        || JSON.stringify(currentValues.Requirements) !==course?.instructions
        || JSON.stringify(currentValues.courseTag) !==course?.tag
        || currentValues.coursePrice!==course?.price
       ){
        return true
       }
       else
       return false
    }

    const  onSubmit=async(data)=>{
         
        if(isedit)
         {
            if(isFormUpdated())
            {
                const currentValues=getValues()
                const formData=new FormData()
                formData.append("courseId",course._id)
                if(currentValues.courseTitle !==course?.courseName)
                {
                    formData.append("courseName",currentValues.courseTitle)
                }
                if(currentValues.courseDescription !==course?.description)
                {
                    formData.append("description",currentValues.courseDescription)
                }
                if(currentValues.Category?.name !==course?.category?.name)
                {
                    
                    formData.append("category",currentValues.Category)
                }
                if(currentValues.thumnail !==course?.thumbnail)
                {
                    formData.append("file",currentValues.thumnail)
                }
                if(currentValues.courseBenefits !==course?.whatYouWillLearn)
                {
                    formData.append("whatYouWillLearn",currentValues.courseBenefits)
                }
                if(JSON.stringify(currentValues.Requirements) !==course?.instructions)
                {
                    formData.append("instructions",JSON.stringify(currentValues.Requirements))
                }
                if(JSON.stringify(currentValues.courseTag) !==course?.tag)
                {
                    formData.append("tag",JSON.stringify(currentValues.courseTag))
                }
                if(currentValues.coursePrice!==course?.price)
                {
                    formData.append("price",currentValues.coursePrice)
                }
               
                
                setLoading(true)
                const result =await editCourseDetails(formData,token)
                if(result)
                {
                    dispatch(setsteps(2))
                    dispatch(setcourse(result))
                }
                setLoading(false)
            }else
            toast.error("No change made to this form")
            return 
         }
           const formData=new FormData()
           formData.append("courseName",data.courseTitle)
           formData.append("description",data.courseDescription)
           formData.append("categoryId",data.Category)
           formData.append("file",data.thumnail)
           formData.append("whatYouWillLearn",data.courseBenefits)
           formData.append("instructions",JSON.stringify(data.Requirements))
           formData.append("tag",JSON.stringify(data.courseTag))
           formData.append("price",data.coursePrice)
           formData.append("status",COURSE_STATUS.DRAFT)
            setLoading(true)
            const result = await addCourseDetails(formData,token) 
            setLoading(false)
            if(result)
            {
                dispatch(setcourse(result))
                dispatch(setsteps(2))
            }
            setLoading(false)
      
    }
    function gotoNext(){
        dispatch(setsteps(2))
    } 
    return (
    <div className=' bg-richblack-800 p-8'>
        <form className=' flex flex-col gap-4' onSubmit={handleSubmit(data => onSubmit(data))}>
            <label className=' flex flex-col gap-1'>
                <div>Course Title<sup className="text-pink-500">*</sup></div>
                <input name='courseTitle' 
                type='text' 
                placeholder='Enter Course Title' 
                {...register("courseTitle" ,{required:true})}
                 className="text-white text-sm w-[100%] py-2 bg-richblack-700  pl-4 border-b-2 border-r-2 border-richblack-100 focus:border-2  focus:outline-none rounded-md" 
                />
                {errors.courseTitle && <span>Fill course title</span>}
            </label>

            <label className=' flex flex-col gap-1'>
                <div>Course Short Description<sup className="text-pink-500">*</sup></div>
                <textarea name='courseTitle' 
                rows={5}
                placeholder='Enter Description' 
                {...register("courseDescription" ,{required:true})}
                className="text-white text-sm w-[100%] py-2 bg-richblack-700  pl-4 border-b-2 border-r-2 border-richblack-100 focus:border-2  focus:outline-none rounded-md" 
                />
                {errors.courseDescription && <span>Fill course Description</span>}
            </label>




            <label className=' flex flex-col gap-1 relative'>
                <div>Price<sup className="text-pink-500">*</sup></div>
                <input name='coursePrice' 
                type='text'
                placeholder='Enter Price' 
                {...register("coursePrice" ,{required:true})}
                className="text-white text-sm w-[100%] py-2 bg-richblack-700  pl-8 border-b-2 border-r-2 border-richblack-100 focus:border-2  focus:outline-none rounded-md"   
                />
                <div className=' absolute top-8 text-3xl text-richblack-100'><TbCoinRupee/></div>
                {errors.coursePrice && <span>Fill course Price</span>}
            </label>






           <label className=' flex flex-col gap-1'>
           <div>Category<sup className="text-pink-500">*</sup></div>
           <select
           name="Category"
           defaultValue=""
           {...register("Category",{required:true})}
           className="text-white text-sm w-[100%] py-2 bg-richblack-700  pl-4 border-b-2 border-r-2 border-richblack-100 focus:border-2  focus:outline-none rounded-md"
           >
           <option value="" disabled>Choose a Category</option>
           {!loading && category?.map((item,index)=>(
            <option  key={index} value={item._id}>{item.name}</option>
           ))}
           </select>
           {errors.Category && <span>Fill the Category</span>}
           </label>

           <Tags 
           register={register} 
           errors={errors} 
           label={"Tags"} 
           name={"courseTag"} 
           placeholder={"Add a tag by pressing Enter"}
           setValue={setValue}
           color={true}
           type={"tag"}
           />
           <Upload
           register={register} 
           errors={errors} 
           label={"Course Thumnail"} 
           name={"thumnail"} 
           placeholder={"Drag and drop an image, or click to Browse a file"}
           setValue={setValue}
           editData={course?.thumbnail}
           />
                <label className=' flex flex-col gap-1'>
                <div>Benefits of the course<sup className="text-pink-500">*</sup></div>
                <textarea name='courseBenefits' 
                rows={5}
                placeholder='Enter Benefits of Course' 
                {...register("courseBenefits" ,{required:true})}
                className="text-white text-sm w-[100%] py-2 bg-richblack-700  pl-4 border-b-2 border-r-2 border-richblack-100 focus:border-2  focus:outline-none rounded-md"  
                />
                {errors.courseBenefits && <span>Fill course Benefits</span>}
            </label>

            <Tags 
           register={register} 
           errors={errors} 
           label={"Requirements/Instructions"} 
           name={"Requirements"} 
           placeholder={"Add a Requirements by pressing Enter"}
           setValue={setValue}
           color={false}
           addButton={true}
           type={"Requirements"}
           />
           <div className=' flex items-center gap-2'>
          <button disabled={loading} type='submit' className='w-fit text-black text-sm cursor-pointer  px-4 rounded-md py-1 bg-yellow-100'>{loading ? "Loading..." : isedit ? "Save Changes" : "Next"}</button>
          {isedit && <button disabled={loading} onClick={gotoNext} className='w-fit text-richblack-100 text-sm cursor-pointer  px-4 rounded-md py-1 bg-richblack-400'>Next</button>}
          </div>
        </form>
    </div>
  )
}
