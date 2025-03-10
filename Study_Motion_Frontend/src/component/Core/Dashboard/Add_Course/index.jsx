import React from "react";
import { MdElectricBolt } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import { Stepdata } from "./Stepdata";
const tipsData = [
  "Set the Course Price option or make it free.",
  "Standard size for the course thumbnail is 1024x576.",
  "Video section controls the course overview video.",
  "Course Builder is where you create & organize a course.",
  "Add Topics in the Course Builder section to create lessons, quizzes, and assignments.",
  "Information from the Additional Data section shows up on the course single page.",
  "Make Announcements to notify any important.",
  "Notes to all enrolled students at once.",
];
export const AddCourse = () => {
  return (
    <div className=" w-full h-full md:p-10 relative">
    <div className="w-11/12 md:w-[90%] mx-auto flex flex-col md:flex-row gap-10 items-start">
      <Stepdata/>
      <div className=" p-4 bg-richblack-700 text-white flex flex-col gap-2 font-inter">
      <div className=" flex gap-2 items-center text-lg">
        <MdElectricBolt className=" text-yellow-100" />
        Course Upload Tips
      </div>
      <div>
        {tipsData.map((ClipboardItem, index) => (
          <div className="flex gap-2 text-xs" key={index}>
          <GoDotFill />{ClipboardItem}
          </div>
        ))}
      </div>
      </div>
    </div>
</div>  );
};
