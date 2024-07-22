import React from 'react'
import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <div className='fixed top-0 left-0 right-0 z-10'>
        <nav className="navbar navbar-expand-lg bg-body-tertiary flex font-bold">
  <div className="container-fluid">
    <NavLink className="navbar-brand text-[30px]" to="/">CloudBook</NavLink>
    </div>
    <div  id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink className="nav-link text-[25px]" aria-current="page" to="/">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link text-[25px] " to="/about">About</NavLink>
        </li>
      
      </ul>
    </div>
 
</nav>
      
    </div>
  )
}

export default Navbar
