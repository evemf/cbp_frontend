<template>
  <div class="dashboard-container">
    <h1>Bienvenido, {{ user?.first_name || "Usuario" }}!</h1>

    <div v-if="user" class="profile-card">
      <img
        :src="user.avatar || getDefaultAvatar(user.gender)"
        alt="Profile Image"
        class="profile-img"
      />

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

      <!-- Input para subir imagen -->
      <div class="upload-container">
        <label for="fileInput" class="upload-label">Subir imagen</label>
        <input type="file" id="fileInput" @change="uploadImage" />
      </div>
    </div>

    <p v-else>Cargando perfil...</p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import avatarMale from "@/assets/avatar-male.png";
import avatarFemale from "@/assets/avatar-female.png";
import avatarDefault from "@/assets/avatar-default.png";

export default {
  name: "DashboardPage",
  computed: {
    ...mapGetters(["getUser"]),
    user() {
      return this.getUser;
    },
  },
  methods: {
    ...mapActions(["fetchUser", "uploadAvatar"]),
    formatDate(date) {
      if (!date) return "No especificado";
      return new Date(date).toLocaleDateString("es-ES");
    },
    getDefaultAvatar(gender) {
      if (gender === "male") return avatarMale;
      if (gender === "female") return avatarFemale;
      return avatarDefault;
    },
    async uploadImage(event) {
      const file = event.target.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("avatar", file);

      try {
        await this.uploadAvatar(formData);
        await this.fetchUser(); // Recargar datos del usuario después de la subida
      } catch (error) {
        console.error("Error al subir la imagen:", error);
      }
    },
  },
  async created() {
    await this.fetchUser();
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

.verified {
  color: green;
  font-weight: bold;
}

.notVerified {
  color: red;
  font-weight: bold;
}

.upload-container {
  text-align: center;
  margin-top: 15px;
}

.upload-label {
  display: block;
  background-color: #007bff;
  color: white;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
}

.upload-label:hover {
  background-color: #0056b3;
}

#fileInput {
  display: none;
}
</style>
