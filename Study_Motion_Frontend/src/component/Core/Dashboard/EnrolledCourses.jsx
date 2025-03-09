import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserEnrolledCourses, removeEnrollCourse } from "../../../services/Operation/profileApi";
import { Spinner } from "../../Common/Spinner";
import { Line } from "rc-progress";
import { TimeDuration } from "../../Common/TimeDuration";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import { ConfirmationModal } from "../../Common/ConfirmationModal";
import { NavLink } from "react-router-dom";

export const EnrolledCourses = () => {
  const [courses, setCourses] = useState(null);
  const { token } = useSelector((state) => state.auth);
  const[showDescription,setShowDescription]=useState([])
  const[settingbar,setSettingbar]=useState([])
  const[confirmationModal,setConfirmationModal]=useState()
  const[loading,setLoading]=useState(false)
  const getallcourses = async () => {
    const res = await getUserEnrolledCourses(token);
    setCourses(res);
  };

  useEffect(() => {
    getallcourses();
  }, []);

function Handler(id)
{
  if(showDescription.includes(id))
  {
    const updatedShowDesp=showDescription.filter((courseId)=>courseId!==id)
    setShowDescription(updatedShowDesp)
  }else{
    setShowDescription(pre=>[...pre,id])
  }
}

const deleteEnrollCourseHandler=async(courseId)=>{
      try {
          setConfirmationModal(null)
          setLoading(true)
          const result = await removeEnrollCourse(courseId,token)
          if(result)
          {
          setCourses(courses.filter(pre=>pre._id!==courseId))
          }
      } catch (error) {
        console.log(error);
      }
      setLoading(false)
}
  if(loading)
  return(
 <div className=" w-full h-full flex justify-center items-center">
  <Spinner/>
 </div>
  );
  return (
    <div className="w-full h-full flex flex-col my-10 gap-5  items-center font-inter">
      <div className="w-[90%] place-content-start font-inter text-xl">
        Enrolled Courses
      </div>
      <div className=" w-[90%] rounded-md flex flex-col">
        {!courses ? (
          <div className=" w-full my-20 flex justify-center">
            <Spinner />
          </div>
        ) : courses.length === 0 ? (
          <div>No data Found</div>
        ) : (
          <div className=" border-[2px] border-richblack-700 rounded-md ">
            <div className=" text-richblack-100 bg-richblack-700 p-2 flex flex-wrap md:flex-nowrap w-full items-center justify-between">
              <div className="pl-2 w-full md:w-[50%]">Course Name</div>
              <div className="md:w-[20%]">Durations</div>
              <div className="md:w-[20%]">Progress</div>
              <div></div>
            </div>
            <div>
              {courses.map((item, index) => (
                <div key={index}
                  className={`flex flex-col md:flex-row gap-2 md:gap-0 w-full items-center p-2  justify-between text-sm text-richblack-50 ${
                    index < item.length ?
                    "border-b-[1px] border-richblack-100" : "border-b-[2px] border-richblack-700" 
                  }`}
                >
                  <div className="w-full md:w-[50%] flex items-start p-2 gap-2 ">
                    <img className=" w-[60px] aspect-square rounded-sm" src={item.thumbnail}/>
                    <div className=" flex flex-col w-full">
                      <NavLink to={`/view-course/${item?._id}/section/${item?.courseContent?.[0]?._id}/sub-section/${item?.courseContent?.[0]?.subSection?.[0]?._id}`}>{item.courseName}</NavLink>
                      <div className=" text-richblack-500 hover:cursor-pointer w-full" onClick={()=>Handler(item._id)}>{showDescription?.includes(item._id) ? item.description : "Show Description"}</div>
                    </div>
                  </div>
                  <div className="p-2 flex w-full md:w-[20%]">
                  <TimeDuration time={item.totalCourseDuration}/>
                  </div>
                  <div className="p-1 w-full md:w-[20%] flex flex-col items-start gap-1">
                    <div>Progress {item.progress}%</div>
                    <Line
                      percent={parseInt(item.progress)}
                      strokeWidth={4}
                      trailWidth={4}
                      trailColor="#2C333F"
                      strokeColor={ item.progress===100 ? "#06D6A0" :"#47A5C5"}
                      strokeLinecap='round'
                  
                    />
                  </div>
                  <div className=" relative w-full md:w-fit">
                  <button onClick={()=>setSettingbar(settingbar.includes(item._id) ? settingbar.filter(pre=>pre!==item._id) : (pre)=>[...pre,item._id])}  className=" text-lg"><BsThreeDotsVertical/></button>
                {settingbar.includes(item._id) &&  <div className=" absolute left-0 md:right-0 flex flex-col gap-2 p-2 bg-richblack-700 rounded-md border-[1px] border-richblack-600">
                    <button onClick={()=>setConfirmationModal({
                      heading:"Permanently remove this course from your list",
                      subheading:"Are you sure you want to delete this course? This action cannot be undone.",
                      btn1text:"Delete Course",
                      btn2text:"Cancle",
                      btn1handelar:()=>deleteEnrollCourseHandler(item._id),
                      btn2handelar:()=>setConfirmationModal(null) 
                    })} className=" text-xs flex items-center gap-2"><RiDeleteBin6Line/>Remover</button>
                  </div> }
                  </div>
                  

                </div>
              ))}
              
            </div>
          </div>
        )}
        
      </div>
      {confirmationModal && <ConfirmationModal data={confirmationModal}/>}
    </div>
  );
};
