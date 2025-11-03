import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import ProtectedRoute from './routes/ProtectedRoute'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Routes>
        {/* Default route now opens LoginPage */}
        <Route path="/" element={<LoginPage />} />

        {/* Also handle explicit /login path */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Admin Dashboard */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        {/* 404 Fallback */}
        <Route
          path="*"
          element={
            <div className="p-8">
              Page not found. <Link to="/">Go to Login</Link>
            </div>
          }
        />
      </Routes>
    </div>
  )
}
