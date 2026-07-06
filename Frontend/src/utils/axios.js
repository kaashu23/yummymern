import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// We will add interceptors later if we need to attach tokens
// Currently Clerk handles auth via headers when using clerk client
// But for backend API requests, we can attach the token here

export default api;
