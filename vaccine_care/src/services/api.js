import axios from "axios";

const api = axios.create({
  baseURL: "https://vaccinecare.azurewebsites.net/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Child APIs
export const childApi = {
  getAllChildren: () => api.get('/Child/get-all'),
};

// User APIs
export const userApi = {
  createStaff: (data) => api.post('/User/create-staff', { ...data, role: "Staff" }),
  createDoctor: (data) => api.post('/User/create-doctor', { ...data, role: "Doctor" }),
};

// Disease APIs
export const diseaseApi = {
  getAllDiseases: () => api.get('/Disease/get-all'),
};

// Vaccine APIs
export const vaccineApi = {
  getAllVaccines: () => api.get('/Vaccine/get-all'),
};

export default api;