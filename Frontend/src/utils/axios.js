import axios from 'axios';

let baseURL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000/api';
if (import.meta.env.VITE_API_URL && !baseURL.endsWith('/api')) {
  // ensure there is no trailing slash before appending /api
  baseURL = baseURL.replace(/\/$/, '') + '/api';
}

const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
