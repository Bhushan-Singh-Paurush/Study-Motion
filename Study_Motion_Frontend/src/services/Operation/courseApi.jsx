import { toast } from "react-toastify";
import { apiConnector } from "../apiconnector";
import { categories, course, section, subsection } from "../apis";
import { setUpdateCompleteLectures, setViewCourseLoading } from "../../slices/ViewCourseSlice";

export const getAllCategories = async () => {
  try {
    const response = await apiConnector("GET", categories.CATEGORIES_API);

    if (!response?.data?.success) {
      throw new Error("Failed to get all categories");
    }

    return response.data.allTags;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
export async function addCourseDetails(formdata, token) {
  const toastid = toast.loading("Loading...");
  try {
    const response = await apiConnector(
      "POST",
      course.CREATE_COURSE,
      formdata,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    if (!response?.data?.success) {
      throw new Error("Failed to add course");
    }
    toast.dismiss(toastid);
    toast.success(response.data.message);

    return response.data.newCourse;
  } catch (error) {
    toast.error(error.response.data.message);
    console.log(error);
  }
  toast.dismiss(toastid)
}
export async function createSection(data, token) {
 
  
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector(
      "POST",
      section.CREATE_SECTION,
      { sectionName: data.sectionName, courseId: data.courseId },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    if (!response?.data?.success) {
      throw new Error("Failed to create course");
    }

    toast.dismiss(toastId);
    toast.success(response.data.message);
    return response.data.updatedCourse;
  } catch (error) {
    toast.error(error.response.data.message);
  }
  toast.dismiss(toastId);
}

export async function updateSection(data, token) {
  const toastId = toast.loading("Loading...");

  try {
    const response = await apiConnector(
      "POST",
      section.UPDATE_SECTION,
      {
        sectionName: data.sectionName,
        courseId: data.courseId,
        sectionId: data.sectionId,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!response?.data?.success) {
      throw new error("Failed to update the section");
    }

    toast.dismiss(toastId);
    toast.success(response.data.message);
    return response.data.course;
  } catch (error) {
    toast.error(error.response.data.message);
  }
  toast.dismiss(toastId);
}

export async function deleteSection(sectionId, courseId, token) {
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector(
      "POST",
      `${section.DELETE_SECTION}/${sectionId}/${courseId}`,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!response.data.success) {
      throw new Error("Failed to delete Section");
    }

    toast.dismiss(toastId);
    toast.success(response.data.message);

    return response.data.course;
  } catch (error) {
    toast.error(error.response.data.message);
  }
  toast.dismiss(toastId);
}

export async function createSubSection(formdata, token) {
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector(
      "POST",
      subsection.CREATE_SUBSECTION,
      formdata,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!response.data.success) {
      throw new Error("Filed to create sub-section");
    }

    toast.dismiss(toastId);
    toast.success(response.data.message);

    return response.data.updatedSection;
  } catch (error) {
    toast.error(error.response.data.message);
  }
  toast.dismiss(toastId);
}

export async function updateSubSection(formdata, token) {
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector(
      "POST",
      subsection.UPDATE_SUBSECTION,
      formdata,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    if (!response.data.success) {
      throw new Error("Failed to Update Sub-Section");
    }

    toast.success(response.data.message);
    toast.dismiss(toastId);

    return response.data.section;
  } catch (error) {
    toast.error(error.response.data.message);
  }
  toast.dismiss(toastId);
}

export async function deleteSubSection(subSectionId, sectionId) {
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector(
      "POST", 
      subsection.DELETE_SUB_SECTION,
     {subSectionId, sectionId}
    );

    if(!response.data.success)
    {
      throw new Error("Failed to delete the sub-section");
      
    }

    toast.dismiss(toastId)
    toast.success(response.data.message)
    return response.data.updatedSection
  } catch (error) {
      toast.error(error.response.data.message)
  }
  toast.dismiss(toastId)
}

export async function editCourseDetails(fromdata,token) {
  const toastId=toast.loading("Loading...")
  try {
    const response = await apiConnector("POST",
      course.UPDATE_COURSE,
      fromdata,
    {
      Authorization : `Bearer ${token}`
    }
    )
    if(!response.data.success)
    {
      throw new Error("Failed to update the Course")
    }

    toast.success(response.data.message)
    toast.dismiss(toastId)

    return response.data.updatedCourse

  } catch (error) {
    toast.error(error.response.data.message)
  }
  toast.dismiss(toastId)
}

export async function getFullDetailsOfCourse(courseId) {

  
  const toastId=toast.loading("Loading...")
  try {
    const response = await apiConnector("POST",
      course.GET_COURSE_DETAIL,
      courseId,
    )
    
    if(!response.data.success)
    {
      throw new Error("Failed to get course details");
    }

    toast.dismiss(toastId)
    toast.success(response.data.message)

    
    
    return response.data.courseDetail
    
  } catch (error) {
    toast.error(error.response.data.message)
  }
  toast.dismiss(toastId)
}
export async function getFullDetailsOfUserCourse(courseId,token) {

  
  const toastId=toast.loading("Loading...")
  try {
    const response = await apiConnector("POST",
      course.GET_USER_COURSE_DETAIL,
      courseId,
    {
      Authorization : `Bearer ${token}`
    }
    )
    
    if(!response.data.success)
    {
      throw new Error("Failed to get course details");
    }

    toast.dismiss(toastId)
    toast.success(response.data.message)

    
    
    return {
      courseDetail:response.data.courseDetail,
      completedVideos:response.data.completedVideos
    }
  } catch (error) {
    toast.error(error.response.data.message)
  }
  toast.dismiss(toastId)
}

export async function deleteCourse(courseId,token) {
      
  const toastId=toast.loading("Loading...")
      try {
        const response = await apiConnector("DELETE",
          course.DELETE_COURSE,
          {courseId},
        {
          Authorization : `Bearer ${token}`
        }
        )

        if(!response.data.success)
        {
          throw new Error("Failed to delete course");
        }

        toast.dismiss(toastId)
        toast.success(response.data.message)

        return response.data.success

      } catch (error) {
        toast.error(error.response.data.message)
      }
      toast.dismiss(toastId)
}

export function addIntoCourseProgress(data) {
  return async(dispatch)=>{
    const toastId=toast.loading("Loading...")
    try {
      dispatch(setViewCourseLoading(true))
        const response =await apiConnector("POST",course.COURSE_PROGRESS,data)
        
        dispatch(setUpdateCompleteLectures(data.subSectionId))
        dispatch(setViewCourseLoading(false))
        toast.dismiss(toastId)
        toast.success(response.data.message)
    } catch (error) {
      toast.dismiss(toastId)
      toast.error(error.response.data.message)
      
    }
  }
}