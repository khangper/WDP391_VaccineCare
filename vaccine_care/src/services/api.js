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

export default api;