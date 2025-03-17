import { createStore } from 'vuex';
import api from '../services/api'; // Importamos la API para hacer las solicitudes
import router from '../router'; // Importamos el router para hacer redirecciones

const store = createStore({
  state: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      localStorage.setItem('user', JSON.stringify(user));
    },
    setToken(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
    },
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
  },
  actions: {
    // Registro inicial (envía email de verificación)
    async register(_, email) {
      if (typeof email !== "string") {
        console.error("Error: email debe ser un string, pero recibió:", email);
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
    }
    ,
    
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

    // Login
    async login({ commit }, credentials) {
      try {
        const response = await api.post('/auth/login', credentials, {
          withCredentials: true,
        });

        const { access_token, redirect_url } = response.data;  // Extraemos la URL de redirección

        commit('setToken', access_token);

        // Obtener datos del usuario después del login
        const userResponse = await api.get('/auth/me', { withCredentials: true });

        commit('setUser', userResponse.data);

        // Redirigir al dashboard usando la URL proporcionada por el backend
        console.log('Redirigiendo a:', redirect_url);
        window.location.href = redirect_url; // Redirige a la URL que el backend devuelve
      } catch (error) {
        console.error('Login failed:', error);
        alert(error.response?.data?.detail || 'Invalid email or password!');
      }
    },

    // Logout
    async logout({ commit }) {
      commit('logout');
      router.push({ name: 'login' }); // Redirigir al login
    }
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    getUser: (state) => state.user,
  }
});

export default store;
