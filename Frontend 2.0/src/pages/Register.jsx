import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../style/Register.css";
import toast from 'react-hot-toast';

function Register() {
  const navigate = useNavigate();
  const [inputs, setInput] = useState({
    username: '',
    email: '',
    password: ''
  });

  // Handle input changes
  const handleChange = (e) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/user/register", {
        username: inputs.username,
        email: inputs.email,
        password: inputs.password
      });
      if (data.success) {
        toast.success("User registered successfully");
        navigate("/login");
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred during registration. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <h1>Register</h1>
      <form onSubmit={handleFormSubmit} className="auth-form">
        <div className="form-group">
          <label htmlFor="username">Name</label>
          <input 
            type="text" 
            id="username" 
            name="username" 
            required 
            placeholder="Enter your username"
            value={inputs.username} 
            onChange={handleChange} 
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            required 
            placeholder="Enter your email"
            value={inputs.email} 
            onChange={handleChange} 
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            placeholder="Enter your password"
            required 
            value={inputs.password} 
            onChange={handleChange} 
          />
        </div>
        
        <button type="submit" className="submit-button">Register</button>
      </form>
      <p>Already have an account? <Link to="/login" className="login-link">Login</Link></p>
    </div>
  );
}

export default Register;
