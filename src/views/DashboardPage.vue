<template>
  <div class="dashboard-container">
    <h1>Bienvenido, {{ user?.first_name || "Usuario" }}!</h1>
    
    <div v-if="user" class="profile-card">
      <img :src="user.avatar || defaultAvatar" alt="Profile Image" class="profile-img" />
      
      <div class="profile-info">
        <h2>{{ user.first_name }} {{ user.last_name }}</h2>
        <p><strong>Email:</strong> {{ user.email }}</p>
        <p><strong>Fecha de nacimiento:</strong> {{ formatDate(user.birth_date) }}</p>
        <p><strong>Género:</strong> {{ user.gender || "No especificado" }}</p>
        <p><strong>País:</strong> {{ user.country || "No especificado" }}</p>
        <p><strong>Teléfono:</strong> {{ user.phone_number || "No especificado" }}</p>
        <p>
          <strong>Cuenta verificada:</strong>
          <span :class="{ verified: user.is_verified, notVerified: !user.is_verified }">
            {{ user.is_verified ? "Sí" : "No" }}
          </span>
        </p>
      </div>

      <div class="profile-actions">
        <button @click="goToEditProfile">Editar Perfil</button>
        <button class="logout-btn" @click="logout">Cerrar Sesión</button>
      </div>
    </div>

    <p v-else>Cargando perfil...</p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "DashboardPage",
  data() {
    return {
      defaultAvatar: "https://via.placeholder.com/100", // Imagen por defecto
    };
  },
  computed: {
    ...mapGetters(["getUser"]),
    user() {
      return this.getUser;
    },
  },
  methods: {
    ...mapActions(["fetchUser", "logout"]),
    formatDate(date) {
      if (!date) return "No especificado";
      return new Date(date).toLocaleDateString("es-ES");
    },
    goToEditProfile() {
      this.$router.push("/edit-profile");
    },
  },
  created() {
    if (!this.user || !this.user.email) {
      this.fetchUser();
    }
  },
};
</script>

<style scoped>
.dashboard-container {
  text-align: center;
  padding: 20px;
}

.profile-card {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: left;
}

.profile-img {
  display: block;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 0 auto 10px;
}

.profile-info h2 {
  text-align: center;
}

.profile-info p {
  margin: 5px 0;
}

.verified {
  color: green;
  font-weight: bold;
}

.notVerified {
  color: red;
  font-weight: bold;
}

.profile-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

.profile-actions button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
}

.profile-actions button:hover {
  background-color: #0056b3;
}

.logout-btn {
  background-color: red;
}

.logout-btn:hover {
  background-color: darkred;
}
</style>
