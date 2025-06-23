import React, { useContext } from 'react';
import { Navigate } from 'react-router';
import { AuthContext } from '../Context/AuthContext';

const PublicRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (user) {
    return <Navigate to="/" replace />; // Redirect to homepage or dashboard
  }

  return children;
};

export default PublicRoute;
