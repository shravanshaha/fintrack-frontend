import axios from "axios";

const api = axios.create({
  baseURL: "https://fintrack-backend-c16m.onrender.com",
  withCredentials: true
});

export default api;