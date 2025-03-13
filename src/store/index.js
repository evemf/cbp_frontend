import { createStore } from 'vuex';
import api from '../services/api'; // Importamos la API para hacer las solicitudes

const store = createStore({
  state: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setToken(state, token) {
      state.token = token;
    },
    logout(state) {
      state.user = null;
      state.token = null;
    }
  },
  actions: {
    async register(_, userData) {
      try {
        // Realizamos la solicitud para registrar al usuario
        const response = await api.post('/auth/register', userData);
        
        if (response.status === 200) {
          // En el backend, aquí se envía un correo de validación
          alert('We have sent a validation email. Please check your inbox.');
        } else {
          alert('Registration failed, please try again!');
        }
      } catch (error) {
        console.error('Registration failed:', error);
      }
    },

    // Acción para completar el perfil después de la verificación
    async completeProfile(_, profileData) {
      try {
        // Llamamos a la API para completar el perfil
        const response = await api.post('/auth/complete-profile', profileData);

        if (response.status === 200) {
          alert('Your profile is now complete!');
          // Redirigimos al usuario a la página de inicio o donde lo necesitemos
          this.$router.push({ name: 'home' });
        } else {
          alert('Profile completion failed!');
        }
      } catch (error) {
        console.error('Profile completion failed:', error);
      }
    },

    async login({ commit }, credentials) {
      try {
        const response = await api.post('/auth/login', credentials);
        const { token, user } = response.data;
        commit('setToken', token);
        commit('setUser', user);
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
      } catch (error) {
        console.error('Login failed:', error);
      }
    },

    async logout({ commit }) {
      commit('logout');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    getUser: (state) => state.user,
  }
});

export default store;
