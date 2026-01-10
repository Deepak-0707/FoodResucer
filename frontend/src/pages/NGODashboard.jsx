import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ngoAPI } from '../api';
import './Dashboard.css';

const NGODashboard = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await ngoAPI.getProfile();
      setProfile(response.data);
    } catch (err) {
      console.error('Failed to fetch profile:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    localStorage.removeItem('user');
    navigate('/');
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>NGO Dashboard</h1>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </header>
      <div className="dashboard-content">
        <div className="welcome-card">
          <h2>Welcome, {profile?.organizationName}!</h2>
          <p>Manage your NGO profile and find event opportunities</p>
        </div>
        <div className="profile-section">
          <h3>Organization Profile</h3>
          <div className="profile-grid">
            <div className="profile-item">
              <label>Organization Name:</label>
              <p>{profile?.organizationName}</p>
            </div>
            <div className="profile-item">
              <label>Email:</label>
              <p>{profile?.email}</p>
            </div>
            <div className="profile-item">
              <label>Registration Number:</label>
              <p>{profile?.registrationNumber}</p>
            </div>
            <div className="profile-item">
              <label>Contact Person:</label>
              <p>{profile?.contactPerson}</p>
            </div>
            <div className="profile-item">
              <label>Phone:</label>
              <p>{profile?.phone}</p>
            </div>
            <div className="profile-item">
              <label>Address:</label>
              <p>{profile?.address || 'Not provided'}</p>
            </div>
            <div className="profile-item full-width">
              <label>Description:</label>
              <p>{profile?.description || 'No description provided'}</p>
            </div>
          </div>
        </div>
        <div className="actions-section">
          <h3>Quick Actions</h3>
          <div className="action-cards">
            <div className="action-card">
              <h4>📅 Browse Events</h4>
              <p>Find upcoming events to participate in</p>
              <button className="action-btn">View Events</button>
            </div>
            <div className="action-card">
              <h4>🤝 Partnerships</h4>
              <p>Manage your event partnerships</p>
              <button className="action-btn">View Partnerships</button>
            </div>
            <div className="action-card">
              <h4>📊 Reports</h4>
              <p>View your activity and impact</p>
              <button className="action-btn">View Reports</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NGODashboard;