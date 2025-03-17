<template>
  <div class="dashboard">
    <h1>Welcome to Your Dashboard!</h1>
    <p v-if="user && user.email">You're logged in as: {{ user.email }}</p>
    <p v-else>Loading...</p>
    <!-- Más componentes e información del dashboard -->
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'DashboardPage',
  data() {
    return {
      user: null,
      error: null,
    };
  },
  created() {
    // Llamar al endpoint /auth/me para obtener la información del usuario
    axios
      .get(`${process.env.VUE_APP_API_URL}/auth/me`, { withCredentials: true })
      .then((response) => {
        this.user = response.data;
        // Opcional: guardar en localStorage o en un store centralizado
        localStorage.setItem('user', JSON.stringify(response.data));
      })
      .catch((error) => {
        this.error = error.response?.data?.detail || error.message;
      });
  },
};
</script>

<style scoped>
.dashboard {
  text-align: center;
  padding: 20px;
}
</style>
