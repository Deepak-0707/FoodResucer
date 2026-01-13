import React, { useState } from 'react';
import { createBooking } from '../services/api';
import SuccessModal from './SuccessModal';

const BookingPage = ({ event, onBack }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Please enter your name');
      return false;
    }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please enter a valid email');
      return false;
    }
    if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      setError('Please enter a valid 10-digit phone number');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      const bookingData = {
        eventId: event._id,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        eventType: event.eventType,
        foodsOrdered: event.foodsOrdered,
        expectedLeftover: event.expectedGuests
      };

      await createBooking(bookingData);
      setShowSuccess(true);
    } catch (err) {
      setError('Failed to create booking. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (showSuccess) {
    return <SuccessModal onClose={() => { setShowSuccess(false); onBack(); }} />;
  }

  return (
    <div className="booking-page">
      <button className="back-btn" onClick={onBack}>
        <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Events
      </button>

      <div className="booking-container">
        <div className="booking-summary">
          <h2>Event Details</h2>
          <div className="summary-card">
            <div className="summary-item">
              <strong>Event Type:</strong>
              <span>{event.eventType}</span>
            </div>
            <div className="summary-item">
              <strong>Food Type:</strong>
              <span>{event.foodType}</span>
            </div>
            <div className="summary-item">
              <strong>Available Foods:</strong>
              <span>{event.foodsOrdered}</span>
            </div>
            <div className="summary-item">
              <strong>Expected Leftover Portions:</strong>
              <span className="highlight">{event.expectedGuests}</span>
            </div>
            <div className="summary-item">
              <strong>Schedule:</strong>
              <span>{event.dayOfWeek} at {event.time}</span>
            </div>
          </div>
        </div>

        <div className="booking-form-container">
          <h2>Your Information</h2>
          <form onSubmit={handleSubmit} className="booking-form">
            <div className="form-group">
              <label htmlFor="name">
                <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">
                <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">
                <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="1234567890"
                required
              />
            </div>

            {error && <div className="error-message">{error}</div>}

            <button 
              type="submit" 
              className="submit-btn"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Processing...
                </>
              ) : (
                <>
                  <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Confirm Booking
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
