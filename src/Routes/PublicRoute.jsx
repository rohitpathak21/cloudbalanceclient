import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  // Retrieve user data from localStorage
  const user = JSON.parse(localStorage.getItem('user'));

  if (user) {
    const role = user.role?.toUpperCase();

    if (role === "ADMIN" || role === "READONLY") {
      return <Navigate to="/usermanagement" replace />;
    }

    if (role === "CUSTOMER") {
      return <Navigate to="/awsservices" replace />;
    }
  }

  return children;
};

export default PublicRoute;
