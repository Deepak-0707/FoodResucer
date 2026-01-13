import React, { useState, useEffect } from 'react';
import EventCard from './EventCard';
import { getUpcomingEvents } from '../services/api';

const EventList = ({ onEventSelect }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await getUpcomingEvents();
      setEvents(response.data || []);
      setError(null);
    } catch (err) {
      setError('Failed to load events. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loader"></div>
        <p>Loading events...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
        <button onClick={fetchEvents} className="retry-btn">Retry</button>
      </div>
    );
  }

  return (
    <div className="event-list-container">
      <header className="page-header">
        <h1>🍽️ Food Rescue Events</h1>
        <p>Help reduce food waste by booking leftover food from upcoming events</p>
      </header>
      
      {events.length === 0 ? (
        <div className="no-events">
          <p>No upcoming events in the next 2 days</p>
        </div>
      ) : (
        <div className="events-grid">
          {events.map((event) => (
            <EventCard 
              key={event._id} 
              event={event} 
              onClick={onEventSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default EventList;
