import React from 'react'
import Navbar from '../navbar/Navbar';
import { Outlet } from 'react-router-dom';

const UserDashboard = () => {
    const userLinks = [
            
  
      ];
  return (
    <div>
       <Navbar links={userLinks} />
      <Outlet />
    </div>
  )
}

export default UserDashboard
