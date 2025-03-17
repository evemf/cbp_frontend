import axios from "axios";

// Crear una instancia de axios
const apiUrl = process.env.VUE_APP_API_URL;

const api = axios.create({
  baseURL:  apiUrl, 
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Interceptor para agregar el token JWT a las solicitudes protegidas
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");  // Se espera que el token esté en localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;  // Añadir el token a la cabecera de la solicitud
    }
    return config;
  },
  (error) => Promise.reject(error)  // Si ocurre algún error, lo rechazamos
);

export default api;  // Exportamos la instancia de axios para usarla en toda la aplicación
