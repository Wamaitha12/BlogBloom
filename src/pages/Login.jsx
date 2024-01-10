import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { AuthContext } from '../context/authContext'; // Add this import

const Login = () => {
  console.log("Received Login request");

  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const [err, setError] = useState(null);
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(inputs)      
      console.log("Login successful!");
      navigate("/");
    } catch (err) {
      console.error("Login Error:", err);
      setError(err?.response?.data || "An error occurred");
    }
  };

  return (
    <div className='auth'>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input required type="text" placeholder='username' name="username" onChange={handleChange}/>
        <input required type="password" placeholder='password' name="password"  onChange={handleChange} />
        <button type="submit">Login</button>
        {err && <p>{err}</p>}
        <span >Don't have an Account? <Link to="/register">Register</Link></span>
      </form>
    </div>
  )
}

export default Login;
