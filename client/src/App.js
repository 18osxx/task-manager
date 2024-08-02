import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import TaskList from "./components/TaskList";
import AuthProvider from "./context/AuthContext";
import "./styles.css";

const HomePage = () => (
  <div className="homepage">
    <h1>Welcome to Task Manager</h1>
    <p>Your personal task management solution</p>
    <button onClick={() => (window.location.href = "/register")}>
      Get Started
    </button>
  </div>
);

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/tasks" element={<TaskList />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
