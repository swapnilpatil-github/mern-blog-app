import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import "../style/Register.css"
import toast from 'react-hot-toast';
function Register() {
    const navigate = useNavigate()
    const [inputs,setInput] = useState({
      username:'',
      email:'',
      password:''
    }) 
     
    //handle input changes
    const handleChange = (e) => {
      setInput((prev) => ({
        ...prev,
        [e.target.name] : e.target.value
      }))
    }
    
    const handleFormSubmit =async (e) => {
      e.preventDefault(); //when form submit page refresh to prevent this we use this 
      console.log(inputs)
      try {
       const {data} = await axios.post("/api/user/register",{
          username:inputs.username,
          email:inputs.email,
          password:inputs.password
        })
        if(data.success || data){
          toast.success("User Register Successfully");
          navigate("/login")
        }
        
      } catch (error) {
        console.log(error)
      }
      
    }

    
  return (
    <div className="auth-container">
      <h1>Register</h1>
      <form onSubmit={handleFormSubmit}>
        <label>Name</label>
        <input type="text" name='username' required placeholder='enter username'
        value={inputs.name} onChange={handleChange}
        />
        
        <label>Email</label>
        <input type="email" name='email'required placeholder='enter email'
        value={inputs.email} onChange={handleChange}
        />
        
        <label>Password</label>
        <input type="password" name='password' placeholder='enter password'required 
        value={inputs.password} onChange={handleChange}
        />
        
        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
}

export default Register;
