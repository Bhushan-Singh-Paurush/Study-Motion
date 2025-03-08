import React from 'react'
import { useSelector } from 'react-redux'
import { Spinner } from '../../Common/Spinner'
import { Sidebar } from './Sidebar'
import { Outlet, useLocation } from 'react-router-dom'
import {Footer} from "../../Common/Footer"

export const Dashboard = () => {
  const{loading:authLoading}=useSelector((state)=>state.auth)
  const{loading:profileLoading}=useSelector((state)=>state.profile)
  
  if(authLoading || profileLoading)
    return(
    <Spinner/>
    )
  return (
    <div className=' relative'>
    <div className='flex min-h-[calc(100vh-3.5rem)] text-white'>
    <Sidebar/>
    <div className='flex-1 min-h-[calc(100vh-3.5rem)]'>
       <Outlet/>
    </div>
    </div>
    <Footer/>
    </div>
  )
}
