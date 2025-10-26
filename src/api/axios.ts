import axios from 'axios';
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://task-manager-backend-flame-alpha.vercel.app/api',
  headers: { 'Content-Type': 'application/json' }
});
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('tm_token');
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
export default api;
