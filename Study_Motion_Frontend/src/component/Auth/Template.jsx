import React from "react";
import frame from "../../assets/Images/frame.png";
import { Loginform } from "./Loginform";
import { Signupform } from "./Signupform";
import { FcGoogle } from "react-icons/fc";
import { Spinner } from "../Common/Spinner";
import { useSelector } from "react-redux";

export const Template = ({ heading, disp1, disp2, byt, type, image }) => {
  const { loading } = useSelector((state) => state.auth);
  return loading ? (
    <div className="mx-auto my-40 w-10/12 max-w-[1000px] flex justify-center items-center">
      <Spinner />
    </div>
  ) : (
    <div className="my-20 w-10/12 max-w-[1000px] flex justify-between mx-auto">
      {/* left section */}
      <div className="flex flex-col gap-4 w-[40%]">
        <h1 className=" text-white text-4xl font-semibold">{heading}</h1>
        <div className="flex flex-col">
          <p className="text-richblack-200 text-xl">{disp1}</p>
          <p className=" text-blue-50 text-xl italic">{disp2}</p>
        </div>
        {type === "login" ? <Loginform byt={byt} /> : <Signupform byt={byt} />}
        
        </div>
      {/* right section */}

      <div className="relative">
        <img src={frame} alt="frame" width={400} loading="lazy" />
        <img
          src={image}
          alt="frame"
          loading="lazy"
          className=" absolute -top-5 right-5"
        />
      </div>
    </div>
  );
};
