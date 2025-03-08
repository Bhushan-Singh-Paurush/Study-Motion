import { toast } from "react-toastify"
import { setViewCourseLoading } from "../../slices/ViewCourseSlice"
import { apiConnector } from "../apiconnector"
import { rating } from "../apis"

export function createRatingAndReview(data,token,setCourseModal){
    
    return async(dispatch)=>{
        try {
            dispatch(setViewCourseLoading(true))
            
            const response = await apiConnector("POST",
                                            rating.CREATE_RATING_AND_REVIEW,
                                            data,
                                            {
                                                Authorization : `Bearer ${token}`
                                            })
        if(!response.data.success)
            {
                throw new Error("Failed to create the Rating and Review");
            }
        toast.success(response.data.message)
        dispatch(setViewCourseLoading(false))
        setCourseModal()
        } catch (error) {
            toast.error(error.response.data.message)
            console.log(error);
            
        }

        dispatch(setViewCourseLoading(false))                                        
    }
}
