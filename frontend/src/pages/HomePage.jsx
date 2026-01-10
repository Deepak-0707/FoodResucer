import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">Welcome to Our Platform</h1>
        <p className="home-subtitle">Choose your account type to continue</p>
        
        <div className="card-container">
          <div className="card" onClick={() => navigate('/ngo/login')}>
            <div className="card-icon">🏢</div>
            <h2>NGO</h2>
            <p>Non-Governmental Organizations looking to host or participate in events</p>
            <button className="card-button">Continue as NGO</button>
          </div>

          <div className="card" onClick={() => navigate('/eventhost/login')}>
            <div className="card-icon">🎉</div>
            <h2>Event Host</h2>
            <p>Companies and organizations hosting events and seeking NGO partnerships</p>
            <button className="card-button">Continue as Event Host</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
