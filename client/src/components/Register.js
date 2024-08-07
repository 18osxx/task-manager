import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Attempting to register user:", formData.username);
      const response = await axios.post(
        "http://localhost:5000/users/register",
        formData
      );
      if (response.status === 201) {
        alert("Registration successful!");
        console.log("Registration successful for user:", formData.username);
      } else {
        alert("Registration failed!");
        console.log(
          "Registration failed for user:",
          formData.username,
          "Response:",
          response
        );
      }
    } catch (error) {
      console.error("Error registering user:", formData.username, error);
      alert("Registration failed!");
    }
  };

  return (
    <div className="container fade-in">
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
