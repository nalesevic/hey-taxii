import React from 'react';
import {NavLink} from 'react-router-dom';

const CompanyNavbar = () => {
  return (
    <nav className="nav-wrapper black darken-3">
      <div className="container">
        <NavLink to='/company' className="left">Hey Taxi</NavLink>
        <ul className="right">
            <li><NavLink to='/company'>Home</NavLink></li>
            <li><NavLink to='/profile'>Profile</NavLink></li>
            <li><NavLink to='/drivers'>Drivers</NavLink></li>
            <li><NavLink to='/vehicles'>Vehicles</NavLink></li>
            <li><a href='/logout'>Logout</a></li>
        </ul>
      </div>
    </nav> 
  )
}

export default CompanyNavbar