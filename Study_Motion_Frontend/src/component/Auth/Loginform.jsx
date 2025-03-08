import React, { useState } from "react";
import { FaEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { login } from "../../services/Operation/authApi";


export const Loginform = ({ byt }) => {
  const [showpass, setShowpass] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const dispatch=useDispatch()
  const navigate=useNavigate()

  function changehandelar(event) {
    setForm((pre) => ({
      ...pre,
      [event.target.name]: event.target.value,
    }));
  }
  function handelar(event) {
    event.preventDefault();
    dispatch(login(form.email,form.password,navigate))
  }
  return (
    <div>
      <form className="flex flex-col gap-5" onSubmit={handelar}>
        <label>
          <p className=" text-white text-md ">
            Email Address <sup className="text-pink-500 text-lg">*</sup>
          </p>
          <input
            className="text-white text-sm w-[100%] py-2 bg-richblack-800  pl-4 border-b-2 border-gray-300 focus:border-2 focus:outline-none rounded-lg"
            onChange={changehandelar}
            name="email"
            value={form.email}
            type="text"
            required
            placeholder="Enter the email Address"
          />
        </label>
        <label className=" relative">
          <p className=" text-white text-md ">
            password <sup className="text-pink-500 text-lg">*</sup>
          </p>

          <input
            className="text-white text-sm w-[100%] py-2 bg-richblack-800  pl-4 border-b-2 border-gray-300 focus:border-2 focus:outline-none rounded-lg"
            onChange={changehandelar}
            name="password"
            value={form.password}
            type={showpass ? "text" : "password"}
            required
            placeholder="Enter the email Address"
          />
          <span
            className="absolute text-xl bottom-8 right-4 text-richblack-100"
            onClick={() => {
              setShowpass(!showpass);
            }}
          >
            {showpass ? <FaEyeSlash /> : <FaEye />}
          </span>
          <p className="text-end text-blue-50">
            <NavLink to={"/forgotpassword"}>Forget password</NavLink>
          </p>
        </label>
        <button className="py-1  w-full bg-yellow-100 border-yellow-5 border-b-2 border-r-2 text-lg rounded-lg">
          {byt}
        </button>
      </form>
    </div>
  );
};
