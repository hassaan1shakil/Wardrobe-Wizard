import axios from 'axios';
import { useRouter } from 'next/navigation';

// Create an Axios instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000/api',
  withCredentials: true,    // Allows to send Cookies
});

// Interceptor for token refreshing
api.interceptors.response.use(
    response => response,
    async (error) => {
      if (error.response && error.response.status === 401) {
        try {
          // Attempt to refresh the token by calling the refresh endpoint
          await api.post('/token/refresh/');
          // Retry the original request
          return api(error.config);
        } catch (err) {
          console.error("Failed to refresh token. Redirecting to login.");
          // Redirect to login page
          alert("Session Expired!");
          const router = useRouter()
          router.push('/login')
          return Promise.reject(err);
        }
      }
      return Promise.reject(error);
    }
  );

export default api;
