import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { eventHostAPI } from '../api';
import './Dashboard.css';

const EventHostDashboard = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await eventHostAPI.getProfile();
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
        <h1>Event Host Dashboard</h1>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </header>
      <div className="dashboard-content">
        <div className="welcome-card">
          <h2>Welcome, {profile?.companyName}!</h2>
          <p>Manage your events and connect with NGOs</p>
        </div>
        <div className="profile-section">
          <h3>Company Profile</h3>
          <div className="profile-grid">
            <div className="profile-item">
              <label>Company Name:</label>
              <p>{profile?.companyName}</p>
            </div>
            <div className="profile-item">
              <label>Email:</label>
              <p>{profile?.email}</p>
            </div>
            <div className="profile-item">
              <label>Business Type:</label>
              <p>{profile?.businessType}</p>
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
              <label>Website:</label>
              <p>{profile?.website || 'Not provided'}</p>
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
              <h4>➕ Create Event</h4>
              <p>Host a new event</p>
              <button className="action-btn">Create Event</button>
            </div>
            <div className="action-card">
              <h4>📋 My Events</h4>
              <p>Manage your hosted events</p>
              <button className="action-btn">View Events</button>
            </div>
            <div className="action-card">
              <h4>🏢 Find NGOs</h4>
              <p>Connect with NGO partners</p>
              <button className="action-btn">Browse NGOs</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventHostDashboard;