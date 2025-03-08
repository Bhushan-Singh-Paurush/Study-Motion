import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { MdSkipPrevious, MdSkipNext } from "react-icons/md";
import ReactPlayer from "react-player"
import { ImLoop2 } from "react-icons/im";
import { IconBtn } from "../../Common/IconBtn";
import { addIntoCourseProgress } from "../../../services/Operation/courseApi";

export const ViewDetail = () => {
  const { courseId, sectionId, subSectionId } = useParams();
  const [videoData, setVideoData] = useState();
  const [preview, setPreview] = useState();
  const [videoEnded, setVideoEnded] = useState();
  const { courseEntireData, courseSectionData ,completedLectures,viewCourseLoading} = useSelector(
    (state) => state.viewCourse
  );
  const location = useLocation();
  const navigate = useNavigate();
  const playerRef = useRef();
  const{user}=useSelector((state)=>state.profile)
  const dispatch=useDispatch()
  useEffect(() => {
    (() => {
      const SectionIndex = courseSectionData?.findIndex(
        (section) => section._id === sectionId
      );
      const SubSectionIndex = courseSectionData?.[
        SectionIndex
      ]?.subSection?.findIndex((subsection) => subsection._id === subSectionId);
      const SubSectioinVideoData =
        courseSectionData?.[SectionIndex]?.subSection?.[SubSectionIndex];
      setVideoData(SubSectioinVideoData?.videoUrl);
      setPreview(courseEntireData?.thumbnail);
    })();
    setVideoEnded();
  }, [courseSectionData, courseEntireData, location.pathname]);

  function isFirstVideo() {
    const SectionIndex = courseSectionData?.findIndex(
      (section) => section._id === sectionId
    );
    const SubSectionIndex = courseSectionData?.[
      SectionIndex
    ]?.subSection?.findIndex((subsection) => subsection._id === subSectionId);
    if (SectionIndex === 0 && SubSectionIndex === 0) {
      return true;
    } else {
      return false;
    }
  }

  function isLastVideo() {
    const SectionIndex = courseSectionData?.findIndex(
      (section) => section._id === sectionId
    );
    const SubSectionIndex = courseSectionData?.[
      SectionIndex
    ]?.subSection?.findIndex((subsection) => subsection._id === subSectionId);

    const SectionLength = courseSectionData?.length;
    const SubSectionLength =
      courseSectionData?.[SectionIndex]?.subSection?.length;

    if (
      SectionIndex === SectionLength - 1 &&
      SubSectionIndex === SubSectionLength - 1
    )
      return true;
    else return false;
  }

  function previousVideo() {
    const SectionIndex = courseSectionData?.findIndex(
      (section) => section._id === sectionId
    );
    const SubSectionIndex = courseSectionData?.[
      SectionIndex
    ]?.subSection?.findIndex((subsection) => subsection._id === subSectionId);

    if (SubSectionIndex !== 0) {
      const previousSubSection =
        courseSectionData?.[SectionIndex]?.subSection?.[SubSectionIndex - 1]
          ?._id;
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${previousSubSection}`
      );
    }
    if (SubSectionIndex === 0) {
      const SubSectionLength =
        courseSectionData?.[SectionIndex - 1]?.subSection?.length;
      const previousSubSection =
        courseSectionData?.[SectionIndex - 1]?.subSection?.[
          SubSectionLength - 1
        ]?._id;
      const previousSection = courseSectionData?.[SectionIndex - 1]?._id;

      navigate(
        `/view-course/${courseId}/section/${previousSection}/sub-section/${previousSubSection}`
      );
    }
  }

  function nextVideo() {
    const SectionIndex = courseSectionData?.findIndex(
      (section) => section._id === sectionId
    );
    const SubSectionIndex = courseSectionData?.[
      SectionIndex
    ]?.subSection?.findIndex((subsection) => subsection._id === subSectionId);

    const SubSectionLength =
      courseSectionData?.[SectionIndex]?.subSection?.length;

    if (SubSectionIndex !== SubSectionLength - 1) {
      const nextSubSection =
        courseSectionData?.[SectionIndex]?.subSection[SubSectionIndex + 1]?._id;
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSection}`
      );
    }
    if (SubSectionIndex === SubSectionLength - 1) {
      const nextSection = courseSectionData?.[SectionIndex + 1]?._id;
      const nextSubSection =
        courseSectionData?.[SectionIndex + 1]?.subSection?.[0]?._id;
      navigate(
        `/view-course/${courseId}/section/${nextSection}/sub-section/${nextSubSection}`
      );
    }
  }
  function MakeItComplete(){
              dispatch(addIntoCourseProgress({subSectionId,courseId:courseEntireData._id,userId:user._id}))
  }
  
  return (
    <div className=" relative flex justify-center items-center w-full h-full">
      <div className="z-10 relative w-[85%]">
        {!videoData ? (
          <img src={preview} />
        ) : (
          <div>
          <ReactPlayer
            ref={playerRef}
            className=" relative"
            onEnded={() => setVideoEnded(true)}
            url={videoData}
            controls={true}
            loop={false}
          />
            {videoEnded && (
              <div className=" top-0 z-40 left-0 w-full h-full flex justify-center items-center absolute">
                <div className=" flex flex-col gap-5 items-center w-full">
                <div className="flex items-center w-[40%] justify-between">
                  {
                    <button
                      disabled={isFirstVideo()}
                      className={`${
                        isFirstVideo() ? " bg-richblack-200" : "bg-blue-100"
                      } transition-all duration-200 text-white w-[40px] aspect-square flex justify-center items-center  text-4xl rounded-full hover:scale-95`}
                      onClick={previousVideo}
                    >
                      <MdSkipPrevious />
                    </button>
                  }
                  <button
                    className=" text-4xl font-bold"
                    onClick={() => {
                      if (playerRef?.current) playerRef?.current?.getInternalPlayer()?.play();
                      setVideoEnded();
                    }}
                  >
                    <ImLoop2 />
                  </button>
                    <button
                       disabled={isLastVideo()}
                      className={`${
                      isLastVideo() ? " bg-richblack-200" : "bg-blue-100"
                      } transition-all duration-200 text-white w-[40px] aspect-square flex justify-center items-center  text-4xl rounded-full hover:scale-95`}
                      onClick={nextVideo}
                    >
                      <MdSkipNext />
                    </button> 
                </div>
               {!completedLectures.includes(subSectionId) && <IconBtn disabled={viewCourseLoading} onclick={MakeItComplete} text={viewCourseLoading ? "Loading..." : "Make it as Complete"}/> }
                </div>
              </div>
            )}
            </div> )}
      </div>
    </div>
  );
};
