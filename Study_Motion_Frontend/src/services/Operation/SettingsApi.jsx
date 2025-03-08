import { toast } from "react-toastify"
import { apiConnector } from "../apiconnector"
import { settings } from "../apis"
import { setUser } from "../../slices/profileSlice"
import { logout } from "./authApi"

export function updateDisplayPicture(token,formdata,setUpload){
    return async(dispatch)=>{
        try {
            setUpload("Uploading...")
            const response = await apiConnector("PUT",
                settings.UPDATE_DISPLAY_PICTURE,
                formdata,
               { 
                Authorization:`Bearer ${token}`
               }    
            )

                if(!response.data.success)
                {
                    throw new Error(response.data.message)
                }
        dispatch(setUser(response.data.updatedDetail))
        toast.success(response.data.message)
        
        } catch (error) {
            toast.error(error.response.data.message)
        }
        setUpload("Upload")
    }
}

export function updateProfile(formdata,token,setUpload){
    return async(dispatch)=>{
      try {
        setUpload("Uploading...")
      const response=await apiConnector("PUT",
        settings.UPDATE_PROFILE,
        formdata,
        {
        Authorization:`Bearer ${token}`
        })

        if(!response.data.success)
        {
            throw new Error(response.data.message)
        }
       
        dispatch(setUser(response.data.user))
        toast.success(response.data.message)
      } catch (error) {
        toast.error(error.response.data.message)
      }
      setUpload("Upload")
    }
}

export async function changePassword(form,token,setUpload){
        try {  
          setUpload("Uploading...")
          const response = await apiConnector("POST",
            settings.CHANGE_PASSWORD,
            form,
            {
            Authorization:`Bearer ${token}`
            }   )

          if(!response.data.success)
          {
            throw new Error(response.data.message)
          }

          toast.success(response.data.message)
        } catch (error) {
          toast.error(error.response.data.message)
        }
        setUpload("Upload")
}

export  function deleteProfile(token,navigate){
       return async(dispatch)=>{
        try {
          const response = await apiConnector("DELETE",settings.DELETE_PROFILE,{},{
            Authorization : `Bearer ${token}`
          })

          if(!response.data.success)
          {
            throw new Error(response.data.message)
          }
          toast.success(response.data.message)
          dispatch(logout(navigate))
        } catch (error) {
          toast.error(error.response.data.message)
        }
       }  
}