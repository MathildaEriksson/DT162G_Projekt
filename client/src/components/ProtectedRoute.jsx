//Mathilda Eriksson, DT162G, HT23
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    // If no token exists, redirect to login page
    return <Navigate to="/login" />;
  }

  try {
    // Decode the token
    const decodedToken = jwtDecode(token);

    // Check if token has expired
    const currentTime = Date.now() / 1000;
    if (decodedToken.exp < currentTime) {
      // Token has expired, redirect to login page
      return <Navigate to="/login" />;
    }
  } catch (error) {
    // If there's an error decoding the token (e.g., token is invalid), redirect to login
    return <Navigate to="/login" />;
  }

  // If there is a valid token, render child component
  return children;
};

export default ProtectedRoute;
