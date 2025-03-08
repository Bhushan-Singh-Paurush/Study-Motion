import { toast } from "react-toastify";
import { apiConnector } from "../apiconnector";
import { categories } from "../apis";

export async function getCategoryDetails(categoryId) {
    const toastId=toast.loading("Loading...")
    try {
        const response=await apiConnector("POST",categories.CATEGORY_PAGE,{categoryId})

        if(!response.data.success)
        {
            throw new Error("Failed to get Category Page");
        }
        toast.dismiss(toastId)
        toast.success(response.data.message)
        return response.data
    } catch (error) {
        toast.error(error.response.data.message)
    }
    toast.dismiss(toastId)
}