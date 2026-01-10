import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { eventHostAPI } from '../api';
import './AuthPages.css';

const EventHostRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: '', email: '', password: '', contactPerson: '',
    phone: '', businessType: '', website: '', address: '', description: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await eventHostAPI.register(formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userType', 'eventHost');
      localStorage.setItem('user', JSON.stringify(response.data.eventHost));
      navigate('/eventhost/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1 className="auth-title">Event Host Registration</h1>
        <p className="auth-subtitle">Create your Event Host account</p>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Company Name *</label>
            <input type="text" value={formData.companyName} onChange={(e) => setFormData({ ...formData, companyName: e.target.value })} required />
          </div>
          <div className="form-group">
            <label>Email *</label>
            <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
          </div>
          <div className="form-group">
            <label>Password *</label>
            <input type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required minLength="6" />
          </div>
          <div className="form-group">
            <label>Contact Person *</label>
            <input type="text" value={formData.contactPerson} onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })} required />
          </div>
          <div className="form-group">
            <label>Phone *</label>
            <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required />
          </div>
          <div className="form-group">
            <label>Business Type *</label>
            <input type="text" value={formData.businessType} onChange={(e) => setFormData({ ...formData, businessType: e.target.value })} placeholder="e.g., Corporate, Entertainment" required />
          </div>
          <div className="form-group">
            <label>Website</label>
            <input type="url" value={formData.website} onChange={(e) => setFormData({ ...formData, website: e.target.value })} placeholder="https://example.com" />
          </div>
          <div className="form-group">
            <label>Address</label>
            <input type="text" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows="3" />
          </div>
          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <p className="auth-footer">Already have an account? <Link to="/eventhost/login">Login here</Link></p>
        <Link to="/" className="back-link">← Back to Home</Link>
      </div>
    </div>
  );
};

export default EventHostRegister;