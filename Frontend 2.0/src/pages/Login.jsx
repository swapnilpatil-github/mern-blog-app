import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import "../style/Login.css"
import toast from 'react-hot-toast';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputs, setInput] = useState({
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
    e.preventDefault(); // Prevent form from refreshing the page
    console.log(inputs);
    try {
      const { data } = await axios.post("/api/user/login", {
        email: inputs.email,
        password: inputs.password
      });
      if (data.success) {
        localStorage.setItem("userId",data?.user._id);
        dispatch(authActions.login());
        toast.success("User Login Successfully");
        navigate("/");
      } else {
        alert("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.log(error);
      alert("An error occurred during login. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <h1>Login</h1>
      <form onSubmit={handleFormSubmit}>
        <label>Email</label>
        <input 
          type="email" 
          name='email' 
          required 
          placeholder='Enter email'
          value={inputs.email} 
          onChange={handleChange}
        />
        
        <label>Password</label>
        <input 
          type="password" 
          name='password' 
          placeholder='Enter password' 
          required 
          value={inputs.password} 
          onChange={handleChange}
        />
        
        <button type="submit">Login</button>
      </form>
      <p>Do not have an account? <Link to="/register">Register</Link></p>
    </div>
  );
}

export default Login;
