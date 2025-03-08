import { createSlice } from "@reduxjs/toolkit";

const initialState={
    loading:false,
    token:localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
    signupdata:null
}
const authSlice=createSlice({
    name:"auth",
    initialState:initialState,
    reducers:{
        setToken:(state,action)=>{
            state.token=action.payload
        },
        setLoaing:(state,action)=>{
            state.loading=action.payload
        },
        setSignupdata:(state,action)=>{
            state.signupdata=action.payload
        }
    }
})

export const{setToken,setLoaing,setSignupdata}=authSlice.actions
export default authSlice.reducer

