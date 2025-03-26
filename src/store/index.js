import { createStore } from 'vuex';
import api from '../services/api'; // API para solicitudes HTTP
import router from '../router'; // Router para redirecciones

const store = createStore({
  state: {
    user: null, // Eliminamos la dependencia de localStorage
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    logout(state) {
      state.user = null;
    }
  },
  actions: {
    // 🚀 Registrar usuario
    async register(_, email) {
      if (typeof email !== "string") {
        console.error("Error: email debe ser un string, recibió:", email);
        alert("Formato de correo no válido");
        return;
      }
      try {
        console.log("Enviando:", { email });
        const response = await api.post('/auth/register', { email: email.trim() });

        if (response.status === 200) {
          alert("Hemos enviado un correo de verificación. Por favor, revisa tu bandeja de entrada.");
        }
      } catch (error) {
        console.error("Error en el registro:", error);
        alert(error.response?.data?.detail || "Error en el registro, intenta de nuevo.");
      }
    },
    
    // 🚀 Completar perfil
    async completeProfile(_, profileData) {
      try {
        const response = await api.put('/users/complete-profile', profileData, {
          withCredentials: true, // Asegurarse de que se envíen las cookies
        });

        if (response.status === 200) {
          alert('¡Tu perfil ha sido completado exitosamente!');
          router.push({ name: 'Auth' }); // Redirigir a la página de autenticación
        }
      } catch (error) {
        console.error('Error al completar perfil:', error);
        alert(error.response?.data?.detail || 'Hubo un problema al completar el perfil.');
      }
    },

    // 🚀 Obtener usuario autenticado desde el backend
    async fetchUser({ commit }) {
      try {
        const response = await api.get("/auth/me", { withCredentials: true }); // Asegurarse de enviar las cookies
        commit("setUser", response.data);
        return response.data;
      } catch (error) {
        console.error("Error obteniendo el usuario:", error);
        console.warn("El usuario no está autenticado o la sesión expiró.");
        commit("setUser", null); // Eliminar el usuario del estado en caso de error
        return null;
      }
    },

    // 🚀 Iniciar sesión
    async login({ commit }, credentials) {
      try {
        const response = await api.post("/auth/login", credentials, { withCredentials: true }); // Enviar cookies
        const { user, redirect_url } = response.data; // Recibimos el usuario y la URL de redirección
  
        commit("setUser", user); // Establecer el usuario en el estado
        window.location.href = redirect_url; // Redirigir a la URL correspondiente
      } catch (error) {
        alert(error.response?.data?.detail || "Correo o contraseña incorrectos.");
      }
    },

    // 🚀 Actualizar perfil del usuario
    async updateUserProfile({ commit }, userData) {
      try {
        const response = await api.put("/users/profile", userData, { withCredentials: true });
        commit("setUser", response.data); // Actualizar el usuario en el estado
        alert("Perfil actualizado con éxito!");
      } catch (error) {
        alert("Error al actualizar el perfil.");
      }
    },

    // 🚀 Cerrar sesión
    async logout({ commit }) {
      try {
        await api.post("/auth/logout", {}, { withCredentials: true }); // Llamamos al backend para cerrar sesión
        commit("logout"); // Limpiar el estado del usuario
        router.push({ name: "Auth" }); // Redirigir a la página de autenticación
      } catch (error) {
        console.error("Error al cerrar sesión:", error);
      }
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.user, // Devuelve si el usuario está autenticado
    getUser: (state) => state.user, // Obtener los datos del usuario
  }
});

export default store;
