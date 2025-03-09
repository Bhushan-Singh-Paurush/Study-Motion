import React from "react";
import { footerLinks } from "../../data/footerLinks";
import { NavLink } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { AiFillGoogleCircle } from "react-icons/ai";
import { FaTwitter } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io5";
import LogoSmallLight from "../../assets/Logo/Logo-Small-Light.png"

export const Footer = () => {


    return (
        <div className=" w-full bg-richblack-800">

            <div className=" mx-auto py-10 w-10/12 max-w-[1000px] flex flex-col items-center gap-10 font-inter">
                <div className="w-full flex gap-10 md:gap-0 md:justify-between items-start">

                    <div className="flex w-full flex-col md:flex-row md:w-[48%]  justify-between ">

                        {/* first */}
                        <div className=" flex flex-col gap-2">

                            {/* logo image */}
                            <div className=" text-xl flex items-center gap-1 text-white"><img width={35} src={LogoSmallLight}/><div className=' font-semibold font-inter'>StudyMotion</div></div>

                            {/* first */}
                            <div>{Array(footerLinks[0]).map((value, index) => (
                                <div key={index} className=" flex flex-col gap-3 text-md">
                                    <div className=" text-richblack-50">
                                        {value.title}
                                    </div>
                                    <div className=" flex flex-col gap-2 text-richblack-200 text-xs">
                                        {value.links.map((value, index) => (
                                            <NavLink to={`${value.link}`} key={index}>{value.title}</NavLink>
                                        ))}
                                    </div>
                                </div>
                            ))}</div>

                            {/* logo */}
                            <div className=" flex gap-2 text-richblack-200">
                                <FaFacebook /><AiFillGoogleCircle /><FaTwitter /><IoLogoYoutube />
                            </div>

                        </div>

                        {/* second and third */}
                        <div className=" flex flex-col gap-2">

                            {/* second */}
                            <div>{Array(footerLinks[1]).map((value, index) => (
                                <div key={index} className=" flex flex-col gap-3 text-md">
                                    <div className=" text-richblack-50">
                                        {value.title}
                                    </div>
                                    <div className=" flex flex-col gap-2 text-richblack-200 text-xs">
                                        {value.links.map((value, index) => (
                                            <NavLink to={`${value.link}`} key={index}>{value.title}</NavLink>
                                        ))}
                                    </div>
                                </div>
                            ))}</div>

                            {/* third */}
                            <div>{Array(footerLinks[2]).map((value, index) => (
                                <div key={index} className=" flex flex-col gap-3 text-md">
                                    <div className=" text-richblack-50">
                                        {value.title}
                                    </div>
                                    <div className=" flex flex-col gap-2 text-richblack-200 text-xs">
                                        {value.links.map((value, index) => (
                                            <NavLink to={`${value.link}`} key={index}>{value.title}</NavLink>
                                        ))}
                                    </div>
                                </div>
                            ))}</div>

                        </div>

                        {/* forth and fifth*/}
                        <div className=" flex flex-col gap-2">

                            {/* forth */}
                            <div>{Array(footerLinks[3]).map((value, index) => (
                                <div key={index} className=" flex flex-col gap-3 text-md">
                                    <div className=" text-richblack-50">
                                        {value.title}
                                    </div>
                                    <div className=" flex flex-col gap-2 text-richblack-200 text-xs">
                                        {value.links.map((value, index) => (
                                            <NavLink to={`${value.link}`} key={index}>{value.title}</NavLink>
                                        ))}
                                    </div>
                                </div>
                            ))}</div>


                            {/* fifth */}
                            <div>{Array(footerLinks[4]).map((value, index) => (
                                <div key={index} className=" flex flex-col gap-3 text-md">
                                    <div className=" text-richblack-50">
                                        {value.title}
                                    </div>
                                    <div className=" flex flex-col gap-2 text-richblack-200 text-xs">
                                        {value.links.map((value, index) => (
                                            <NavLink to={`${value.link}`} key={index}>{value.title}</NavLink>
                                        ))}
                                    </div>
                                </div>
                            ))}</div>

                        </div>

                    </div>

                    <div className="flex w-full flex-col md:flex-row md:w-[48%]  justify-between ">

                        {/* six */}
                        <div>{Array(footerLinks[5]).map((value, index) => (
                            <div key={index} className=" flex flex-col gap-3 text-md">
                                <div className=" text-richblack-50">
                                    {value.title}
                                </div>
                                <div className=" flex flex-col gap-2 text-richblack-200 text-xs">
                                    {value.links.map((value, index) => (
                                        <NavLink to={`${value.link}`} key={index}>{value.title}</NavLink>
                                    ))}
                                </div>
                            </div>
                        ))}</div>

                        
                        {/* seven */}
                        <div>{Array(footerLinks[6]).map((value, index) => (
                            <div key={index} className=" flex flex-col gap-3 text-md">
                                <div className=" text-richblack-50">
                                    {value.title}
                                </div>
                                <div className=" flex flex-col gap-2 text-richblack-200 text-xs">
                                    {value.links.map((value, index) => (
                                        <NavLink to={`${value.link}`} key={index}>{value.title}</NavLink>
                                    ))}
                                </div>
                            </div>
                        ))}</div>

                        {/* eigth */}
                        <div>{Array(footerLinks[7]).map((value, index) => (
                            <div key={index} className=" flex flex-col gap-3 text-md">
                                <div className=" text-richblack-50">
                                    {value.title}
                                </div>
                                <div className=" flex flex-col gap-2 text-richblack-200 text-xs">
                                    {value.links.map((value, index) => (
                                        <NavLink to={`${value.link}`} key={index}>{value.title}</NavLink>
                                    ))}
                                </div>
                            </div>
                        ))}</div>

                    </div>

                </div>
                <div className=" w-full flex flex-col gap-10 text-xs text-richblack-200">
                    <div className=" w-full h-[1px] bg-richblack-200"></div>
                    <div className=" flex justify-between">
                        <a   href="#herosection">
                        Privacy Policy | Cookie Policy | Terms
                        </a>
                        <a href="#herosection">Made by Bhushan Singh Paurush 🗿 © 2025 Studymotion</a>
                    </div>
                </div>
            </div>

        </div>
    );
};
