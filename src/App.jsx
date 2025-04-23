import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PublicRoute from "./Routes/PublicRoute";
import ProtectedRoute from "./Routes/ProtectedRoute";
import UserManagement from "./pages/UserManagement";
import Onboarding from "./pages/Onboarding";
import CostExplorer from "./pages/CostExplorer";
import AwsServices from "./pages/AwsServices";
import Layout from "./layouts/Layout";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Public Route for login */}
          <Route
            path="/"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          {/* Protected routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route path="usermanagement" element={<UserManagement />} />
            <Route path="onboarding" element={<Onboarding />} />
            <Route path="costexplorer" element={<CostExplorer />} />
            <Route path="awsservices" element={<AwsServices />} />
          </Route>

          {/* Catch-all for unmatched routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
}

export default App;
