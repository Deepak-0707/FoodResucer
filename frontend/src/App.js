import React, { useState } from 'react';
import EventList from './components/EventList';
import BookingPage from './components/BookingPage';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('events');
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleEventSelect = (event) => {
    setSelectedEvent(event);
    setCurrentPage('booking');
  };

  const handleBackToEvents = () => {
    setCurrentPage('events');
    setSelectedEvent(null);
  };

  return (
    <div className="App">
      {currentPage === 'events' ? (
        <EventList onEventSelect={handleEventSelect} />
      ) : (
        <BookingPage event={selectedEvent} onBack={handleBackToEvents} />
      )}
    </div>
  );