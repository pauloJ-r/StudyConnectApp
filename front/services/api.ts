// src/services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: "http://192.168.18.109:3000/", // Altere para sua URL real
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
