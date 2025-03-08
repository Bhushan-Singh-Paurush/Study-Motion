import { toast } from "react-toastify"
import { apiConnector } from "../apiconnector"
import { profile } from "../apis"

export async function getUserEnrolledCourses(token) {
    const toastID=toast.loading("loading...")
    try {
        const response=await apiConnector("GET",profile.GET_ENROLLED_COURSES,null,
            {
                   Authorization:`Bearer ${token}`   
            }
        )

        if(!response.data.success)
        {
             throw new Error(response.data.message)
        }
      
        toast.dismiss(toastID)
        return response.data.user.courses

    } catch (error) {
        toast.error(error.response.data.message)
    }
    toast.dismiss(toastID)
}

export async function removeEnrollCourse(courseId,token) {
    const toastId=toast.loading("Loading...")      
    try {
            const response =  await apiConnector("POST",
                profile.REMOVE_ENROLLED_COURSES,
                {courseId},
            {
                Authorization :`Bearer ${token}`
            }
            )

            if(!response.data.success)
            {
                throw new Error("Failed to remove the course");
            }
            toast.dismiss(toastId)
            toast.success(response.data.message)
            return response.data.success
          
        } catch (error) {
            toast.dismiss(toastId)
            toast.error(error.response.data.message)
          }
}
export async function getInstructorData(token) {
    try {
        const response=await apiConnector("GET",profile.INSTRUCTOR_DATA,null,{
            Authorization : `Bearer ${token}`
        })

        if(!response)
        {
            throw new Error("Failed to get Instructor data");
        }     
        return {
            courses:response.data.courses,
            coursesData:response.data.coursesData
        }
    } catch (error) {
        toast.error(error.response.data.message)
    }
    
}
export async function sendContactUsMail(data,setLoading) {
    
    try {
        setLoading(true)
        const response=await apiConnector("POST",profile.CONTACT_US,data)

        if(!response.data.success)
        {
            throw new Error("Failed to send Contact mail");
        }

        toast.success(response.data.message)
        setLoading(false)
    } catch (error) {
        toast.error(error.response.data.message)
        console.log(error);
        
    }
    setLoading(false)
}
