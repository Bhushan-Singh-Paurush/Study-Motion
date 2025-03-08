import React from "react";
import { NavLink } from "react-router-dom";

export const CTAbutton = ({ text, link, active, Icon }) => {
  return (
    <NavLink
      to={link}
      className={` font-inter flex gap-2 items-center w-fit text-xl border-b-2 hover:scale-95 transition-all duration-200 border-r-2 px-2 py-1 rounded-md ${
        active
          ? "text-black border-yellow-5 bg-yellow-100"
          : " text-richblack-100 bg-richblack-800"
      }`}
    >
      {text}{" "}{Icon && <Icon/>}
    </NavLink>
  );
};
