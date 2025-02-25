import axios from "axios";

const api = axios.create({
  baseURL: "https://vaccinecare.azurewebsites.net/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
