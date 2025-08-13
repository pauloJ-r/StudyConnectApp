// src/services/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://study-connect-app.vercel.app", 
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
