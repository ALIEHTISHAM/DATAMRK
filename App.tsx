import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './components/Landingpage';
import ServicesPage from './components/ServicesPage';
import Register from './components/Register';
import Login from './components/Login'; // Import the Login component
import { AuthProvider } from './components/AuthContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} /> {/* Add login route */}
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
