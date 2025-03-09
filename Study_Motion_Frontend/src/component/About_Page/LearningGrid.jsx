import React from "react";
import learningGridData from "../../data/learningGridData";
import { HighlightedText } from "../HomePage/HighlightedText";
import { CTAbutton } from "../HomePage/CTAbutton";

export const LearningGrid = () => {
  return (
    <div className="w-full py-20">
      <div className=" w-10/12 max-w-[1000px] grid mx-auto  grid-cols-2 md:grid-cols-4">
        {learningGridData.map((item, index) => (
          <div
            key={index}
            className={`${item.order === -1 && "col-span-2 bg-richblack-900 mb-10 md:mb-0"} ${
              item.order % 2 == 1 ? " bg-richblack-700" : "bg-richblack-800"
            } ${item.order === 3 && " col-start-2"} flex flex-col gap-2 h-[200px] p-2 items-start justify-center`}
          >
            <div
              className={`${
                item.order === -1 && "text-3xl"
              } text-white`}
            >
              {item.heading}
              {item.highlightText && (
                <HighlightedText>{item.highlightText}</HighlightedText>
              )}
            </div>
            <div className=" text-richblack-100 text-sm mb-5 md:mb-0">{item.description}</div>
          
          {item.BtnText && <CTAbutton active={true} link={item.BtnLink} text={item.BtnText}/>}
          </div>
        ))}
      </div>
    </div>
  );
};
