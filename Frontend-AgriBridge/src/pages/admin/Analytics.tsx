import React, { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { 
  UsersIcon,
  ShoppingBagIcon,
  CurrencyDollarIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

interface Stat {
  name: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease';
}

interface SalesData {
  date: string;
  amount: number;
}

interface UserGrowth {
  date: string;
  farmers: number;
  consumers: number;
}

const stats: Stat[] = [
  {
    name: 'Total Users',
    value: '2,543',
    change: '12%',
    changeType: 'increase'
  },
  {
    name: 'Total Orders',
    value: '1,234',
    change: '8%',
    changeType: 'increase'
  },
  {
    name: 'Revenue',
    value: '$45,678',
    change: '15%',
    changeType: 'increase'
  },
  {
    name: 'Active Farmers',
    value: '156',
    change: '5%',
    changeType: 'increase'
  }
];

const salesData: SalesData[] = [
  { date: '2024-01', amount: 12000 },
  { date: '2024-02', amount: 15000 },
  { date: '2024-03', amount: 18000 },
  { date: '2024-04', amount: 22000 },
  { date: '2024-05', amount: 25000 },
  { date: '2024-06', amount: 30000 }
];

const userGrowth: UserGrowth[] = [
  { date: '2024-01', farmers: 100, consumers: 500 },
  { date: '2024-02', farmers: 120, consumers: 600 },
  { date: '2024-03', farmers: 150, consumers: 800 },
  { date: '2024-04', farmers: 180, consumers: 1000 },
  { date: '2024-05', farmers: 200, consumers: 1200 },
  { date: '2024-06', farmers: 250, consumers: 1500 }
];

const categoryDistribution = [
  { category: 'Vegetables', percentage: 35 },
  { category: 'Fruits', percentage: 25 },
  { category: 'Dairy', percentage: 15 },
  { category: 'Meat', percentage: 10 },
  { category: 'Other', percentage: 15 }
];

export default function AdminAnalytics() {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');

  return (
    <DashboardLayout>
      <div className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-2xl font-semibold text-gray-900">Analytics</h1>
              <p className="mt-2 text-sm text-gray-700">
                Platform statistics and performance metrics.
              </p>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
              <select
                id="time-range"
                name="time-range"
                className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value as 'week' | 'month' | 'year')}
              >
                <option value="week">Last 7 days</option>
                <option value="month">Last 30 days</option>
                <option value="year">Last 12 months</option>
              </select>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.name}
                className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6"
              >
                <dt>
                  <div className="absolute rounded-md bg-green-500 p-3">
                    <UsersIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  <p className="ml-16 truncate text-sm font-medium text-gray-500">{stat.name}</p>
                </dt>
                <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                  <p
                    className={`ml-2 flex items-baseline text-sm font-semibold ${
                      stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {stat.change}
                  </p>
                </dd>
              </div>
            ))}
          </div>

          {/* Charts */}
          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Sales Chart */}
            <div className="rounded-lg bg-white p-6 shadow">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Sales Overview</h3>
              <div className="mt-4 h-64">
                {/* This would be replaced with a real chart component */}
                <div className="flex h-full items-end justify-between space-x-2">
                  {salesData.map((data) => (
                    <div key={data.date} className="flex flex-col items-center">
                      <div
                        className="w-8 bg-green-500 rounded-t"
                        style={{ height: `${(data.amount / 30000) * 100}%` }}
                      />
                      <span className="mt-2 text-xs text-gray-500">{data.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* User Growth Chart */}
            <div className="rounded-lg bg-white p-6 shadow">
              <h3 className="text-lg font-medium leading-6 text-gray-900">User Growth</h3>
              <div className="mt-4 h-64">
                {/* This would be replaced with a real chart component */}
                <div className="flex h-full items-end justify-between space-x-2">
                  {userGrowth.map((data) => (
                    <div key={data.date} className="flex flex-col items-center">
                      <div className="flex space-x-1">
                        <div
                          className="w-4 bg-blue-500 rounded-t"
                          style={{ height: `${(data.farmers / 300) * 100}%` }}
                        />
                        <div
                          className="w-4 bg-purple-500 rounded-t"
                          style={{ height: `${(data.consumers / 2000) * 100}%` }}
                        />
                      </div>
                      <span className="mt-2 text-xs text-gray-500">{data.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Category Distribution */}
            <div className="rounded-lg bg-white p-6 shadow">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Category Distribution</h3>
              <div className="mt-4">
                <div className="space-y-4">
                  {categoryDistribution.map((category) => (
                    <div key={category.category}>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-900">{category.category}</span>
                        <span className="text-sm text-gray-500">{category.percentage}%</span>
                      </div>
                      <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-gray-200">
                        <div
                          className="h-full bg-green-500"
                          style={{ width: `${category.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="rounded-lg bg-white p-6 shadow">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Recent Activity</h3>
              <div className="mt-4 flow-root">
                <ul className="-mb-8">
                  <li className="relative pb-8">
                    <div className="relative flex space-x-3">
                      <div>
                        <span className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center ring-8 ring-white">
                          <UsersIcon className="h-5 w-5 text-white" aria-hidden="true" />
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div>
                          <div className="text-sm">
                            <span className="font-medium text-gray-900">New Farmer Registration</span>
                            <span className="text-gray-500"> - John Smith</span>
                          </div>
                          <p className="mt-0.5 text-sm text-gray-500">2 hours ago</p>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="relative pb-8">
                    <div className="relative flex space-x-3">
                      <div>
                        <span className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center ring-8 ring-white">
                          <ShoppingBagIcon className="h-5 w-5 text-white" aria-hidden="true" />
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div>
                          <div className="text-sm">
                            <span className="font-medium text-gray-900">Large Order Completed</span>
                            <span className="text-gray-500"> - Order #1234</span>
                          </div>
                          <p className="mt-0.5 text-sm text-gray-500">4 hours ago</p>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="relative">
                    <div className="relative flex space-x-3">
                      <div>
                        <span className="h-8 w-8 rounded-full bg-purple-500 flex items-center justify-center ring-8 ring-white">
                          <ChartBarIcon className="h-5 w-5 text-white" aria-hidden="true" />
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div>
                          <div className="text-sm">
                            <span className="font-medium text-gray-900">Monthly Sales Target Achieved</span>
                          </div>
                          <p className="mt-0.5 text-sm text-gray-500">1 day ago</p>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 