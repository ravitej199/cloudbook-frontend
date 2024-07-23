import React from 'react'
import { NavLink } from 'react-router-dom'
import useIsMobile from './CheckIsMobile'; 
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import NoteContext from '../Context/Notes/noteContext';



function Navbar() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const {LoggedIn} = useContext(NoteContext)

const logout = ()=>{
  localStorage.removeItem('token');
    toast.success("You have been Logged Out");
    navigate("/login");
}
  return (
    <div className='fixed top-0 left-0 right-0 z-10'>
        <nav className="navbar navbar-expand-lg bg-body-tertiary flex font-bold">
  <div className="container-fluid">
    <NavLink className="navbar-brand text-[30px]" to="/">CloudBook</NavLink>
    </div>
    <div  id="navbarNav">
      <ul className="navbar-nav px-3">
        <li className="nav-item">
          <NavLink className="nav-link text-[25px]" aria-current="page" to="/">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link text-[25px] " to="/about">About</NavLink>
        </li>
        {(isMobile && LoggedIn ) && (
              <li className="nav-item font-bold">
                <button onClick={logout} className="nav-link text-[25px] bg-transparent border-none  cursor-pointer">
                  Logout
                </button>
              </li>
            )}
      </ul>
    </div>
 
</nav>
      
    </div>
  )
}

export default Navbar
