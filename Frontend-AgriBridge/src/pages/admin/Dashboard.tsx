import React from 'react';
import { Link } from 'react-router-dom';
import { 
  UsersIcon, 
  DocumentCheckIcon, 
  ChartBarIcon, 
  ExclamationTriangleIcon 
} from '@heroicons/react/24/outline';
import DashboardLayout from '../../components/layout/DashboardLayout';

const stats = [
  { name: 'Total Users', value: '0', icon: UsersIcon },
  { name: 'Pending Verifications', value: '0', icon: DocumentCheckIcon },
  { name: 'Active Listings', value: '0', icon: ChartBarIcon },
  { name: 'Reported Issues', value: '0', icon: ExclamationTriangleIcon },
];

const quickActions = [
  {
    name: 'User Management',
    description: 'Manage user accounts and permissions',
    href: '/admin/users',
    icon: UsersIcon,
  },
  {
    name: 'Verification Requests',
    description: 'Review and process farmer verifications',
    href: '/admin/verifications',
    icon: DocumentCheckIcon,
  },
  {
    name: 'System Analytics',
    description: 'View platform statistics and reports',
    href: '/admin/analytics',
    icon: ChartBarIcon,
  },
];

export default function AdminDashboard() {
  return (
    <DashboardLayout>
      <div className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">Admin Dashboard</h1>
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          {/* Welcome Message */}
          <div className="mt-8">
            <div className="rounded-lg bg-white shadow">
              <div className="p-6">
                <h2 className="text-base font-semibold leading-6 text-gray-900">System Overview</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Monitor and manage the platform's operations, users, and content.
                </p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-8">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((item) => (
                <div key={item.name} className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <item.icon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="truncate text-sm font-medium text-gray-500">{item.name}</dt>
                        <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{item.value}</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8">
            <h2 className="text-base font-semibold leading-6 text-gray-900">Quick Actions</h2>
            <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {quickActions.map((action) => (
                <Link
                  key={action.name}
                  to={action.href}
                  className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm hover:border-gray-400"
                >
                  <div className="flex-shrink-0">
                    <action.icon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="absolute inset-0" aria-hidden="true" />
                    <p className="text-sm font-medium text-gray-900">{action.name}</p>
                    <p className="truncate text-sm text-gray-500">{action.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Pending Verifications */}
          <div className="mt-8">
            <div className="rounded-lg bg-white shadow">
              <div className="p-6">
                <h2 className="text-base font-semibold leading-6 text-gray-900">Pending Verifications</h2>
                <div className="mt-6">
                  <div className="rounded-md bg-gray-50 p-4">
                    <div className="flex">
                      <div className="ml-3">
                        <p className="text-sm text-gray-700">No pending verifications</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Reported Issues */}
          <div className="mt-8">
            <div className="rounded-lg bg-white shadow">
              <div className="p-6">
                <h2 className="text-base font-semibold leading-6 text-gray-900">Reported Issues</h2>
                <div className="mt-6">
                  <div className="rounded-md bg-gray-50 p-4">
                    <div className="flex">
                      <div className="ml-3">
                        <p className="text-sm text-gray-700">No reported issues</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 