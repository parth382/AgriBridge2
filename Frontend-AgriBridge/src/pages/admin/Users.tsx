import React, { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { 
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
  PencilIcon,
  TrashIcon,
  UserPlusIcon
} from '@heroicons/react/24/outline';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'farmer' | 'consumer' | 'admin';
  status: 'active' | 'inactive' | 'pending';
  joinedDate: string;
  lastLogin: string;
}

const users: User[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    role: 'farmer',
    status: 'active',
    joinedDate: '2024-01-15',
    lastLogin: '2024-03-20'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    role: 'consumer',
    status: 'active',
    joinedDate: '2024-02-01',
    lastLogin: '2024-03-19'
  },
  {
    id: '3',
    name: 'Michael Brown',
    email: 'michael.b@example.com',
    role: 'farmer',
    status: 'pending',
    joinedDate: '2024-03-10',
    lastLogin: '2024-03-10'
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily.d@example.com',
    role: 'consumer',
    status: 'inactive',
    joinedDate: '2024-01-20',
    lastLogin: '2024-02-15'
  },
  {
    id: '5',
    name: 'David Wilson',
    email: 'david.w@example.com',
    role: 'admin',
    status: 'active',
    joinedDate: '2024-01-01',
    lastLogin: '2024-03-20'
  }
];

const statusColors = {
  active: 'bg-green-100 text-green-800',
  inactive: 'bg-gray-100 text-gray-800',
  pending: 'bg-yellow-100 text-yellow-800'
};

const roleColors = {
  farmer: 'bg-blue-100 text-blue-800',
  consumer: 'bg-purple-100 text-purple-800',
  admin: 'bg-red-100 text-red-800'
};

export default function AdminUsers() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<keyof User>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSort = (field: keyof User) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredUsers = users
    .filter(user => 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      const direction = sortDirection === 'asc' ? 1 : -1;
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return aValue.localeCompare(bValue) * direction;
      }
      return 0;
    });

  return (
    <DashboardLayout>
      <div className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-2xl font-semibold text-gray-900">Users</h1>
              <p className="mt-2 text-sm text-gray-700">
                A list of all users in the system including their name, email, role, and status.
              </p>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:w-auto"
              >
                <UserPlusIcon className="mr-2 h-5 w-5" aria-hidden="true" />
                Add User
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="mt-4">
            <div className="relative rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="text"
                name="search"
                id="search"
                className="block w-full rounded-md border-gray-300 pl-10 focus:border-green-500 focus:ring-green-500 sm:text-sm"
                placeholder="Search users..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
          </div>

          {/* Users Table */}
          <div className="mt-8 flex flex-col">
            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                        >
                          <button
                            type="button"
                            className="group inline-flex"
                            onClick={() => handleSort('name')}
                          >
                            Name
                            <span className="ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">
                              <ChevronUpDownIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                          </button>
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          <button
                            type="button"
                            className="group inline-flex"
                            onClick={() => handleSort('email')}
                          >
                            Email
                            <span className="ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">
                              <ChevronUpDownIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                          </button>
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          <button
                            type="button"
                            className="group inline-flex"
                            onClick={() => handleSort('role')}
                          >
                            Role
                            <span className="ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">
                              <ChevronUpDownIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                          </button>
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          <button
                            type="button"
                            className="group inline-flex"
                            onClick={() => handleSort('status')}
                          >
                            Status
                            <span className="ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">
                              <ChevronUpDownIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                          </button>
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          <button
                            type="button"
                            className="group inline-flex"
                            onClick={() => handleSort('joinedDate')}
                          >
                            Joined Date
                            <span className="ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">
                              <ChevronUpDownIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                          </button>
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          <button
                            type="button"
                            className="group inline-flex"
                            onClick={() => handleSort('lastLogin')}
                          >
                            Last Login
                            <span className="ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">
                              <ChevronUpDownIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                          </button>
                        </th>
                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {filteredUsers.map((user) => (
                        <tr key={user.id}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            {user.name}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {user.email}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${roleColors[user.role]}`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${statusColors[user.status]}`}>
                              {user.status}
                            </span>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {new Date(user.joinedDate).toLocaleDateString()}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {new Date(user.lastLogin).toLocaleDateString()}
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <button
                              type="button"
                              className="text-green-600 hover:text-green-900 mr-4"
                            >
                              <PencilIcon className="h-5 w-5" aria-hidden="true" />
                            </button>
                            <button
                              type="button"
                              className="text-red-600 hover:text-red-900"
                            >
                              <TrashIcon className="h-5 w-5" aria-hidden="true" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Empty State */}
          {filteredUsers.length === 0 && (
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
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No users found</h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your search to find what you're looking for.
              </p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
} 