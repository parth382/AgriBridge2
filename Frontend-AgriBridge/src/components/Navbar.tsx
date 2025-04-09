import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { logout } from '../store/slices/authSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeaf } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';


export default function Navbar() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  const isAuthenticated = user !== null;

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  // Common navigation items
  const commonNavItems = [
    { name: 'Home', path: '/' },
  ];

  // Farmer navigation items
  const farmerNavItems = [
    { name: 'Dashboard', path: '/farmer/dashboard' },
    { name: 'Products', path: '/farmer/products' },
    { name: 'Orders', path: '/farmer/orders' },
    { name: 'Certifications', path: '/farmer/certifications' },
    { name: 'Analytics', path: '/farmer/analytics' },
    { name: 'Profile', path: '/farmer/profile' },
  ];

  // Consumer navigation items
  const consumerNavItems = [
    { name: 'Dashboard', path: '/consumer/dashboard' },
    { name: 'Products', path: '/consumer/products' },
    { name: 'Orders', path: '/consumer/orders' },
    { name: 'Favorites', path: '/consumer/favorites' },
    { name: 'Profile', path: '/consumer/profile' },
  ];

  // Admin navigation items
  const adminNavItems = [
    { name: 'Dashboard', path: '/admin/dashboard' },
    { name: 'Users', path: '/admin/users' },
    { name: 'Verifications', path: '/admin/verifications' },
    { name: 'Analytics', path: '/admin/analytics' },
    { name: 'Settings', path: '/admin/settings' },
  ];

  // Get role-specific navigation items
  const getRoleNavItems = () => {
    if (!user) return commonNavItems;
    switch (user.userType) {
      case 'farmer':
        return farmerNavItems;
      case 'consumer':
        return consumerNavItems;
      case 'admin':
        return adminNavItems;
      default:
        return commonNavItems;
    }
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            {/* Company Logo and Name - Always visible */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center">
              <FontAwesomeIcon icon={faLeaf} className="text-green-500 text-2xl mr-2 hover:text-green-600 transition duration-200" />
              <span className="ml-2 text-xl font-bold text-gray-900">AgriBridge</span>
              </Link>
            </div>

            {/* Navigation Links */}
            <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            {getRoleNavItems().map((item) => (
  <NavLink
    key={item.path}
    to={item.path}
    className={({ isActive }) =>
      `px-4 py-2 rounded-md font-medium transition duration-300 ${
        isActive
          ? 'bg-green-500 text-white'
          : 'text-gray-700 hover:text-green-600 hover:bg-green-100'
      }`
    }
  >
    {item.name}
  </NavLink>
))}

            </div>


          </div>

          {/* Right side of navbar */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700">
                  Welcome, {user.firstName}
                </span>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-primary-600 bg-white hover:bg-gray-50"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon when menu is closed */}
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Icon when menu is open */}
              <svg
                className="hidden h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="sm:hidden" id="mobile-menu">
        <div className="pt-2 pb-3 space-y-1">
          {getRoleNavItems().map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200">
          {isAuthenticated ? (
            <div className="flex items-center px-4">
              <div className="flex-shrink-0">
                <span className="text-sm text-gray-700">
                  Welcome, {user.firstName}
                </span>
              </div>
              <div className="ml-3">
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-1">
              <Link
                to="/login"
                className="block px-4 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block px-4 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
} 