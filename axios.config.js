// axios-config.js
import axios from 'axios';

// Add a request interceptor
axios.interceptors.request.use(
  config => {
    // Modify the config to include withCredentials for all requests
    config.withCredentials = true;
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Export the axios instance
export default axios;
