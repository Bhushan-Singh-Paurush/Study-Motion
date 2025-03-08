import React, { useState } from "react";
import { Table, Thead, Th, Tbody, Tr, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { COURSE_STATUS } from "../../../../utils/constants";
import { TiTick } from "react-icons/ti";
import { BsStopwatchFill } from "react-icons/bs";
import {RiDeleteBin6Line} from "react-icons/ri"
import {useSelector} from "react-redux"
import { ConfirmationModal } from "../../../Common/ConfirmationModal";
import {FaPencil} from "react-icons/fa6"
import {useNavigate} from "react-router-dom"
import { deleteCourse } from "../../../../services/Operation/courseApi";
import { TimeDuration } from "../../../Common/TimeDuration";
export const CourseTable = ({ courses, setCourses }) => {
  const[confirmationModal,setConfirmayionModal]=useState()
  const{token}=useSelector((state)=>state.auth)
  const navigate = useNavigate()
  const deleteHandler=async(courseId)=>{ 
    try {
        const result = await deleteCourse(courseId,token)
        
        if(result)
        {
          const updatedCourseArray=courses.filter((course)=>course._id !== courseId)
          setCourses(updatedCourseArray)
          setConfirmayionModal(null)
        }
       } catch (error) {
        console.log(error);
       }
       setConfirmayionModal(null)
  }
    return (
    <div className=" w-full p-2 border-[1px] border-richblack-700 rounded-md font-inter">
      <Table className=" border-separate border-spacing-4">
        <Thead>
          <Tr className=" text-sm text-richblack-100">
            <Th className=" text-start">COURSES</Th>
            <Th className=" text-start">DURATION</Th>
            <Th className=" text-start">PRICE</Th>
            <Th className=" text-start">ACTIONS</Th>
          </Tr>
        </Thead>
        <Tbody>
          {courses.map((course, index) => (
            <Tr  key={index}>
              <Td className=" flex gap-4 items-start max-w-[450px]">
                <img
                  width={100}
                  src={course.thumbnail}
                  className=" rounded-md"
                />
                <div className=" flex flex-col gap-2">
                  <div className=" text-sm">{course.courseName}</div>
                  <div className=" text-xs text-richblack-100">
                    {course.description}
                  </div>
                  <div className=" text-xs text-richblack-25">
                    {new Date(course.createdAt)
                      .toLocaleString()
                      .replace(",", " ")}
                  </div>
                  <div
                    className={`${
                      course.status === COURSE_STATUS.PUBLISHED
                        ? " text-yellow-100"
                        : " text-pink-400"
                    } px-2 rounded-lg bg-richblack-700 text-xs w-fit flex gap-1 items-center`}
                  >
                    {course.status === COURSE_STATUS.PUBLISHED ? (
                      <TiTick />
                    ) : (
                      <BsStopwatchFill />
                    )}
                    {course.status}
                  </div>
                </div>
              </Td>

              <Td className=" text-xs text-richblack-100">
              <TimeDuration time={course.totalCourseDuration}/>
              </Td>
              <Td className=" text-xs text-richblack-100">{course.price+" Rs"}</Td>
              <Td>
                
    
                <div className=" flex items-center gap-2 text-sm text-richblack-100">
                <button onClick={()=>navigate(`/dashboard/edit-course/${course._id}`)}>
                 <FaPencil/>
                </button>
                <button onClick={()=>setConfirmayionModal({
                    heading:"Delete the Course ?",
                    subheadingL:"All the Lectures are deleted",
                    btn1text:"Delete",
                    btn2text:"Cancle",
                    btn1handelar:()=>deleteHandler(course._id),
                    btn2handelar:()=>setConfirmayionModal(null)
                })}><RiDeleteBin6Line/></button>
                </div>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      {confirmationModal && <ConfirmationModal data={confirmationModal}/>}
    </div>
  );
};
