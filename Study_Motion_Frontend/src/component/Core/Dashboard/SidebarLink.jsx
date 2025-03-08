import React from 'react'
import { NavLink } from 'react-router-dom'

export const SidebarLink = ({item,Icon}) => {

  return (
    <div className='p-1'>
    <NavLink to={item.path} className="flex items-center gap-2" >
    <div>{<Icon/>}</div>
    <div>{item.name}</div></NavLink>
    </div>
  )
}
