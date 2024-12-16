// backend/Config.ts
const BASE_URL = "http://127.0.0.1:8000";  // Asegúrate de que esta URL sea correcta

export const getApiUrl = (endpoint: string): string => {
  return `${BASE_URL}/api/${endpoint}`;  // Devuelve la URL concatenada con el endpoint
};

export default BASE_URL;