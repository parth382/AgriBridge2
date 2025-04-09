import axios from 'axios';
import { User } from '../store/slices/authSlice';

const API_URL = 'http://localhost:3001/api';

const adminApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to add auth token
adminApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

interface CreateAdminData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export const createAdmin = async (adminData: CreateAdminData): Promise<User> => {
  try {
    const response = await adminApi.post<User>('/admin/users', adminData);
    return response.data;
  } catch (error) {
    console.error('Create admin error:', error);
    throw error;
  }
};

export const getAdmins = async (): Promise<User[]> => {
  try {
    const response = await adminApi.get<User[]>('/admin/users');
    return response.data;
  } catch (error) {
    console.error('Get admins error:', error);
    throw error;
  }
};

export const deleteAdmin = async (adminId: string): Promise<void> => {
  try {
    await adminApi.delete(`/admin/users/${adminId}`);
  } catch (error) {
    console.error('Delete admin error:', error);
    throw error;
  }
}; 