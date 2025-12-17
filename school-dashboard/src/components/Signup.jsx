import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./AuthForm.css";

function Signup() {
  const navigate = useNavigate();

  // ✅ Define formData here
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/signup", formData);
      alert("Signup successful, Now Login!");
      navigate("/students");
    } catch (err) {
      console.error(err);
      alert("Signup failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
      <h2>Create an Account</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
       
        <input 
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        </div>
        <div className="input-group">
           
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        </div>
        <div className="input-group">
          
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          autoComplete="off"
        />
        </div>
        <button type="submit" className="btn">Sign Up</button>
      </form>
      <p className="toggle-text">
        Already have an account? <Link to="/login">Login</Link>
      </p>
      </div>
    </div>
  );
}

export default Signup;
