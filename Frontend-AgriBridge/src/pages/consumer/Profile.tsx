import React, { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { PhotoIcon } from '@heroicons/react/24/outline';

interface ConsumerProfile {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    avatar: string;
  };
  preferences: {
    notifications: boolean;
    newsletter: boolean;
    deliveryInstructions: string;
  };
  addresses: Array<{
    id: string;
    name: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    isDefault: boolean;
  }>;
}

const initialProfile: ConsumerProfile = {
  personalInfo: {
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    phone: '(555) 987-6543',
    avatar: '',
  },
  preferences: {
    notifications: true,
    newsletter: false,
    deliveryInstructions: 'Leave packages at the front door if not home.',
  },
  addresses: [
    {
      id: '1',
      name: 'Home',
      address: '123 Main Street',
      city: 'Anytown',
      state: 'CA',
      zipCode: '90210',
      isDefault: true,
    },
    {
      id: '2',
      name: 'Work',
      address: '456 Office Park',
      city: 'Anytown',
      state: 'CA',
      zipCode: '90211',
      isDefault: false,
    },
  ],
};

export default function ConsumerProfile() {
  const [profile, setProfile] = useState<ConsumerProfile>(initialProfile);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [newAddress, setNewAddress] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    isDefault: false,
  });
  const [isAddingAddress, setIsAddingAddress] = useState(false);

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [name]: value,
      },
    }));
  };

  const handlePreferenceChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setProfile((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
      },
    }));
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setAvatarFile(event.target.files[0]);
    }
  };

  const handleNewAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setNewAddress((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleAddAddress = () => {
    if (newAddress.name && newAddress.address) {
      const addressToAdd = {
        ...newAddress,
        id: Date.now().toString(),
      };
      
      setProfile((prev) => ({
        ...prev,
        addresses: [...prev.addresses, addressToAdd],
      }));
      
      setNewAddress({
        name: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        isDefault: false,
      });
      
      setIsAddingAddress(false);
    }
  };

  const handleRemoveAddress = (id: string) => {
    setProfile((prev) => ({
      ...prev,
      addresses: prev.addresses.filter((addr) => addr.id !== id),
    }));
  };

  const handleSetDefaultAddress = (id: string) => {
    setProfile((prev) => ({
      ...prev,
      addresses: prev.addresses.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      })),
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // TODO: Implement profile update logic
    console.log('Updating profile:', profile);
    if (avatarFile) {
      console.log('Uploading avatar:', avatarFile);
    }
  };

  return (
    <DashboardLayout>
      <div className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">Consumer Profile</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage your personal information and preferences.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-8">
            {/* Personal Information Section */}
            <div className="bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h2 className="text-lg font-medium leading-6 text-gray-900">
                  Personal Information
                </h2>
                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      First name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        value={profile.personalInfo.firstName}
                        onChange={handlePersonalInfoChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Last name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        value={profile.personalInfo.lastName}
                        onChange={handlePersonalInfoChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email address
                    </label>
                    <div className="mt-1">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={profile.personalInfo.email}
                        onChange={handlePersonalInfoChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Phone number
                    </label>
                    <div className="mt-1">
                      <input
                        type="tel"
                        name="phone"
                        id="phone"
                        value={profile.personalInfo.phone}
                        onChange={handlePersonalInfoChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-6">
                    <label
                      htmlFor="avatar"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Profile Photo
                    </label>
                    <div className="mt-1 flex items-center">
                      <div className="h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                        {profile.personalInfo.avatar ? (
                          <img
                            src={profile.personalInfo.avatar}
                            alt="Profile"
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <PhotoIcon className="h-full w-full text-gray-300" />
                        )}
                      </div>
                      <input
                        type="file"
                        id="avatar"
                        name="avatar"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        className="ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Preferences Section */}
            <div className="bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h2 className="text-lg font-medium leading-6 text-gray-900">
                  Preferences
                </h2>
                <div className="mt-6 space-y-6">
                  <div className="flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id="notifications"
                        name="notifications"
                        type="checkbox"
                        checked={profile.preferences.notifications}
                        onChange={handlePreferenceChange}
                        className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="notifications" className="font-medium text-gray-700">
                        Email Notifications
                      </label>
                      <p className="text-gray-500">Receive email notifications about your orders and account activity.</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id="newsletter"
                        name="newsletter"
                        type="checkbox"
                        checked={profile.preferences.newsletter}
                        onChange={handlePreferenceChange}
                        className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="newsletter" className="font-medium text-gray-700">
                        Newsletter
                      </label>
                      <p className="text-gray-500">Subscribe to our newsletter for updates and promotions.</p>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="deliveryInstructions"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Delivery Instructions
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="deliveryInstructions"
                        name="deliveryInstructions"
                        rows={3}
                        value={profile.preferences.deliveryInstructions}
                        onChange={handlePreferenceChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                        placeholder="Special instructions for delivery"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Addresses Section */}
            <div className="bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="sm:flex sm:items-center">
                  <div className="sm:flex-auto">
                    <h2 className="text-lg font-medium leading-6 text-gray-900">
                      Delivery Addresses
                    </h2>
                    <p className="mt-2 text-sm text-gray-700">
                      Manage your delivery addresses for orders.
                    </p>
                  </div>
                  <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                    <button
                      type="button"
                      onClick={() => setIsAddingAddress(true)}
                      className="inline-flex items-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    >
                      Add Address
                    </button>
                  </div>
                </div>

                {/* Add New Address Form */}
                {isAddingAddress && (
                  <div className="mt-6 border-t border-gray-200 pt-6">
                    <h3 className="text-base font-medium text-gray-900">Add New Address</h3>
                    <div className="mt-4 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                      <div className="sm:col-span-4">
                        <label
                          htmlFor="addressName"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Address Name
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="name"
                            id="addressName"
                            value={newAddress.name}
                            onChange={handleNewAddressChange}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                            placeholder="e.g., Home, Work"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-6">
                        <label
                          htmlFor="streetAddress"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Street Address
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="address"
                            id="streetAddress"
                            value={newAddress.address}
                            onChange={handleNewAddressChange}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label
                          htmlFor="city"
                          className="block text-sm font-medium text-gray-700"
                        >
                          City
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="city"
                            id="city"
                            value={newAddress.city}
                            onChange={handleNewAddressChange}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label
                          htmlFor="state"
                          className="block text-sm font-medium text-gray-700"
                        >
                          State
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="state"
                            id="state"
                            value={newAddress.state}
                            onChange={handleNewAddressChange}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label
                          htmlFor="zipCode"
                          className="block text-sm font-medium text-gray-700"
                        >
                          ZIP code
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="zipCode"
                            id="zipCode"
                            value={newAddress.zipCode}
                            onChange={handleNewAddressChange}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-6">
                        <div className="flex items-center">
                          <input
                            id="isDefault"
                            name="isDefault"
                            type="checkbox"
                            checked={newAddress.isDefault}
                            onChange={handleNewAddressChange}
                            className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                          />
                          <label htmlFor="isDefault" className="ml-2 block text-sm text-gray-900">
                            Set as default address
                          </label>
                        </div>
                      </div>

                      <div className="sm:col-span-6 flex justify-end space-x-3">
                        <button
                          type="button"
                          onClick={() => setIsAddingAddress(false)}
                          className="inline-flex justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={handleAddAddress}
                          className="inline-flex justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                        >
                          Save Address
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Address List */}
                <div className="mt-6">
                  <ul className="divide-y divide-gray-200">
                    {profile.addresses.map((address) => (
                      <li key={address.id} className="py-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {address.name}
                              {address.isDefault && (
                                <span className="ml-2 inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                  Default
                                </span>
                              )}
                            </p>
                            <p className="mt-1 text-sm text-gray-500">
                              {address.address}, {address.city}, {address.state} {address.zipCode}
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            {!address.isDefault && (
                              <button
                                type="button"
                                onClick={() => handleSetDefaultAddress(address.id)}
                                className="text-sm text-green-600 hover:text-green-900"
                              >
                                Set as default
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => handleRemoveAddress(address.id)}
                              className="text-sm text-red-600 hover:text-red-900"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}