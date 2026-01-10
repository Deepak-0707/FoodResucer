import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const ngoAPI = {
  register: (data) => api.post('/ngo/register', data),
  login: (data) => api.post('/ngo/login', data),
  getProfile: () => api.get('/ngo/profile')
};

export const eventHostAPI = {
  register: (data) => api.post('/eventhost/register', data),
  login: (data) => api.post('/eventhost/login', data),
  getProfile: () => api.get('/eventhost/profile')
};

export default api;