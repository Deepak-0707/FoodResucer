import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ngoAPI } from '../api';
import './AuthPages.css';

const NGORegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    organizationName: '', email: '', password: '', registrationNumber: '',
    contactPerson: '', phone: '', address: '', description: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await ngoAPI.register(formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userType', 'ngo');
      localStorage.setItem('user', JSON.stringify(response.data.ngo));
      navigate('/ngo/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1 className="auth-title">NGO Registration</h1>
        <p className="auth-subtitle">Create your NGO account</p>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Organization Name *</label>
            <input type="text" value={formData.organizationName} onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })} required />
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
            <label>Registration Number *</label>
            <input type="text" value={formData.registrationNumber} onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })} required />
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
        <p className="auth-footer">Already have an account? <Link to="/ngo/login">Login here</Link></p>
        <Link to="/" className="back-link">← Back to Home</Link>
      </div>
    </div>
  );
};

export default NGORegister;