import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { 
  HomeIcon,
  UserCircleIcon,
  ShoppingBagIcon,
  DocumentCheckIcon,
  ChartBarIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';

const farmerNavigation = [
  { name: 'Dashboard', href: '/farmer/dashboard', icon: HomeIcon },
  { name: 'Products', href: '/farmer/products', icon: ShoppingBagIcon },
  { name: 'Orders', href: '/farmer/orders', icon: ShoppingBagIcon },
  { name: 'Certifications', href: '/farmer/certifications', icon: DocumentCheckIcon },
  { name: 'Analytics', href: '/farmer/analytics', icon: ChartBarIcon },
  { name: 'Profile', href: '/farmer/profile', icon: UserCircleIcon },
];

const consumerNavigation = [
  { name: 'Dashboard', href: '/consumer/dashboard', icon: HomeIcon },
  { name: 'Browse Products', href: '/consumer/products', icon: ShoppingBagIcon },
  { name: 'My Orders', href: '/consumer/orders', icon: ShoppingBagIcon },
  { name: 'Favorite Farmers', href: '/consumer/favorites', icon: UserCircleIcon },
  { name: 'Profile', href: '/consumer/profile', icon: UserCircleIcon },
];

const adminNavigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: HomeIcon },
  { name: 'Users', href: '/admin/users', icon: UserCircleIcon },
  { name: 'Verifications', href: '/admin/verifications', icon: DocumentCheckIcon },
  { name: 'Analytics', href: '/admin/analytics', icon: ChartBarIcon },
  { name: 'Settings', href: '/admin/settings', icon: Cog6ToothIcon },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const location = useLocation();
  const user = useSelector((state: any) => state.auth.user);

  const getNavigation = () => {
    switch (user?.role) {
      case 'farmer':
        return farmerNavigation;
      case 'consumer':
        return consumerNavigation;
      case 'admin':
        return adminNavigation;
      default:
        return [];
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Role-based Navigation */}
      <nav className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16">
            <div className="flex flex-1 space-x-8">
              {getNavigation().map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                      isActive
                        ? 'border-b-2 border-primary-500 text-gray-900'
                        : 'border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`}
                  >
                    <item.icon
                      className={`mr-2 h-5 w-5 ${
                        isActive ? 'text-primary-500' : 'text-gray-400'
                      }`}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
} 