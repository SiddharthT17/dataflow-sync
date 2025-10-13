import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./auth/LoginPage";
import PrivateRoute from "./auth/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import TableSelection from "./pages/TableSelection";
import Navbar from "./components/Navbar";
import ConnectorSetup from "./pages/ConnectorSetup";
import ConnectorTesting from "./pages/ConnectorTesting";
import ConnectorSuccess from "./pages/ConnectorSuccess";


export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/connector-setup"
          element={
            <PrivateRoute>
              <ConnectorSetup />
            </PrivateRoute>
          }
        />

        <Route
          path="/table-selection"
          element={
            <PrivateRoute>
              <TableSelection />
            </PrivateRoute>
          }
        />

        {/* Redirect everything else to dashboard */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
        <Route path="/connectors" element={<ConnectorSetup />} />
        <Route path="/connector/:id/setup" element={<ConnectorSetup />} />
        <Route path="/connector/:id/testing" element={<ConnectorTesting />} />
        <Route path="/connector/:id/success" element={<ConnectorSuccess />} />
      </Routes>
    </>
  );
}
