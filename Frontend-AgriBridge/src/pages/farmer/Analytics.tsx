import React from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { 
  CurrencyDollarIcon, 
  ShoppingCartIcon, 
  UserGroupIcon, 
  ChartBarIcon 
} from '@heroicons/react/24/outline';

interface SalesData {
  date: string;
  amount: number;
}

interface ProductPerformance {
  id: string;
  name: string;
  sales: number;
  revenue: number;
  growth: number;
}

const salesData: SalesData[] = [
  { date: '2024-01', amount: 1250 },
  { date: '2024-02', amount: 1875 },
  { date: '2024-03', amount: 2100 },
  { date: '2024-04', amount: 1950 },
  { date: '2024-05', amount: 2300 },
  { date: '2024-06', amount: 2800 },
];

const productPerformance: ProductPerformance[] = [
  { id: '1', name: 'Organic Tomatoes', sales: 125, revenue: 625, growth: 12 },
  { id: '2', name: 'Fresh Basil', sales: 85, revenue: 425, growth: 8 },
  { id: '3', name: 'Organic Carrots', sales: 210, revenue: 630, growth: 15 },
  { id: '4', name: 'Organic Potatoes', sales: 95, revenue: 475, growth: 5 },
  { id: '5', name: 'Fresh Lettuce', sales: 150, revenue: 450, growth: 10 },
];

const stats = [
  { name: 'Total Revenue', value: '$6,275', icon: CurrencyDollarIcon, change: '+12%', changeType: 'positive' },
  { name: 'Total Orders', value: '665', icon: ShoppingCartIcon, change: '+8%', changeType: 'positive' },
  { name: 'Total Customers', value: '245', icon: UserGroupIcon, change: '+15%', changeType: 'positive' },
  { name: 'Average Order Value', value: '$9.44', icon: ChartBarIcon, change: '+4%', changeType: 'positive' },
];

export default function FarmerAnalytics() {
  return (
    <DashboardLayout>
      <div className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">Analytics</h1>
          <p className="mt-2 text-sm text-gray-700">
            Track your sales performance and customer insights.
          </p>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((item) => (
              <div
                key={item.name}
                className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6"
              >
                <dt>
                  <div className="absolute rounded-md bg-green-500 p-3">
                    <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  <p className="ml-16 truncate text-sm font-medium text-gray-500">{item.name}</p>
                </dt>
                <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                  <p className="text-2xl font-semibold text-gray-900">{item.value}</p>
                  <p
                    className={`ml-2 flex items-baseline text-sm font-semibold ${
                      item.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {item.change}
                  </p>
                </dd>
              </div>
            ))}
          </div>

          {/* Sales Chart */}
          <div className="mt-8">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h2 className="text-lg font-medium leading-6 text-gray-900">Sales Overview</h2>
                <p className="mt-2 text-sm text-gray-700">
                  Monthly sales performance for the last 6 months.
                </p>
              </div>
            </div>
            <div className="mt-4 overflow-hidden rounded-lg bg-white shadow">
              <div className="p-6">
                <div className="h-80 w-full">
                  {/* This would be replaced with a real chart component */}
                  <div className="flex h-full items-end justify-between">
                    {salesData.map((data) => (
                      <div key={data.date} className="flex flex-col items-center">
                        <div 
                          className="w-12 bg-green-500 rounded-t"
                          style={{ height: `${(data.amount / 3000) * 100}%` }}
                        ></div>
                        <div className="mt-2 text-xs text-gray-500">{data.date}</div>
                        <div className="text-xs font-medium">${data.amount}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Performance */}
          <div className="mt-8">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h2 className="text-lg font-medium leading-6 text-gray-900">Product Performance</h2>
                <p className="mt-2 text-sm text-gray-700">
                  Top performing products by sales and revenue.
                </p>
              </div>
            </div>
            <div className="mt-4 flex flex-col">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                  <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                          >
                            Product
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Sales
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Revenue
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Growth
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {productPerformance.map((product) => (
                          <tr key={product.id}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                              {product.name}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {product.sales}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              ${product.revenue}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm">
                              <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                +{product.growth}%
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Insights */}
          <div className="mt-8">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h2 className="text-lg font-medium leading-6 text-gray-900">Customer Insights</h2>
                <p className="mt-2 text-sm text-gray-700">
                  Key metrics about your customer base.
                </p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <div className="overflow-hidden rounded-lg bg-white shadow">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <UserGroupIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="truncate text-sm font-medium text-gray-500">New Customers</dt>
                        <dd>
                          <div className="text-lg font-medium text-gray-900">32</div>
                          <div className="text-sm text-green-600">+12% from last month</div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
              <div className="overflow-hidden rounded-lg bg-white shadow">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <ShoppingCartIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="truncate text-sm font-medium text-gray-500">Repeat Customers</dt>
                        <dd>
                          <div className="text-lg font-medium text-gray-900">78%</div>
                          <div className="text-sm text-green-600">+5% from last month</div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
              <div className="overflow-hidden rounded-lg bg-white shadow">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <CurrencyDollarIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="truncate text-sm font-medium text-gray-500">Customer Lifetime Value</dt>
                        <dd>
                          <div className="text-lg font-medium text-gray-900">$245</div>
                          <div className="text-sm text-green-600">+8% from last month</div>
                        </dd>
                      </dl>
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