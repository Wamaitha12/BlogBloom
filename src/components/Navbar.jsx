import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Logo from "../img/logo.png";
import { AuthContext } from '../context/authContext';

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <div className='navbar'>
      <div className="container">
        <div className="logo">
        <Link to="/">
        <div className="logo">
          <img src={Logo} alt="" />
        </div>
      </Link> 

        </div>
        <div className="links">
          <Link className='link' to="/?cat=technology">
            <h3>Technology</h3>
          </Link>
          <Link className='link' to="/?cat=travel">
            <h3>Travel</h3>
          </Link>
          <Link className='link' to="/?cat=health&wellness">
            <h3>Health and Wellness</h3>
          </Link>
          <Link className='link' to="/?cat=food">
            <h3>Food</h3>
          </Link>
          <Link className='link' to="/?cat=science">
            <h3>Science</h3>
          </Link>
          <Link className='link' to="/?cat=art">
            <h3>Art</h3>
          </Link>
          <span className='write'>
          <Link className='link' to="/write">My Post</Link>
          </span>
          <span>{currentUser?.username}</span>
          {currentUser ? (
            <span onClick={logout}>Logout</span>
          ) : (
            <Link className="link" to="/login">
              Login
            </Link>
          )}

        </div>
      </div>
    </div>
  );
}

export default Navbar;