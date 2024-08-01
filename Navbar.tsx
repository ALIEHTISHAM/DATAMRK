import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './Navbar.css';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="logo.png" alt="Logo" />
      </div>
      <div className={`navbar-buttons ${menuOpen ? 'open' : ''}`}>
        <Link to="/" className="navbar-button">Home</Link>
        <Link to="/about" className="navbar-button">About</Link>
        <Link to="/services" className="navbar-button">Services</Link>
        <button className="navbar-button">Whats Coming?</button>
        <Link to="/login" className="navbar-button navbar-login-button">Login/Sign Up</Link>
      </div>
      <div className="navbar-menu-toggle" onClick={toggleMenu}>
        ☰
      </div>
    </nav>
  );
}

export default Navbar;
