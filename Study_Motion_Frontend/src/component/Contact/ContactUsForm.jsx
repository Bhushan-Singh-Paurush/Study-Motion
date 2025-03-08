import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CountryCode from "../../data/countryCodes.json";
import { sendContactUsMail } from "../../services/Operation/profileApi";
export const ContactUsForm = () => {
  const[loading,setLoading]=useState()
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const submitContactForm=async(data)=>{
    await sendContactUsMail(data,setLoading)
    reset();
  }
  useEffect(()=>{
    setValue("countryCode","+91 India")
  },[])
  return (
    <div>
      <form className=" flex flex-col gap-5" onSubmit={handleSubmit(submitContactForm)}>
        <div className="flex gap-5">
          <label className="flex flex-col">
            <span className=" text-richblack-100 text-sm">First Name</span>
            <input
              className=" bg-richblack-800 py-1 pl-1 rounded-md placeholder:text-sm placeholder:opacity-30 text-richblack-100"
              type="text"
              placeholder="Enter Your First Name"
              {...register("firstname", { required: true })}
            />
            {errors.firstname && <span className=" text-richblack-100 text-sm">Fill this Field</span>}
          </label>
          <label className="flex flex-col">
            <span className=" text-richblack-100 text-sm">Last Name</span>
            <input
            className=" bg-richblack-800 py-1 pl-1 rounded-md placeholder:text-sm placeholder:opacity-30 text-richblack-100"
              type="text"
              placeholder="Enter Your Last Name"
              {...register("lastname", { required: true })}
            />
            {errors.lastname && <span className=" text-richblack-100 text-sm">Fill this Field</span>}
          </label>
        </div>
        <label className="flex flex-col">
          <span className=" text-richblack-100 text-sm">Email</span>
          <input
          className=" bg-richblack-800 py-1 pl-1 rounded-md placeholder:text-sm placeholder:opacity-30 text-richblack-100"
            type="email"
            placeholder="Enter Your email"
            {...register("email", { required: true })}
          />
          {errors.email && <span className=" text-richblack-100 text-sm">Fill this Field</span>}
        </label>
        <label className="flex flex-col">
          <span className=" text-richblack-100 text-sm">Phone No.</span>
          <div className="flex flex-col">
          <div className="w-full flex justify-between">
            <select 
            className="w-[55px] bg-richblack-800 py-1 pl-1 rounded-md placeholder:text-sm placeholder:opacity-30 text-richblack-100"
            name="countryCode"
            {...register("countryCode",{required:true})}
            >
              {CountryCode.map((item, index) => (
                <option  key={index}>
                  {item.code} {item.country}
                </option>
              ))}
            </select>
            {errors.countryCode && <span>Fill this field</span>}
            <input
              className=" bg-richblack-800 py-1 pl-1 rounded-md placeholder:text-sm placeholder:opacity-30 text-richblack-100 w-[80%] pr-1"
              type="number"
              placeholder="1234567890"
              {...register("number", {
                required: { value: true, message: "This Field is Required" },
                maxLength: { value: 12, message: "Invalid Phone Number" },
                minLength: { value: 10, message: "Invalid Phone Number" },
              })}
            />
            </div>
            {errors.number && <span className=" text-richblack-100 text-sm">{errors.number.message}</span>}
            </div>
        </label>
        <label className="flex flex-col">
          <span className=" text-richblack-100 text-sm">Message</span>
          <textarea
          className=" bg-richblack-800 py-1 pl-1 rounded-md placeholder:text-sm placeholder:opacity-30 text-richblack-100"
            placeholder="Enter your message here"
            rows={7}
            cols={30}
            {...register("message", { required: true })}
          />
          {errors.message && <span className=" text-richblack-100 text-sm">Fill this Field</span>}
        </label>
        <button disabled={loading} className="py-1  w-full bg-yellow-100 border-yellow-5 border-b-2 border-r-2 text-lg rounded-lg">
          {loading ? "Loading..." : "Send Message"}
        </button>
      </form>
    </div>
  );
};
