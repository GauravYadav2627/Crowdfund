import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    Email: "",
    Password: "",
  });
  const navigate = useNavigate();
  // const [token, setToken] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.Email.trim()) {
      alert("Please enter your email address.");
      return;
    }
    if (!formData.Password.trim()) {
      alert("Please enter your password.");
      return;
    }
    try {
      await axios
        .post("https://localhost:7193/Login/login", formData)
        .then((response) => {
          const { token } = response.data;
          if (token) {
            const decodedToken = jwtDecode(token);
            const userRole = decodedToken.role;
            localStorage.setItem("jwtToken", token);
            // setToken(token);
            // console.log("fromlogin", localStorage);
            if (userRole === "user") {
              navigate("/Home");
              window.location.reload();
            } else if (userRole === "admin") {
              navigate("/Home");
              window.location.reload();
            } else {
              console.error("Garbage role:", userRole);
            }
          } else {
            console.error("Login failed: No token received.");
            alert("Login failed. Please try again.");
          }
        });
    } catch (error) {
      // console.error("Login error:", error);
      alert("Login failed. Please try again.");
    }
  };
  return (
    <>
      <div className="Whole">
        <div className="login-box">
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="Email">Email:</label>
              <input
                type="email"
                id="Email"
                name="Email"
                value={formData.Email}
                onChange={handleChange}
                required
                placeholder="Enter your email address"
              />
            </div>
            <div>
              <label htmlFor="Password">Password:</label>
              <input
                type="password"
                id="Password"
                name="Password"
                value={formData.Password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
              />
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </>
  );
};
export default Login;
