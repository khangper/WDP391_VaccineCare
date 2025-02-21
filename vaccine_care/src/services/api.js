import axios from "axios";

const api = axios.create({
  baseURL: "https://vaccinecare.azurewebsites.net/api", // Thay đổi API URL
  timeout: 10000, // Timeout sau 10 giây
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
