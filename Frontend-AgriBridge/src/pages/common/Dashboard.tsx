import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

export default function Dashboard() {
  const { user } = useSelector((state: RootState) => state.auth);

  const renderConsumerDashboard = () => (
    <div className="space-y-6">
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Recent Orders</h3>
          <div className="mt-5">
            <div className="rounded-md bg-gray-50 p-4">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm text-gray-700">No recent orders</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Favorite Products</h3>
          <div className="mt-5">
            <div className="rounded-md bg-gray-50 p-4">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm text-gray-700">No favorite products yet</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFarmerDashboard = () => (
    <div className="space-y-6">
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Product Inventory</h3>
          <div className="mt-5">
            <div className="rounded-md bg-gray-50 p-4">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm text-gray-700">No products listed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Recent Sales</h3>
          <div className="mt-5">
            <div className="rounded-md bg-gray-50 p-4">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm text-gray-700">No recent sales</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAdminDashboard = () => (
    <div className="space-y-6">
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">User Management</h3>
          <div className="mt-5">
            <div className="rounded-md bg-gray-50 p-4">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm text-gray-700">No pending approvals</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Platform Statistics</h3>
          <div className="mt-5">
            <div className="rounded-md bg-gray-50 p-4">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm text-gray-700">Loading statistics...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="py-10">
      <header>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">Dashboard</h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          {user?.role === 'consumer' && renderConsumerDashboard()}
          {user?.role === 'farmer' && renderFarmerDashboard()}
          {user?.role === 'admin' && renderAdminDashboard()}
        </div>
      </main>
    </div>
  );
} 