import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.removeItem("jwtToken");
      navigate("/login");
      console.log(localStorage);
    }
  };
  return (
    <a href="#" onClick={handleLogout}>
      Logout
    </a>
  );
};

export default Logout;
