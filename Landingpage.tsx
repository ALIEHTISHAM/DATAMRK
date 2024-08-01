import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Landingpage.css';

function LandingPage() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login'); // Navigate to the Login page when the button is clicked
  };

  const handleSignUpClick = () => {
    navigate('/register'); // Navigate to the Register page when the button is clicked
  };

  return (
    <div className="landing-page">
      <div className="hero">
        <h1 className="title">DATAMARK</h1>
        <p className="subtitle">Copyright Protection leveraging Blockchain</p>
        <div className="buttons">
          <button className="button button-login" onClick={handleLoginClick}>Login</button>
          <button className="button button-signup" onClick={handleSignUpClick}>Sign Up</button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
