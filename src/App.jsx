import { Routes, Route, Navigate } from 'react-router-dom'
import SignUp from './pages/auth/SignUp.jsx'
import Login from './pages/auth/Login.jsx'
import ProfileSetup from './pages/profileSetup/ProfileSetup.jsx'
import ForgotPassword from './pages/auth/ForgotPassword.jsx'
import VerifyOtp from './pages/auth/VerifyOtp.jsx'
import ResetPassword from './pages/auth/ResetPassword.jsx'
import Dashboard from './pages/dashboard/Dashboard.jsx'
import Settings from './pages/dashboard/sidebar/Settings.jsx'
import NotificationsPage from './pages/dashboard/Notifications/NotificationsPage.jsx'

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile-setup" element={<ProfileSetup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/notifications" element={<NotificationsPage />} />
      </Routes>
    </>
  )
}