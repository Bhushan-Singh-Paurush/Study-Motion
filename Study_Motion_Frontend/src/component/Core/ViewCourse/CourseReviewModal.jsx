import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ImCross } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import ReactStars from "react-stars";
import { IconBtn } from "../../Common/IconBtn";
import { useParams } from "react-router-dom";
import { createRatingAndReview } from "../../../services/Operation/ratingApi";
export const CourseReviewModal = ({ setCourseModal }) => {
  const {
    register,
    setValue,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch()
  const{token}=useSelector((state)=>state.auth)
  const{courseId}=useParams()
  const{viewCourseLoading}=useSelector((state)=>state.viewCourse)
  useEffect(()=>{
    setValue("rating",0)
  },[])
  function submitHandler(data){
           const rating=data.rating || getValues("rating")
          dispatch(createRatingAndReview({rating,review:data.review,courseId},token,setCourseModal))
        }

  return (
    <div className="w-full h-full flex justify-center items-start absolute top-0 bg-richblack-100 bg-opacity-30 backdrop-blur-sm font-inter z-30">
      <div className="bg-richblack-800 mt-20 w-[30%]  flex flex-col items-center gap-2 rounded-md border-[1px] border-richblack-100">
        <div className=" w-full justify-between items-center text-sm py-2 rounded-t-md  bg-richblack-600 flex text-richblack-100 border-b-[1px] ">
          <div className=" pl-2">Add Review</div>
          <button onClick={() => setCourseModal()} className=" pr-2 text-xs">
            <ImCross />
          </button>
        </div>
        <div className=" flex gap-2 items-center text-richblack-100 text-xs">
          <img src={user?.image} className="w-12 rounded-full" alt="User" />
          <div>
            <div className=" font-bold">
              {user?.firstname + " " + user?.lastname}
            </div>
            <p>Posting Publicly</p>
          </div>
        </div>
        <ReactStars
            count={5}
            rows={4}
            onChange={(value) => setValue("rating", value)}
            size={20}
            color2={"#E7C009"}
            value={getValues("rating")}
          /> 
        <form 
        className="w-full flex flex-col gap-4 py-2 items-center text-richblack-100"
        onSubmit={handleSubmit((data)=>submitHandler(data))}
        >  
          <label className="w-[80%] items-center flex flex-col gap-1 text-sm">
            <div>Add Your Experience</div>
            <textarea
              name="review"
              cols={5}
              rows={3}
              className="text-white text-sm w-full placeholder:text-xs py-2 bg-richblack-700  px-4 border-b-2 border-r-2 border-richblack-100 focus:border-2  focus:outline-none rounded-md"
              placeholder="Share Details of your own experience for this course"
              {...register("review", { required: true })}
            />
            {errors.review && <span>Fill this field</span>}
          </label>
          <div className=" flex w-[80%] gap-2 place-content-end items-center">
            <IconBtn text="Cancle" onclick={() => setCourseModal()} />
            <IconBtn disabled={viewCourseLoading} text={viewCourseLoading  ? "Loading..." : "Save Edits" } type="submit" active={true} />
          </div>
        </form>
      </div>
    </div>
  );
};
