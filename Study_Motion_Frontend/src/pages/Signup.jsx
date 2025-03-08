import React from 'react'
import { Template} from "../component/Auth/Template"
import signup from "../assets/Images/signup.webp"
export const Signup = () => {

    let heading="Join the millions learning to code with StudyMotion for free";
    let disp1="Build skills for today, tomorrow, and beyond.";
    let disp2="Education to future-proof your career.";
    let byt="Creat Account";
    let type="signup"
    return (
   <Template heading={heading} disp1={disp1} disp2={disp2} byt={byt} image={signup} type={type}/>
    )
  
}

