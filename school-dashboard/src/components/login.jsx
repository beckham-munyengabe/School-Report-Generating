import React, { useState } from "react";
import "./Login.css";
import axios from "axios";

function Login() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  // update input values
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // send data to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/register", user);
      alert("User inserted successfully!");
      setUser({ username: "", email: "", password: "" }); // clear form
    } catch (error) {
      console.error(error);
      alert("Failed to insert user!");
    }
  };

  return (
    <div  class="login-page">
      
      <form onSubmit={handleSubmit}>
        <h3>Creact Account</h3>
        <input
          type="text"
          name="username"
          value={user.username}
          onChange={handleChange}
          placeholder="User Name"
          required
        /><br /><br />
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          placeholder="Email"
          required
        /><br /><br />

        <input
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
          placeholder="Password"
          required
        /><br /><br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Login;