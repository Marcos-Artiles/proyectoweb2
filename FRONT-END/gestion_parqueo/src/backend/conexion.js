import axios from 'axios';

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL, // Cambia a REACT_APP_BASE_URL
    headers: {
      'Content-Type': 'application/json',
    },
  });

axiosClient.interceptors.request.use((config) => {
    const token = sessionStorage.getItem("ACCESS_TOKEN");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const { response } = error;
        if (response.status === 401) {
            localStorage.removeItem("ACCESS_TOKEN");
            // window.location.reload();
        } else if (response.status === 404) {
            //Show not found
        }

        throw error;
    }
);

// Función para obtener el perfil del usuario
export const obtenerperfildeusuario = async () => {
    try {
        const response = await axiosClient.get("/profile");
        return response.data;
    } catch (error) {
        console.error("Error al obtener el perfil del usuario:", error);
        throw error;
    }
};

// Función para cerrar sesión
export const cerrarSesion = async () => {
    try {
        const response = await axiosClient.post("/logout");
        sessionStorage.removeItem("ACCESS_TOKEN");
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default axiosClient;