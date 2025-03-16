import axios from "axios";

const API_BASE_URL = 'https://vaccinecare.azurewebsites.net/api';

// Create an axios instance with the base URL
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// API endpoints
export const endpoints = {
  // Child endpoints
  getChildren: '/Child/get-all',
  
  // Appointment endpoints
  getTodayAppointments: '/Appointment/get-appointment-today',
  
  // Vaccine endpoints
  getVaccines: '/Vaccine/get-all',
  
  // User endpoints
  getUsers: '/User/get-all',
  
  // Payment endpoints
  getPayments: '/Payment/get-all',
};

// API service functions
export const apiService = {
  // Generic GET request
  get: async (endpoint, params = {}) => {
    try {
      const response = await apiClient.get(endpoint, { params });
      return response.data;
    } catch (error) {
      console.error(`Error fetching data from ${endpoint}:`, error);
      throw error;
    }
  },
  
  // Generic POST request
  post: async (endpoint, data = {}) => {
    try {
      const response = await apiClient.post(endpoint, data);
      return response.data;
    } catch (error) {
      console.error(`Error posting data to ${endpoint}:`, error);
      throw error;
    }
  },
  
  // Generic PUT request
  put: async (endpoint, data = {}) => {
    try {
      const response = await apiClient.put(endpoint, data);
      return response.data;
    } catch (error) {
      console.error(`Error updating data at ${endpoint}:`, error);
      throw error;
    }
  },
  
  // Generic DELETE request
  delete: async (endpoint) => {
    try {
      const response = await apiClient.delete(endpoint);
      return response.data;
    } catch (error) {
      console.error(`Error deleting data at ${endpoint}:`, error);
      throw error;
    }
  },
};

export default apiService;
