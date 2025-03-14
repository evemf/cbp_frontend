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
        const token = new URLSearchParams(window.location.search).get("token"); 
        console.log("Token from URL:", token); 
        if (!token) throw new Error("Missing verification token.");
    
        const response = await api.post('http://127.0.0.1:8000/auth/complete-profile', profileData, {
          headers: { Authorization: `Bearer ${token}` }
        });        
    
        if (response.status === 200) {
          alert('Your profile is now complete!');
          router.push({ name: 'Auth' }); 
        }
      } catch (error) {
        console.error('Profile completion failed:', error);
        alert(error.response?.data?.detail || 'Profile completion failed!');
      }
    },

    // Login
    async login({ commit }, credentials) {
      try {
        const response = await api.post('/auth/login', credentials);
        const { access_token } = response.data;

        commit('setToken', access_token);

        // Obtener datos del usuario después del login
        const userResponse = await api.get('/auth/me', {
          headers: { Authorization: `Bearer ${access_token}` }
        });

        commit('setUser', userResponse.data);

        router.push({ name: 'dashboard' }); // Redirigir al dashboard
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
