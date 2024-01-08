//Mathilda Eriksson, DT162G, HT23
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    // If no token exists, redirect to login page
    return <Navigate to="/login" />;
  }

  // If there is a token, render child component
  return children;
};

export default ProtectedRoute;
