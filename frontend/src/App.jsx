import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NGOLogin from './pages/NGOLogin';
import NGORegister from './pages/NGORegister';
import EventHostLogin from './pages/EventHostLogin';
import EventHostRegister from './pages/EventHostRegister';
import NGODashboard from './pages/NGODashboard';
import EventHostDashboard from './pages/EventHostDashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ngo/login" element={<NGOLogin />} />
        <Route path="/ngo/register" element={<NGORegister />} />
        <Route path="/eventhost/login" element={<EventHostLogin />} />
        <Route path="/eventhost/register" element={<EventHostRegister />} />
        <Route path="/ngo/dashboard" element={<ProtectedRoute type="ngo"><NGODashboard /></ProtectedRoute>} />
        <Route path="/eventhost/dashboard" element={<ProtectedRoute type="eventHost"><EventHostDashboard /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;