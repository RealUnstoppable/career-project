import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logoutUser } = useAuth();

  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <div>
        {user ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            {/* The '?' is a safety check. It won't try to read .username if user is null */}
            <span>Hello, {user?.username}</span> 
            <button onClick={logoutUser} className="logout-btn">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;