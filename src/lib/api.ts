// services/axiosInstance.ts
import axios from 'axios';
import https from 'https';


const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 10000,
  httpsAgent: new https.Agent({ rejectUnauthorized: false }),
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API error:', error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
