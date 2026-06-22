import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://plato-pwtx.onrender.com',
  withCredentials: true,
});

export const registerUser = async (email, password) => {
  const response = await API.post('/api/auth/register', { email, password });
  return response.data;
};

export const loginUser = async (email, password) => {
  const response = await API.post('/api/auth/login', { email, password });
  return response.data;
};

export const logoutUser = async () => {
  const response = await API.post('/api/auth/logout');
  return response.data;
};

export const getMe = async () => {
  const response = await API.get('/api/auth/me');
  return response.data;
};

export default API;
