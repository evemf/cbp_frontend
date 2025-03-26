import axios from "axios";

const apiUrl = process.env.VUE_APP_API_URL;

const api = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Se envían las cookies con cada solicitud
});

export default api;
