'use client'

import axios from 'axios';
import { useRouter } from 'next/navigation';
// import Router from 'next/router';
import { getCookie, setCookie } from "@/utils/cookieManager";

// Create an Axios instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000/api',
  withCredentials: true,  // Allows cookies to be sent with requests
});

// Request Interceptor: Attach access token to headers for all requests
api.interceptors.request.use(
  (config) => {
    const accessToken = getCookie('access_token');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;  // Add access token to Authorization header
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle 401 responses (unauthorized)
api.interceptors.response.use(
  response => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      try {
        // Attempt to refresh the token by calling the refresh endpoint
        const refreshToken = getCookie('refresh_token');
        if (refreshToken) {
          const refreshResponse = await api.post('/token/refresh/', { refresh: refreshToken });
          const newAccessToken = refreshResponse.data.access;

          // Set expiry time for access token
          const accessExpiry = new Date();
          accessExpiry.setTime(accessExpiry.getTime() + 15 * 60 * 1000); // Access token valid for 15 minutes

          // Update the access token in cookies
          setCookie('access_token', newAccessToken, { path: '/', expires: accessExpiry });
          
          // Retry the original request with the new token
          error.config.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return api(error.config);
        }
      } catch (err) {
        console.error("Failed to refresh token. Redirecting to login.");
        
        // Redirect to login page
        alert("Session Expired!");
        const router = useRouter()
        router.push('/login');
        // Router.push('/login');
        
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
