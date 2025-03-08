import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { getPasswordResetToken } from "../services/Operation/authApi";
import { Spinner } from "../component/Common/Spinner";

export const ForgotPassword = () => {
  const [emailSend, setEmailSend] = useState(false);
  const [email, setEmail] = useState("");
  const{loading}=useSelector((state)=>state.auth)
  const dispatch = useDispatch();

  function handelarOnSubmit(event) {
    event.preventDefault()
    dispatch(getPasswordResetToken(email,setEmailSend))
  }
  return (
    <div className="mt-20 flex justify-center items-center font-inter">
      {loading ? <Spinner/> :<div className="mx-auto w-10/12 max-w-[350px]  flex flex-col gap-5 items-start">
        {!emailSend ? (
          <div className=" text-white text-lg">Reset your password</div>
        ) : (
          <div className=" text-white text-lg">Check email</div>
        )}

        {!emailSend ? (
          <p className=" text-richblack-100">
            Have no fear. We’ll email you instructions to reset your password.
            If you dont have access to your email we can try account recovery
          </p>
        ) : (
          <p className=" text-richblack-100">
            We have sent the reset email to {email}
          </p>
        )}

        {!emailSend && (
          <form onSubmit={handelarOnSubmit} className=" flex flex-col gap-5">
            <label className="flex flex-col w-[350px]">
              <span className=" text-richblack-100">
                Email Address <sup className=" text-pink-500 text-lg">*</sup>
              </span>
              <input
                type="email"
                value={email}
                placeholder="Enter the email Address"
                onChange={(event) => setEmail(event.target.value)}
                name="email"
                className="text-white text-sm w-[100%] py-2 bg-richblack-800  pl-4 border-b-2 border-gray-300 focus:border-2 focus:outline-none rounded-lg"
              />
            </label>
            <button className="py-1  w-full bg-yellow-100 border-yellow-5 border-b-2 border-r-2 text-lg rounded-lg">
            Reset Password
          </button>
          </form>
        )}
        {emailSend &&
          <button onClick={handelarOnSubmit} className="py-1  w-full bg-yellow-100 border-yellow-5 border-b-2 border-r-2 text-lg rounded-lg">
            Resend Email
          </button>
        }
        <div >
         <NavLink to={"/login"} className=" text-white text-sm flex gap-4 items-center"><span><FaArrowLeftLong /></span>Back to Login</NavLink>
        </div>
      </div>
       } </div>
  );
};
