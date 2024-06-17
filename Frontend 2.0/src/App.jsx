import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './component/Header';
import Blogs from './pages/Blogs';
import UserBlog from './pages/UserBlog';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateBlog from './pages/CreateBlog';
import EditBlog from './pages/EditBlog';
import {Toaster} from "react-hot-toast"


function App() {
  return (
    <Router>
      <Header />
      <Toaster></Toaster>
      <div>
        <Routes>
          <Route path="/" element={<Blogs />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/myblogs" element={<UserBlog/>} /> 
          <Route path="/editblog/:id" element={<EditBlog/>} />
          <Route path="/createblog" element={<CreateBlog/>} /> 
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
