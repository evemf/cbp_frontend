<!-- src/views/DashboardPage.vue -->
<template>
    <div class="dashboard">
      <h1>Welcome to Your Dashboard!</h1>
      <p>You're logged in as: {{ user.email }}</p>
      <!-- Aquí puedes agregar más componentes o información relevante para el usuario -->
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        user: JSON.parse(localStorage.getItem('user')) || {} // Suponemos que el usuario está guardado en localStorage
      };
    }
  };
  </script>
  
  <style scoped>
  .dashboard {
    text-align: center;
    padding: 20px;
  }
  </style>
  