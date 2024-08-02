import React from 'react';
import './styles.css';

const HomePage = () => (
  <div className="homepage">
    <h1>Welcome to Task Manager</h1>
    <p>Your personal task management solution</p>
    <button onClick={() => window.location.href = '/register'}>Get Started</button>
    <button onClick={() => window.location.href = '/login'} style={{ marginTop: '20px' }}>Login</button>
  </div>
);

export default HomePage;
