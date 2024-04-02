import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminDashboard from "./components/adminDashboard/AdminDashboard";
import UserDashboard from "./components/userDashboard/UserDashboard";
import Header from "./components/header/Header";
import Login from "./pages/login/Login";
import SignUp from "./pages/signUp/SignUp";
import Home from "./pages/home/Home";
import Projects from "./pages/projects/Projects";
import Stripe from "./pages/payments/Stripe";
import Logout from "./components/Logout";
import InvestorInfo from "./pages/investorInfo/InvestorInfo";
import ManageProject from "./pages/projects/ManageProject";
import MyPayment from "./pages/payments/MyPayment";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/UserDashboard" element={<UserDashboard />} />
        <Route path="/Projects" element={<Projects />} />
        <Route path="/Stripe" element={<Stripe />} />
        <Route path="/ManageProject" element={<ManageProject />} />
        <Route path="/MyPayment" element={<MyPayment />} />
        <Route path="/InvestorInfo" element={<InvestorInfo />} />
        <Route path="/Logout" element={<Logout />} />
      </Routes>
    </Router>
  );
}

export default App;
