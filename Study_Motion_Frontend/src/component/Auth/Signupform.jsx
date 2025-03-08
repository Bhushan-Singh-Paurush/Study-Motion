import React, { useState } from "react";
import { toast } from "react-toastify";
import { FaEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa6";
import {ACCOUNT_TYPE} from "../../utils/constants"
import { useDispatch } from "react-redux";
import { setSignupdata } from "../../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { sendOtp } from "../../services/Operation/authApi";

export const Signupform = ({ byt }) => {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const[accountType,setAccountType]=useState(ACCOUNT_TYPE.STUDENT)
  const [showpass1, setShowpass1] = useState(false);
  const [showpass2, setShowpass2] = useState(false);
  const dispatch=useDispatch()
  const navigate=useNavigate()
  
  
  function changehandelar(event) {
    const{name,value}=event.target
    setForm((pre) => ({ ...pre, [name]:value }));
  }

  function handelar(event) {
    event.preventDefault();
    if(form.password !== form.confirmpassword)
    {
      toast.error("Password Mismatched")
      return 
    }
    const signupdata={...form,accountType}
    dispatch(setSignupdata(signupdata))

    dispatch(sendOtp(form.email , navigate))
   
  }




  return (
    <form onSubmit={handelar} className="flex flex-col gap-5">
      <div className=" flex py-1 px-2 bg-richblack-800 gap-6 rounded-3xl w-fit">
        <button
          type="button"
          onClick={() => {
            setAccountType(ACCOUNT_TYPE.STUDENT)
          }}
          className={`${
            accountType===ACCOUNT_TYPE.STUDENT
              ? " text-white bg-richblack-900 rounded-full"
              : " text-richblack-100"
          } px-2 py-1 transition-all duration-300`}
        >
          {ACCOUNT_TYPE.STUDENT}
        </button>
        <button
          type="button"
          onClick={() => {
            setAccountType(ACCOUNT_TYPE.INSTRUCTOR)
          }}
          className={`${
            accountType===ACCOUNT_TYPE.INSTRUCTOR
               ? " text-white bg-richblack-900 rounded-full"
              : " text-richblack-100"
          } px-2 py-1 transition-all duration-300`}
        >
       {ACCOUNT_TYPE.INSTRUCTOR}
        </button>
      </div>
      <div className="flex gap-5">
        <label>
          <p className=" text-white text-sm">
            First Name <sup className="text-lg text-pink-500">*</sup>
          </p>
          <input
            className="text-white text-sm w-[100%] py-2 bg-richblack-800  pl-4 border-b-2 border-r-2 border-richblack-100 focus:border-2  focus:outline-none rounded-md"
            onChange={changehandelar}
            name="firstname"
            value={form.firstname}
            type="text"
            required
            placeholder="Enter the first name"
          />
        </label>
        <label>
          <p className=" text-white text-sm ">
            Last Name <sup className="text-lg text-pink-500">*</sup>
          </p>
          <input
            className="text-white text-sm  w-[100%] py-2 bg-richblack-800  pl-4 border-b-2 border-r-2 border-richblack-100 focus:border-2 focus:outline-none rounded-lg"
            onChange={changehandelar}
            name="lastname"
            value={form.lastname}
            type="text"
            required
            placeholder="Enter the last name"
          />
        </label>
      </div>
      <label>
        <p className=" text-white text-sm ">
          Email Address <sup className="text-lg text-pink-500">*</sup>
        </p>
        <input
          className="text-white text-sm w-[100%] py-2 bg-richblack-800  pl-4 border-b-2 border-r-2 border-richblack-100 focus:border-2 focus:outline-none rounded-lg"
          onChange={changehandelar}
          name="email"
          value={form.email}
          type="text"
          required
          placeholder="Enter the email Address"
        />
      </label>

      <div className="flex gap-5">
        <label className=" relative">
          <p className=" text-white text-sm ">
            Creat Password <sup className="text-lg text-pink-500">*</sup>
          </p>
          <input
            className="text-white text-sm w-[100%] py-2 bg-richblack-800  pl-4 border-b-2 border-r-2 border-richblack-100 focus:border-2 focus:outline-none rounded-lg"
            onChange={changehandelar}
            name="password"
            value={form.password}
            type={showpass1 ? "text" : "password"}
            required
            placeholder="Enter Password"
          />
          <span
            className="absolute text-xl bottom-2 right-2 text-richblack-100"
            onClick={() => {
              setShowpass1(!showpass1);
            }}
          >
            {showpass1 ? <FaEyeSlash /> : <FaEye />}
          </span>
        </label>
        <label className=" relative">
          <p className=" text-white text-sm ">
            Confirm Password <sup className="text-lg text-pink-500">*</sup>
          </p>
          <input
            className="text-white text-sm w-[100%] py-2 bg-richblack-800  pl-4 border-b-2 border-r-2 border-richblack-100 focus:border-2 focus:outline-none rounded-lg"
            onChange={changehandelar}
            name="confirmpassword"
            value={form.confirmpassword}
            type={showpass2 ? "text" : "password"}
            required
            placeholder="Confirm Password"
          />
          <span
            className="absolute text-xl bottom-2 right-2 text-richblack-100"
            onClick={() => {
              setShowpass2(!showpass2);
            }}
          >
            {showpass2 ? <FaEyeSlash /> : <FaEye />}
          </span>
        </label>
      </div>
      <button
        type="submit"
        className="py-1 w-full bg-yellow-100 border-b-2 border-r-2 border-yellow-5 text-lg rounded-lg"
      >
        {byt}
      </button>
    </form>
  );
};
