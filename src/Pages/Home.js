import React from 'react'
import { NavLink } from 'react-router-dom'
function Home() {
  return (
    <div className='flex justify-center items-center min-h-screen flex-col px-4'>
    <p className='font-semibold text-5xl sm:text-7xl md:text-8xl lg:text-[100px] mt-16 sm:mt-24 lg:mt-32 dancing-script-custom text-center'>
      Welcome to CloudBook
    </p>

    <div className="buttons flex flex-col sm:flex-row gap-4 sm:gap-7 mt-8">
      <NavLink to="/login">
        <button className='bg-black text-white px-4 py-2 rounded-md w-full sm:w-auto'>
          Login
        </button>
      </NavLink>
      <NavLink to="/register">
        <button className='bg-black text-white px-4 py-2 rounded-md w-full sm:w-auto'>
          Register
        </button>
      </NavLink>
    </div>
  </div>
  )
}

export default Home
