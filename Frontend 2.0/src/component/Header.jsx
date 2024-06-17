import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../style/Header.css";
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../redux/store';
import toast from 'react-hot-toast';

function Header() {
  let isLogin = useSelector(state => state.isLogin); 
  isLogin = isLogin || localStorage.getItem("userId");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      dispatch(authActions.logout());
      toast.success("Logout Successfully");
      navigate("/login");
      localStorage.clear();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="header-container">
      <h4 className="header-title">MY BLOG APP</h4>
      <div className="header-links">
        {isLogin && (
          <>
            <Link to="/blogs" className="header-link">BLOGS</Link>
            <Link to="/myblogs" className="header-link">MY BLOGS</Link>
            <Link to="/createblog" className="header-link">CREATE BLOG</Link>
          </>
        )}
      </div>
      <div className="header-buttons">
        {isLogin ? (
          <button onClick={handleLogout} className="header-button">Logout</button>
        ) : (
          <>
            <Link to="/login">
              <button className="header-button">Login</button>
            </Link>
            <Link to="/register">
              <button className="header-button">Register</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
