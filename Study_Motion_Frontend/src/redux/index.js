import { combineReducers } from "@reduxjs/toolkit"
import authReducer from "../slices/authSlice"
import Cart from "../slices/cart"
import profileReducer from "../slices/profileSlice"
import courseReducer from "../slices/courseSlice"
import viewCourseReducer from "../slices/ViewCourseSlice"
const rootReducer=combineReducers({
           auth:authReducer,
           cart:Cart,
           profile:profileReducer,
           course:courseReducer,
           viewCourse:viewCourseReducer
})

export default rootReducer