import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

const useApi = () => {
  const request = async ({ method, url, data = null, auth = true }) => {
    try {
      // Safely access 'user' from localStorage
      const storedValue = localStorage.getItem('user');
      const parsed = storedValue ? JSON.parse(storedValue) : {};
      const token = parsed?.token;  // Token is directly stored under 'token'

      // Remove redundant slashes in URL
      const fullUrl = `${API_BASE_URL}${url}`.replace(/([^:]\/)\/+/g, '$1');

      const config = {
        method,
        url: fullUrl,
        data,
        headers: {},
        withCredentials: true,
      };

      // Add Authorization header if 'auth' is true and token exists
      if (auth && token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      // Log request details for debugging purposes
      console.log("🟡 REQUEST SENT:");
      console.log("➡️ URL:", config.url);
      console.log("➡️ Method:", config.method);
      console.log("➡️ Headers:", config.headers);
      console.log("➡️ Data:", config.data);

      // Make the API request
      const res = await axios(config);

      // Return the response data
      return res.data;
    } catch (err) {
      // Enhanced error logging
      if (err.response) {
        console.error("🔴 API Error Response:", err.response.data);
        throw err.response.data;  // Throw detailed response error
      } else if (err.request) {
        console.error("🔴 No response received:", err.request);
        throw { message: 'No response received from server' };  // No response error
      } else {
        console.error("🔴 API Request Error:", err.message);
        throw { message: err.message };  // Generic error message
      }
    }
  };

  return { request };
};

export default useApi;
