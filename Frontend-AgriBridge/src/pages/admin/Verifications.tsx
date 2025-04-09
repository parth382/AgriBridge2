import React, { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { 
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
  CheckCircleIcon,
  XCircleIcon,
  EyeIcon
} from '@heroicons/react/24/outline';

interface Verification {
  id: string;
  farmerId: string;
  farmerName: string;
  documentType: 'certification' | 'license' | 'identity';
  documentName: string;
  submittedDate: string;
  status: 'pending' | 'approved' | 'rejected';
  documentUrl: string;
}

const verifications: Verification[] = [
  {
    id: '1',
    farmerId: 'f1',
    farmerName: 'John Smith',
    documentType: 'certification',
    documentName: 'Organic Certification',
    submittedDate: '2024-03-15',
    status: 'pending',
    documentUrl: 'https://example.com/doc1.pdf'
  },
  {
    id: '2',
    farmerId: 'f2',
    farmerName: 'Michael Brown',
    documentType: 'license',
    documentName: 'Business License',
    submittedDate: '2024-03-14',
    status: 'approved',
    documentUrl: 'https://example.com/doc2.pdf'
  },
  {
    id: '3',
    farmerId: 'f3',
    farmerName: 'Sarah Wilson',
    documentType: 'identity',
    documentName: 'Government ID',
    submittedDate: '2024-03-13',
    status: 'rejected',
    documentUrl: 'https://example.com/doc3.pdf'
  },
  {
    id: '4',
    farmerId: 'f4',
    farmerName: 'David Lee',
    documentType: 'certification',
    documentName: 'Food Safety Certification',
    submittedDate: '2024-03-12',
    status: 'pending',
    documentUrl: 'https://example.com/doc4.pdf'
  }
];

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  approved: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800'
};

const documentTypeColors = {
  certification: 'bg-blue-100 text-blue-800',
  license: 'bg-purple-100 text-purple-800',
  identity: 'bg-gray-100 text-gray-800'
};

export default function AdminVerifications() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<keyof Verification>('submittedDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [selectedVerification, setSelectedVerification] = useState<Verification | null>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSort = (field: keyof Verification) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleViewDocument = (verification: Verification) => {
    setSelectedVerification(verification);
    // In a real application, this would open a modal or navigate to a document viewer
    console.log('Viewing document:', verification.documentUrl);
  };

  const handleApprove = (verificationId: string) => {
    // This would be connected to an API call
    console.log('Approving verification:', verificationId);
  };

  const handleReject = (verificationId: string) => {
    // This would be connected to an API call
    console.log('Rejecting verification:', verificationId);
  };

  const filteredVerifications = verifications
    .filter(verification => 
      verification.farmerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      verification.documentName.toLowerCase().includes(searchQuery.toLowerCase())
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
              <h1 className="text-2xl font-semibold text-gray-900">Verifications</h1>
              <p className="mt-2 text-sm text-gray-700">
                Review and manage farmer verification documents.
              </p>
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
                placeholder="Search verifications..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
          </div>

          {/* Verifications Table */}
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
                            onClick={() => handleSort('farmerName')}
                          >
                            Farmer
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
                            onClick={() => handleSort('documentType')}
                          >
                            Document Type
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
                            onClick={() => handleSort('documentName')}
                          >
                            Document Name
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
                            onClick={() => handleSort('submittedDate')}
                          >
                            Submitted Date
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
                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {filteredVerifications.map((verification) => (
                        <tr key={verification.id}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            {verification.farmerName}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${documentTypeColors[verification.documentType]}`}>
                              {verification.documentType}
                            </span>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {verification.documentName}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {new Date(verification.submittedDate).toLocaleDateString()}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${statusColors[verification.status]}`}>
                              {verification.status}
                            </span>
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <button
                              type="button"
                              className="text-gray-600 hover:text-gray-900 mr-4"
                              onClick={() => handleViewDocument(verification)}
                            >
                              <EyeIcon className="h-5 w-5" aria-hidden="true" />
                            </button>
                            {verification.status === 'pending' && (
                              <>
                                <button
                                  type="button"
                                  className="text-green-600 hover:text-green-900 mr-4"
                                  onClick={() => handleApprove(verification.id)}
                                >
                                  <CheckCircleIcon className="h-5 w-5" aria-hidden="true" />
                                </button>
                                <button
                                  type="button"
                                  className="text-red-600 hover:text-red-900"
                                  onClick={() => handleReject(verification.id)}
                                >
                                  <XCircleIcon className="h-5 w-5" aria-hidden="true" />
                                </button>
                              </>
                            )}
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
          {filteredVerifications.length === 0 && (
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
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No verifications found</h3>
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