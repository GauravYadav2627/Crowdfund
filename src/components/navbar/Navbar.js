import React from 'react'
import { Link } from "react-router-dom";
import "./Navbar.css"

const Navbar = ({links}) => {
  return (
    <nav className='navbar'>
      {links.map((link)=>
       <li key={link.to}>
       <Link to={link.to}>{link.label}</Link>
     </li>)}
    </nav>
  )
}

export default Navbar
