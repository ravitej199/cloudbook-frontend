import React from 'react'
import { NavLink } from 'react-router-dom'
function Home() {
  return (
    <div className='flex justify-center items-center flex-col'>
     <p className='font-semibold text-[100px] mt-32  dancing-script-custom'>Welcome to CloudBook</p>

     <div className="buttons flex gap-7">
       <NavLink to="/login"><button className='bg-black text-white px-3 py-2 rounded-md'>Login</button></NavLink> 
       <NavLink to="/register"><button className='bg-black text-white px-3 py-2 rounded-md'>Register</button></NavLink>
     </div>
    </div>
  )
}

export default Home
