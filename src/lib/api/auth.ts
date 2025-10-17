import { apiClient } from './client';

interface RegisterData {
  email: string;
  password: string;
  username?: string;
}

export const authAPI = {
  login: (credentials: { email: string; password: string }) =>
    apiClient.post('/auth/login', credentials),
  
  register: (userData: RegisterData) =>
    apiClient.post('/auth/register', userData),
  
  logout: () => apiClient.post('/auth/logout', {}),
};