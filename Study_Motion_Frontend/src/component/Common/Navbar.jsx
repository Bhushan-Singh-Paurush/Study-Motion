import React, { useEffect, useState } from 'react'
import { matchPath, NavLink, useLocation, useNavigate } from 'react-router-dom'
import {navbarLinks} from "../../data/navbarLinks"
import { useDispatch, useSelector } from 'react-redux'
import {ACCOUNT_TYPE} from "../../utils/constants"
import { MdOutlineShoppingCart } from "react-icons/md";
import { BsFillTriangleFill } from "react-icons/bs";
import { logout } from '../../services/Operation/authApi'
import { getAllCategories } from '../../services/Operation/courseApi'
import LogoSmallLight from "../../assets/Logo/Logo-Small-Light.png"
export const Navbar = () => {
const location=useLocation()
const{totalItems}=useSelector((state)=>state.cart)
const{token}=useSelector((state)=>state.auth)
const{user}=useSelector((state)=>state.profile) 
const[subLinks,setSubLinks]=useState([])
const[showModal,setShowModal]=useState(false)

const dispatch=useDispatch()
const navigate=useNavigate()
const getCategory =async()=>{
    try {
        const resp = await getAllCategories()
        setSubLinks(resp)
        
    } catch (error) {
        console.log(error);
        
    }
}
function matchRoute(path){
    return matchPath(path,location.pathname)
}

function logoutHandelar(){
    setShowModal(false)
    dispatch(logout(navigate))
}

useEffect(()=>{
    getCategory()
},[])


  return (
    <div className=' w-full border-b-[2px] border-richblack-700 font-inter'>
        <div className='py-2 mx-auto w-10/12 max-w-[1000px] flex justify-between items-center'>
            <NavLink className="flex items-center gap-1" to={"/"}><img src={LogoSmallLight}/><div className=' text-3xl text-white font-semibold font-inter'>StudyMotion</div></NavLink>
            
            <nav>
               <ul className='flex   gap-5'>
                {navbarLinks.map((item,index)=>(
                    <li key={index}>
                        {item.title!=="Catalog" ? (
                            <NavLink to={`${item.path}`}>
                                <p className={`${matchRoute(item.path) ? " text-yellow-100" : " text-richblack-100"}`}>{item.title}</p>
                            </NavLink>
                        ) : (<div className='z-20 hover:cursor-pointer relative group text-richblack-100'>
                        {item.title}
                        
                        <div className='text-black scale-0 transition-all duration-300 group-hover:scale-100 relative z-10'>
                        <div className=' w-6 h-6 left-5 top-2 absolute rotate-45 bg-white'></div>
                        <div className=' absolute bg-white p-4 top-4 rounded-lg w-[250px] flex flex-col gap-2'>{subLinks && subLinks.length!==0 ? subLinks.map((item,index)=>(
                            <NavLink to={`/category/${item.name}`} key={index} className=' hover:bg-richblack-25 rounded-md transition-all duration-200 p-2'>
                                <div >{item.name}</div>
                            </NavLink>
                        )) : <div>Loading...</div>}</div>
                        </div>

                        </div>) }
                    </li>
                ))}
               </ul>
            </nav>

            {/* Login Signup Dashboard */}
            <div>

                 {user &&
                 <div className=' flex gap-5 items-center'>
                 
                 { user.accountType!==ACCOUNT_TYPE.INSTRUCTOR &&
                 <NavLink to={"/dashboard/cart"} className="relative">
                 <div className={`text-xl ${matchRoute("/dashboard/cart") ? "text-yellow-100" : "text-richblack-100"}`}><MdOutlineShoppingCart />
                 
                 {totalItems.length >0 && <span className=' absolute'>{totalItems.length}</span>}
                 </div>
                 </NavLink>}
                 <div className='flex items-center gap-2 relative'>
                 <img className=' w-8 aspect-square rounded-full' src={user.image}/>
                 <div onClick={()=>(setShowModal(!showModal))} className=" text-richblack-100 rotate-180 text-xs cursor-pointer">
                 <BsFillTriangleFill />
                 </div>
                {showModal && <div className=' z-20 bg-richblack-800 p-2 absolute -bottom-[66px] rounded-sm border-[0.5px] border-richblack-700'>
                    <NavLink onClick={()=>setShowModal(false)} to={"/dashboard/my-profile"} className="text-sm text-richblack-100">Dashboard</NavLink>
                    <button onClick={logoutHandelar} className="text-sm text-richblack-100">Logout</button>
                 </div>}
                 </div>
                </div>
                 }

                  {token===null && <div className=' flex gap-5'>
                    <NavLink to={"/login"} className=" text-richblack-100 bg-richblack-800 px-2 rounded-lg py-1">Login</NavLink>
                    <NavLink to={"/signup"} className=" text-richblack-100 bg-richblack-800 px-2 rounded-lg py-1">Sign up</NavLink>
                  </div>}

            </div>
        </div>
    </div>
  )
}
