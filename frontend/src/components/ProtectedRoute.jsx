import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, type }) => {
  const token = localStorage.getItem('token');
  const userType = localStorage.getItem('userType');

  if (!token) return <Navigate to="/" replace />;
  if (type && userType !== type) return <Navigate to="/" replace />;
  return children;
};

export default ProtectedRoute;