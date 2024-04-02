import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "./Header.css";

const Header = () => {
  const [userRole, setUserRole] = useState("");
  const test = localStorage.getItem("jwtToken");
   const renderLinks = (links) => {
    return links.map((link, index) => (
      <li key={index}>
        <Link to={link.to}>{link.label}</Link>
      </li>
    ));
  };
  useEffect(() => {
    const handleTokenChange = () => {
      const tokenFromLocalStorage = localStorage.getItem("jwtToken");
      // console.log("fromheader", tokenFromLocalStorage);
      const decodedToken = tokenFromLocalStorage ? jwtDecode(tokenFromLocalStorage) : null;
      setUserRole(decodedToken ? decodedToken.role : "");
    };
    handleTokenChange();
    const handleStorageChange = (event) => {
      if (event.key === "jwtToken") {
        handleTokenChange();
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);
    // console.log("header",userRole);
  const publicLinks = [
    { to: "/Home", label: "Home" },
    { to: "/Login", label: "Login" },
    { to: "/SignUp", label: "Sign Up" },];
  const adminLinks = [
    { to: "/Home", label: "Home" },
    { to: "/InvestorInfo", label: "Investor Info" },
    { to: "/ManageProject", label: "Manage Project" },
    { to: "/Projects", label: "Create Campaign" },
    { to: "/Logout", label: "Logout" },];
  const userLinks = [
    { to: "/Home", label: "Home" },
    { to: "/MyPayment", label: "My Payments" },
    { to: "/Logout", label: "Logout" },];
  return (
    <nav>
      <ul>
        {userRole
          ? userRole === "admin"
            ? renderLinks(adminLinks)
            : renderLinks(userLinks)
          : renderLinks(publicLinks)
          }
      </ul>
    </nav>
  );
};

export default Header;
