import React from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./SignUp.css";
import axios from "axios";

const SignUp = () => {
  const [formData, setFormData] = useState({
    Fname: "",
    Lname: "",
    Email: "",
    Password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{1,3})+$/.test(formData.Email)) {
      console.log(formData.Email)
      alert("Please enter a valid email address");
      return;
    }

    if (formData.Password.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }

    if (formData.Password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    const dataToSend = { ...formData };
    delete dataToSend.confirmPassword;

    try {
      const response = await axios.post(
        "https://localhost:7193/Register",
        dataToSend
      );
      console.log(response.data);
      alert("Registration successful");
      navigate("/Login");
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed. Please try again later.");
    }
    console.log(formData);
    setFormData({
      Fname: "",
      Lname: "",
      Email: "",
      Password: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="signUp-box">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div className="name-fields">
          <div>
            <label>First Name:</label>
            <input
              type="text"
              id="Fname"
              name="Fname"
              value={formData.Fname}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="Lname"
              name="Lname"
              value={formData.Lname}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="email-field">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="Email"
            name="Email"
            value={formData.Email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="password-fields">
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="Password"
              name="Password"
              value={formData.Password}
              onChange={handleChange}
              minLength="6"
              required
            />
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              minLength="6"
              required
            />
          </div>
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
