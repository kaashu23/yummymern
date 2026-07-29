import axios from 'axios';

let baseURL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000/api';
if (import.meta.env.VITE_API_URL && !baseURL.endsWith('/api')) {
  baseURL = baseURL.replace(/\/$/, '') + '/api';
}

const api = axios.create({
  baseURL,
  withCredentials: true,
});

export default api;
