import React, { useState } from "react";
import Navbar from "../navbar/Navbar";
import { Outlet } from "react-router-dom";
import Logout from "../Logout";
import Header from "../header/Header";
import Login from "../../pages/login/Login";

const AdminDashboard = () => {
  const navLinks = [
    { to: "/Projects", label: "Projects" },
    { to: "/InvestorInfo", label: "InvestorInfo" },
  ];

  const tokenHandler = (token)=>{
      setToken(token)
  }

  const [isLogin, setIsLogin] = useState(false);
  const [token, setToken] = useState(null);

  return (
    <div>
      <Header token={token} />
      <Login setIsLogin={setIsLogin} tokenHandler={tokenHandler} token={token} />
    </div>
  );
};

export default AdminDashboard;
