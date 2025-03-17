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
        alert("Invalid email format!");
        return;
      }
      try {
        console.log("Enviando:", { email });
        const response = await api.post('/auth/register', { email: email.trim() });

        if (response.status === 200) {
          alert("We have sent a validation email. Please check your inbox.");
        }
      } catch (error) {
        console.error("Registration failed:", error);
        alert(error.response?.data?.detail || "Registration failed, please try again!");
      }
    },
    
    // 🚀 Completar perfil
    async completeProfile(_, profileData) {
      try {
        const response = await api.put('/users/complete-profile', profileData, {
          withCredentials: true,
        });

        if (response.status === 200) {
          alert('¡Tu perfil ha sido completado exitosamente!');
          router.push({ name: 'Auth' });
        }
      } catch (error) {
        console.error('Error al completar perfil:', error);
        alert(error.response?.data?.detail || 'Hubo un problema al completar el perfil.');
      }
    },

    // 🚀 Obtener usuario autenticado desde el backend
    async fetchUser({ commit }) {
      try {
        const response = await api.get("/auth/me", { withCredentials: true });
        commit("setUser", response.data);
        return response.data;
      } catch (error) {
        console.error("Error fetching user:", error);
        console.warn("El usuario no está autenticado o la sesión expiró.");
        commit("setUser", null);
        return null;
      }
    },

    // 🚀 Iniciar sesión
    async login({ commit }, credentials) {
      try {
        const response = await api.post("/auth/login", credentials, { withCredentials: true });
        const { user, redirect_url } = response.data; // Recibimos el usuario del backend
  
        commit("setUser", user);
        window.location.href = redirect_url;
      } catch (error) {
        alert(error.response?.data?.detail || "Invalid email or password!");
      }
    },

    // 🚀 Actualizar perfil del usuario
    async updateUserProfile({ commit }, userData) {
      try {
        const response = await api.put("/users/profile", userData, { withCredentials: true });
        commit("setUser", response.data);
        alert("Perfil actualizado con éxito!");
      } catch (error) {
        alert("Error al actualizar perfil.");
      }
    },

    // 🚀 Cerrar sesión
    async logout({ commit }) {
      try {
        await api.post("/auth/logout", {}, { withCredentials: true }); // Llamamos al backend para cerrar sesión
        commit("logout");
        router.push({ name: "Auth" });
      } catch (error) {
        console.error("Error al cerrar sesión:", error);
      }
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.user,
    getUser: (state) => state.user,
  }
});

export default store;
