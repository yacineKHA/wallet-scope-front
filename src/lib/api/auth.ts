import { apiClient } from './client';

interface RegisterData {
  email: string;
  password: string;
  username?: string;
}

export const authAPI = {
  login: (credentials: { email: string; password: string }) =>
    apiClient.post('/auth/login', credentials),
  
  register: (credentials: {email: string, username:string, password: string}) =>
    apiClient.post('/auth/register', credentials),
  
  logout: () => apiClient.post('/auth/logout', {}),
};