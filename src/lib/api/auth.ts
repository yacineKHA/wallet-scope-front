import { apiClient } from './client';

export const authAPI = {
  login: (credentials: { email: string; password: string }) =>
    apiClient.post('/user/login', credentials),
  
  register: (userData: any) =>
    apiClient.post('/user/register', userData),
  
  logout: () => apiClient.post('/user/logout', {}),
};