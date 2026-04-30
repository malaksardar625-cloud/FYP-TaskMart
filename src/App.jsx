import { Routes, Route, Navigate } from 'react-router-dom'
import SignUp from './pages/auth/signUp.jsx'
import Login from './pages/auth/login.jsx'
import ProfileSetup from './pages/profileSetup/profileSetup.jsx'
import ForgotPassword from './pages/auth/forgotPassword.jsx'
import VerifyOtp from './pages/auth/verifyOtp.jsx'
import ResetPassword from './pages/auth/resetPassword.jsx'
import Dashboard from './pages/dashboard/Dashboard.jsx'
import Settings from './pages/dashboard/sidebar/settings.jsx'
import ProfilePage from './components/profilePage.jsx'
import HomePage from './pages/homePage/homePage.jsx'
import ProductsPage from './pages/homePage/productsPage.jsx'
import ServicesPage from './pages/homePage/servicesPage.jsx'
import BecomeProductSeller from './pages/dashboard/sidebar/becomeSeller.jsx'
import BecomeServiceProvider from './pages/dashboard/sidebar/becomeProvider.jsx'

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile-setup" element={<ProfileSetup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route
          path="/settings/become-seller"
          element={<BecomeProductSeller />}
        />
        <Route
          path="/settings/become-provider"
          element={<BecomeServiceProvider />}
        />
        <Route
          path="/home"
          element={<HomePage setPage={null} addToCart={null} />}
        />
        <Route path="/products" element={<ProductsPage addToCart={null} />} />
        <Route path="/services" element={<ServicesPage addToCart={null} />} />
      </Routes>
    </>
  )
}
