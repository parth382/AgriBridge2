import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface RequireRoleProps {
  children: React.ReactNode;
  allowedRoles: ('farmer' | 'consumer' | 'admin')[];
}

export default function RequireRole({ children, allowedRoles }: RequireRoleProps) {
  const user = useSelector((state: RootState) => state.auth.user);
  const token = useSelector((state: RootState) => state.auth.token);
  const location = useLocation();

  const isAuthenticated = user !== null && token !== null;

  if (!isAuthenticated) {
    // Redirect to login page but save the attempted url
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!user) {
    // This should not happen if isAuthenticated is true, but just in case
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.userType)) {
    // Redirect to appropriate dashboard based on user type
    const dashboardPath = `/${user.userType}/dashboard`;
    return <Navigate to={dashboardPath} replace />;
  }

  return <>{children}</>;
} 