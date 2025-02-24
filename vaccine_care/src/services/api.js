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

// Disease APIs
export const diseaseApi = {
  getAllDiseases: () => api.get('/Disease/get-all'),
};

// Vaccine APIs
export const vaccineApi = {
  getAllVaccines: () => api.get('/Vaccine/get-all'),
};

export default api;