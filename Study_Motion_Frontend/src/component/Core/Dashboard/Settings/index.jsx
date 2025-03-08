import React from 'react'
import { ChangeProfilePicture } from './ChangeProfilePicture'
import { EditProfile } from './EditProfile'
import { ChangePassword } from './ChangePassword'
import { DeleteAccount } from './DeleteAccount'

export const Settings = () => {
  return (
    <div className='w-full h-full flex flex-col my-10 items-center gap-10'>
        <div className='w-[90%] place-content-start font-inter text-xl'>Edit Profile</div>
        <ChangeProfilePicture />
        <EditProfile/>
        <ChangePassword/>
        <DeleteAccount/>
    </div>
  )
}
