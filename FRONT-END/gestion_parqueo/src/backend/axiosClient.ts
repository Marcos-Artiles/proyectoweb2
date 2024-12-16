// backend/axiosClient.ts
import axios from 'axios';
import { getApiUrl } from './Config';

const axiosClient = axios.create({
  baseURL: getApiUrl(''), // Usa la función para obtener la URL base
  withCredentials: true,  // Necesario para cookies y CSRF en Laravel Sanctum
});

// Interceptor para manejar errores globales
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Error en la respuesta:', error.response || error.message);
    return Promise.reject(error);
  }
);

export default axiosClient;