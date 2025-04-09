import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store';
import { getCurrentUser } from './store/slices/authSlice';
import { webSocketService } from './services/websocket';
import RequireRole from './components/auth/RequireRole';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';

// Public pages
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';

// Farmer pages
import FarmerDashboard from './pages/farmer/Dashboard';
import FarmerProducts from './pages/farmer/Products';
import FarmerOrders from './pages/farmer/Orders';
import FarmerCertifications from './pages/farmer/Certifications';
import FarmerAnalytics from './pages/farmer/Analytics';
import FarmerProfile from './pages/farmer/Profile';

// Consumer pages
import ConsumerDashboard from './pages/consumer/Dashboard';
import ConsumerProducts from './pages/consumer/Products';
import ConsumerOrders from './pages/consumer/Orders';
import ConsumerFavorites from './pages/consumer/Favourites';
import ConsumerProfile from './pages/consumer/Profile';

// Admin pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminUsers from './pages/admin/Users';
import AdminVerifications from './pages/admin/Verifications';
import AdminAnalytics from './pages/admin/Analytics';

//import AdminSettings from './pages/admin/Settings';

export default function App() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);
  const token = useSelector((state: RootState) => state.auth.token);
  const isAuthenticated = user !== null && token !== null;

  useEffect(() => {
    if (isAuthenticated && !user) {
      dispatch(getCurrentUser());
    }
  }, [dispatch, isAuthenticated, user]);

  useEffect(() => {
    // Initialize WebSocket connection
    webSocketService.connect();

    // Cleanup on unmount
    return () => {
      webSocketService.disconnect();
    };
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <Features />
              </>
            }
          />
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Farmer routes */}
          <Route
            path="/farmer/dashboard"
            element={
              <RequireRole allowedRoles={['farmer']}>
                <FarmerDashboard />
              </RequireRole>
            }
          />
          <Route
            path="/farmer/products"
            element={
              <RequireRole allowedRoles={['farmer']}>
                <FarmerProducts />
              </RequireRole>
            }
          />
          <Route
            path="/farmer/orders"
            element={
              <RequireRole allowedRoles={['farmer']}>
                <FarmerOrders />
              </RequireRole>
            }
          />
          <Route
            path="/farmer/certifications"
            element={
              <RequireRole allowedRoles={['farmer']}>
                <FarmerCertifications />
              </RequireRole>
            }
          />
          <Route
            path="/farmer/analytics"
            element={
              <RequireRole allowedRoles={['farmer']}>
                <FarmerAnalytics />
              </RequireRole>
            }
          />
          <Route
            path="/farmer/profile"
            element={
              <RequireRole allowedRoles={['farmer']}>
                <FarmerProfile />
              </RequireRole>
            }
          />

          {/* Consumer routes */}
          <Route
            path="/consumer/dashboard"
            element={
              <RequireRole allowedRoles={['consumer']}>
                <ConsumerDashboard />
              </RequireRole>
            }
          />
          <Route
            path="/consumer/products"
            element={
              <RequireRole allowedRoles={['consumer']}>
                <ConsumerProducts />
              </RequireRole>
            }
          />
          <Route
            path="/consumer/orders"
            element={
              <RequireRole allowedRoles={['consumer']}>
                <ConsumerOrders />
              </RequireRole>
            }
          />
          <Route
            path="/consumer/favorites"
            element={
              <RequireRole allowedRoles={['consumer']}>
                <ConsumerFavorites />
              </RequireRole>
            }
          />
          <Route
            path="/consumer/profile"
            element={
              <RequireRole allowedRoles={['consumer']}>
                <ConsumerProfile />
              </RequireRole>
            }
          />

          {/* Admin routes */}
          <Route
            path="/admin/dashboard"
            element={
              <RequireRole allowedRoles={['admin']}>
                <AdminDashboard />
              </RequireRole>
            }
          />
          <Route
            path="/admin/users"
            element={
              <RequireRole allowedRoles={['admin']}>
                <AdminUsers />
              </RequireRole>
            }
          />
          <Route
            path="/admin/verifications"
            element={
              <RequireRole allowedRoles={['admin']}>
                <AdminVerifications />
              </RequireRole>
            }
          />
          <Route
            path="/admin/analytics"
            element={
              <RequireRole allowedRoles={['admin']}>
                <AdminAnalytics />
              </RequireRole>
            }
          />
          {/* <Route
            path="/admin/settings"
            element={
              <RequireRole allowedRoles={['admin']}>
                <AdminSettings />
              </RequireRole>
            }
          /> */}

          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
} 