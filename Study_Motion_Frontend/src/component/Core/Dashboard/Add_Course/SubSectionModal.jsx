import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ImCross } from "react-icons/im";
import { Upload } from "./Upload";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setcourse } from "../../../../slices/courseSlice";
import {
  createSubSection,
  updateSubSection,
} from "../../../../services/Operation/courseApi";
export const SubSectionModal = ({
  modalData,
  setModalData,
  View = false,
  Edit = false,
  Add = false,
}) => {
  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const { course } = useSelector((state) => state.course);
  const dispatch = useDispatch();

  useEffect(() => {
    if (View || Edit) {
      setValue("title", modalData.title);
      setValue("video", modalData.videoUrl);
      setValue("timeDuration", modalData.timeDuration);
      setValue("description", modalData.description);
    }
  }, []);

  function isFormUpdate() {
    const currentValue = getValues();
    if (
      currentValue.title !== modalData.title ||
      currentValue.description !== modalData.description ||
      currentValue.timeDuration !== modalData.timeDuration ||
      currentValue.video !== modalData.videoUrl
    ) {
      return true;
    } else {
      return false;
    }
  }
  const handleEditSubsection = async () => {
    const currentValue = getValues();

    const formdata = new FormData();
    formdata.append("sectionId", modalData.sectionId);
    formdata.append("subSectionId", modalData._id);

    if (currentValue.title !== modalData.title) {
      formdata.append("title", currentValue.title);
    }
    if (currentValue.description !== modalData.description) {
      formdata.append("description", currentValue.description);
    }
    if (currentValue.timeDuration !== modalData.timeDuration) {
      formdata.append("timeDuration", currentValue.timeDuration);
    }
    if (currentValue.video !== modalData.videoUrl) {
      formdata.append("file", currentValue.video);
    }

    setLoading(true);
    const result = await updateSubSection(formdata, token);

    if (result) {
      const updatedCouseContent = course.courseContent?.map((section) =>
        section._id === modalData.sectionId ? result : section
      );

      const updatedCourse = { ...course, courseContent: updatedCouseContent };

      dispatch(setcourse(updatedCourse));
    }
    setLoading(false);
    setModalData(null);
  };
  const submit = async (data) => {
    if (View) {
      return;
    }

    if (Edit) {
      if (isFormUpdate()) {
        handleEditSubsection();
      } else {
        toast.error("No change made to form");
      }
      return;
    }
    const formdata = new FormData();
    formdata.append("sectionId", modalData);
    formdata.append("title", data.title);
    formdata.append("file", data.video);
    formdata.append("description", data.description);
    formdata.append("timeDuration", data.timeDuration);

    setLoading(true);

    const result = await createSubSection(formdata, token);

    if (result) {
      const updatedCouseContent = course.courseContent?.map((section) =>
        section._id === modalData ? result : section
      );
      const updatedCourse = { ...course, courseContent: updatedCouseContent };

      dispatch(setcourse(updatedCourse));
    }

    setLoading(false);
    setModalData(null);
  };
  return (
    <div className=" flex flex-col gap-5 h-full overflow-scroll mx-auto w-10/12 max-w-[400px] bg-richblack-900 overflow-x-hidden">
      <div className="px-2 py-1 bg-richblack-800 w-full flex items-center justify-between text-richblack-100">
        {View ? (
          <div>Viewing Lecture</div>
        ) : Edit ? (
          <div>Editing Lecture</div>
        ) : (
          Add && <div>Add Lecture</div>
        )}
        <button className=" text-xs" onClick={() => setModalData(null)}>
          <ImCross />
        </button>
      </div>
      <form onSubmit={handleSubmit((data) => submit(data))} className="p-4 flex flex-col gap-4">
        <Upload
          register={register}
          errors={errors}
          setValue={setValue}
          name="video"
          placeholder={"Drag and drop an video, or click to Browse a file"}
          label={"Lecture Video"}
          video={true}
          
          viewData={modalData?.videoUrl}
        />
        <label className=" flex flex-col gap-1">
          <div>Lecture Title <sup className="text-pink-500">*</sup></div>
          <input
            type="text"
            disabled={loading || View}
            placeholder="Enter Lecture Title"
            name="title"
            {...register("title", { required: true })}
            className="text-white text-sm w-[100%] py-2 bg-richblack-700  pl-4 border-b-2 border-gray-300 focus:border-2 focus:outline-none rounded-lg"
          />
          {errors.title && <span>Fill this Field</span>}
        </label>

        <label className=" flex flex-col gap-1">
          <div>Video Playback Time in Minutes <sup className="text-pink-500">*</sup></div>
          <input
            type="number"
            disabled={loading || View}
            placeholder="Enter Lecture Title"
            name="timeDuration"
            {...register("timeDuration", { required: true })}
            className="text-white text-sm w-[100%] py-2 bg-richblack-700  pl-4 border-b-2 border-gray-300 focus:border-2 focus:outline-none rounded-lg"
          />
          {errors.title && <span>Fill this Field</span>}
        </label>

        <label className=" flex flex-col gap-1">
          <div>Lecture Description <sup className="text-pink-500">*</sup></div>
          <textarea
            rows={5}
            disabled={loading || View}
            placeholder="Enter Lecture Title"
            name="description"
            {...register("description", { required: true })}
            className="text-white text-sm w-[100%] py-2 bg-richblack-700  pl-4 border-b-2 border-gray-300 focus:border-2 focus:outline-none rounded-lg"
          />
          {errors.title && <span>Fill this Field</span>}
        </label>

        {!View && (
          <button
            className=" w-fit px-2 py-1 bg-yellow-100 rounded-md text-richblack-900 text-sm  border-r-2 border-b-2 border-yellow-25 hover:scale-95 transition-all duration-200"
            type="Submit"
          >
            {loading ? "Loading..." : Edit ? "Save Change" : "Save"}
          </button>
        )}
      </form>
    </div>
    );
};
