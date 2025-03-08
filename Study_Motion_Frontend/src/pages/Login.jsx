import React from 'react'
import { Template} from "../component/Auth/Template"
import loginimage from "../assets/Images/login.webp"
import { useSelector } from 'react-redux'
import { Spinner } from '../component/Common/Spinner'


export const Login = () => {
  const{loading}=useSelector((state)=>state.auth)
  let heading="Welcome Back";
  let disp1="Build skills for today, tomorrow, and beyond.";
  let disp2="Education to future-proof your career.";
  let byt="Sign in";
  let type="login";
  return (
  <Template heading={heading} disp1={disp1} disp2={disp2} byt={byt} image={loginimage} type={type}/>
  )
}
