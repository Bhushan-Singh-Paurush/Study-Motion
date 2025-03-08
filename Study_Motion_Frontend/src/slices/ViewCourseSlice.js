import { createSlice } from "@reduxjs/toolkit";
const initialState={
    courseEntireData:[],
    courseSectionData:[],
    totalnoofLecture:0,
    completedLectures:[],
    viewCourseLoading:false
}
const viewCourseSlice=createSlice({
    name:"viewCourse",
    initialState:initialState,
    reducers:{
        setCourseEntireData:(state,action)=>{
            state.courseEntireData=action.payload
        },
        setCourseSectionData:(state,action)=>{
            state.courseSectionData=action.payload
        },
        setTotalnoofLecture:(state,action)=>{
            state.totalnoofLecture=action.payload   
        },
        setCompletedLectures:(state,action)=>{
            state.completedLectures=action.payload
        },
        setUpdateCompleteLectures:(state,action)=>{
          state.completedLectures=[...state.completedLectures,action.payload]
        },
        setViewCourseLoading:(state,action)=>{
              state.viewCourseLoading=action.payload
        }
    }
})
export const{setCourseEntireData,setCourseSectionData,setTotalnoofLecture,setCompletedLectures,setViewCourseLoading,setUpdateCompleteLectures}=viewCourseSlice.actions
export default viewCourseSlice.reducer