import axios from 'axios';
import toast from 'react-hot-toast';

const apiBaseUrl = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

const api = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      toast.error('Session expired. Please login again.');
      window.location.href = '/login';
    } else if (error.response?.status >= 400) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
    return Promise.reject(error);
  }
);

export const authApi = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
};

export const skillsApi = {
  getSkills: () => api.get('/skills'),
  addSkill: (skillData) => api.post('/skills', skillData),
  getSkill: (id) => api.get(`/skills/${id}`),
  updateSkill: (id, data) => api.put(`/skills/${id}`, data),
  deleteSkill: (id) => api.delete(`/skills/${id}`),
};

export const credentialsApi = {
  getCredentials: () => api.get('/credentials'),
  verifyCredential: (hash) => api.post('/credentials/verify', { hash }),
  issueCredential: (skillId) => api.post(`/credentials/${skillId}`),
};

export default api;
