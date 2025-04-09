import React, { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { 
  CheckCircleIcon, 
  ClockIcon, 
  TruckIcon, 
  XCircleIcon 
} from '@heroicons/react/24/outline';

interface Order {
  id: string;
  date: string;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
    farmer: string;
  }>;
}

const orders: Order[] = [
  {
    id: 'ORD-1234',
    date: '2024-02-20',
    total: 125.50,
    status: 'delivered',
    items: [
      { id: '1', name: 'Organic Tomatoes', quantity: 2, price: 12.50, farmer: 'Green Valley Farms' },
      { id: '2', name: 'Fresh Basil', quantity: 1, price: 5.00, farmer: 'Green Valley Farms' },
      { id: '3', name: 'Organic Carrots', quantity: 3, price: 9.00, farmer: 'Sunny Acres' },
    ]
  },
  {
    id: 'ORD-1235',
    date: '2024-02-18',
    total: 75.25,
    status: 'shipped',
    items: [
      { id: '4', name: 'Organic Apples', quantity: 5, price: 15.25, farmer: 'Apple Orchard' },
      { id: '5', name: 'Fresh Lettuce', quantity: 2, price: 8.00, farmer: 'Green Valley Farms' },
    ]
  },
  {
    id: 'ORD-1236',
    date: '2024-02-15',
    total: 210.00,
    status: 'processing',
    items: [
      { id: '6', name: 'Organic Potatoes', quantity: 10, price: 25.00, farmer: 'Root Cellar Farm' },
      { id: '7', name: 'Fresh Eggs', quantity: 2, price: 12.00, farmer: 'Happy Hen Farm' },
      { id: '8', name: 'Organic Milk', quantity: 3, price: 15.00, farmer: 'Dairy Delight' },
    ]
  },
  {
    id: 'ORD-1237',
    date: '2024-02-10',
    total: 95.75,
    status: 'cancelled',
    items: [
      { id: '9', name: 'Organic Strawberries', quantity: 3, price: 18.75, farmer: 'Berry Patch' },
      { id: '10', name: 'Fresh Spinach', quantity: 2, price: 7.00, farmer: 'Green Valley Farms' },
    ]
  }
];

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  processing: 'bg-blue-100 text-blue-800',
  shipped: 'bg-green-100 text-green-800',
  delivered: 'bg-gray-100 text-gray-800',
  cancelled: 'bg-red-100 text-red-800',
};

const statusIcons = {
  pending: ClockIcon,
  processing: ClockIcon,
  shipped: TruckIcon,
  delivered: CheckCircleIcon,
  cancelled: XCircleIcon,
};

export default function ConsumerOrders() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  return (
    <DashboardLayout>
      <div className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-2xl font-semibold text-gray-900">My Orders</h1>
              <p className="mt-2 text-sm text-gray-700">
                A list of all your orders including their status and details.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col">
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
                          Order ID
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Date
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Items
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Total
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                        >
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {orders.map((order) => {
                        const StatusIcon = statusIcons[order.status];
                        return (
                          <tr key={order.id}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                              {order.id}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {order.date}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {order.items.length}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              ${order.total.toFixed(2)}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm">
                              <div className="flex items-center">
                                <StatusIcon className="mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                                <span
                                  className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                                    statusColors[order.status]
                                  }`}
                                >
                                  {order.status}
                                </span>
                              </div>
                            </td>
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                              <button
                                type="button"
                                onClick={() => handleViewOrder(order)}
                                className="text-green-600 hover:text-green-900"
                              >
                                View details
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Empty State */}
          {orders.length === 0 && (
            <div className="mt-8 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No orders</h3>
              <p className="mt-1 text-sm text-gray-500">
                You haven't placed any orders yet.
              </p>
              <div className="mt-6">
                <button
                  type="button"
                  className="inline-flex items-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  Browse Products
                </button>
              </div>
            </div>
          )}

          {/* Order Details Modal */}
          {isModalOpen && selectedOrder && (
            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                  <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>

                <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">&#8203;</span>

                <div className="inline-block transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">
                  <div>
                    <div className="mt-3 text-center sm:mt-5">
                      <h3 className="text-lg font-medium leading-6 text-gray-900">
                        Order Details - {selectedOrder.id}
                      </h3>
                      <div className="mt-2">
                        <div className="flex justify-between text-sm text-gray-500">
                          <span>Date:</span>
                          <span>{selectedOrder.date}</span>
                        </div>
                        <div className="mt-1 flex justify-between text-sm text-gray-500">
                          <span>Status:</span>
                          <span className={`font-medium ${statusColors[selectedOrder.status]}`}>
                            {selectedOrder.status}
                          </span>
                        </div>
                        <div className="mt-1 flex justify-between text-sm text-gray-500">
                          <span>Total:</span>
                          <span className="font-medium">${selectedOrder.total.toFixed(2)}</span>
                        </div>
                      </div>
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-900">Items</h4>
                        <ul className="mt-2 divide-y divide-gray-200">
                          {selectedOrder.items.map((item) => (
                            <li key={item.id} className="py-3">
                              <div className="flex justify-between">
                                <div>
                                  <p className="text-sm font-medium text-gray-900">{item.name}</p>
                                  <p className="text-sm text-gray-500">From: {item.farmer}</p>
                                </div>
                                <div className="text-right">
                                  <p className="text-sm font-medium text-gray-900">
                                    ${(item.price * item.quantity).toFixed(2)}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    {item.quantity} x ${item.price.toFixed(2)}
                                  </p>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:text-sm"
                      onClick={handleCloseModal}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
} 