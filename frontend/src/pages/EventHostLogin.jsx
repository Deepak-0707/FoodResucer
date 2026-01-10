import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { eventHostAPI } from '../api';
import './AuthPages.css';

const EventHostLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await eventHostAPI.login(formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userType', 'eventHost');
      localStorage.setItem('user', JSON.stringify(response.data.eventHost));
      navigate('/eventhost/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1 className="auth-title">Event Host Login</h1>
        <p className="auth-subtitle">Welcome back! Please login to your account</p>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
          </div>
          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="auth-footer">Don't have an account? <Link to="/eventhost/register">Register here</Link></p>
        <Link to="/" className="back-link">← Back to Home</Link>
      </div>
    </div>
  );
};

export default EventHostLogin;