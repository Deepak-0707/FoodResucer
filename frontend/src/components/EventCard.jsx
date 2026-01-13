import React from 'react';

const EventCard = ({ event, onClick }) => {
  return (
    <div 
      className="event-card"
      onClick={() => onClick(event)}
    >
      <div className="event-card-header">
        <span className="event-type-badge">{event.eventType}</span>
        <span className="food-type-badge">{event.foodType}</span>
      </div>
      
      <div className="event-card-body">
        <h3 className="event-title">{event.eventType} Event</h3>
        
        <div className="event-detail">
          <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>{event.dayOfWeek} at {event.time}</span>
        </div>
        
        <div className="event-detail">
          <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span>{event.expectedGuests} Expected Guests</span>
        </div>
        
        <div className="foods-list">
          <h4>Available Foods:</h4>
          <p>{event.foodsOrdered}</p>
        </div>
      </div>
      
      <div className="event-card-footer">
        <button className="book-btn">
          Book Now
          <svg className="arrow-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default EventCard;