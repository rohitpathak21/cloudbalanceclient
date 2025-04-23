import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const rolePermissions = {
  ADMIN: ["*"],
  READONLY: ["/usermanagement", "/costexplorer", "/awsservices"],
  CUSTOMER: ["/awsservices", "/costexplorer"],
};

const ProtectedRoute = ({ children }) => {
  // Retrieve user data from localStorage
  const user = JSON.parse(localStorage.getItem('user'));
  const location = useLocation();

  // If no user is logged in, redirect to the login page
  if (!user) {
    return <Navigate to="/" replace />;
  }

  const userRole = user.role?.toUpperCase();
  const path = location.pathname;

  // Get the allowed routes based on the user's role
  const allowedRoutes = rolePermissions[userRole] || [];

  // Check if the current path is allowed for the user's role
  const isAllowed =
    allowedRoutes.includes("*") || allowedRoutes.some((route) => path.startsWith(route));

  // If not allowed, redirect to a default route (e.g., /awsservices)
  if (!isAllowed) {
    return <Navigate to="/awsservices" replace />;
  }

  return children;
};

export default ProtectedRoute;
