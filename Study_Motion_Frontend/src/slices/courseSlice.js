import { createSlice } from "@reduxjs/toolkit";

const initialState={
    courseLoading:false,
    step:1,
    isedit:false,
    course:null,
}
const courseSlice=createSlice({
    name:"course",
    initialState:initialState,
    reducers:{
      setcourseLoading:(state,action)=>{
             state.courseLoading=action.payload
      },
      setsteps:(state,action)=>{
        state.step=action.payload
      },
      setcourse:(state,action)=>{
        state.course=action.payload
      },
      setisedit:(state,action)=>{
        state.isedit=action.payload    
      },
      resetCourseState:(state)=>{
           state.step=1,
           state.course=null,
           state.isedit=false
      }
    }
})

export const{setcourse,setcourseLoading,setisedit,setsteps,resetCourseState}=courseSlice.actions
export default courseSlice.reducer