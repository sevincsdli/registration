import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3000';
axios.interceptors.request.use(config => {
    const token = localStorage.getItem('Token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
  