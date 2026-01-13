import React from 'react';

const SuccessModal = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="success-modal">
        <div className="success-icon">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h2>Booking Confirmed! 🎉</h2>
        <p>Thank you for helping us reduce food waste!</p>
        <p className="email-note">A confirmation email has been sent to your email address with all the details.</p>
        
        <button onClick={onClose} className="close-modal-btn">
          Back to Events
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
