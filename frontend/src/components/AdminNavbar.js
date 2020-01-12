import React from 'react';
import {NavLink} from 'react-router-dom'

const AdminNavbar = () => {
  return (
    <nav className="nav-wrapper red darken-3">
      <div className="container">
        <p className="brand-logo">Administrator</p>
        <ul className="right">
          <li><a href ='/logout'>Logout</a></li>
        </ul>
      </div>
    </nav> 
  )
}

export default AdminNavbar