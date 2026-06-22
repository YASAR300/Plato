import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://plato-pwtx.onrender.com',
  withCredentials: true,
});

let activeRequests = 0;
const listeners = new Set();

export const registerRequestsChangeListener = (listener) => {
  listeners.add(listener);
  listener(activeRequests > 0);
  return () => {
    listeners.delete(listener);
  };
};

const updateListeners = () => {
  const inFlight = activeRequests > 0;
  listeners.forEach((listener) => listener(inFlight));
};

API.interceptors.request.use(
  (config) => {
    activeRequests++;
    updateListeners();
    return config;
  },
  (error) => {
    activeRequests = Math.max(0, activeRequests - 1);
    updateListeners();
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (response) => {
    activeRequests = Math.max(0, activeRequests - 1);
    updateListeners();
    return response;
  },
  (error) => {
    activeRequests = Math.max(0, activeRequests - 1);
    updateListeners();
    return Promise.reject(error);
  }
);

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
