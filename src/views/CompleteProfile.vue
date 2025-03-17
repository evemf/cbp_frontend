<template>
  <div class="container">
    <h1 class="title">Completar Perfil</h1>
    <form @submit.prevent="completeProfile">
      <div class="form-group">
        <label>Email</label>
        <input v-model="email" type="email" readonly class="readonly-input" />
      </div>
      <div class="form-group">
        <label>Nombre</label>
        <input v-model="firstName" type="text" required class="input" />
      </div>
      <div class="form-group">
        <label>Apellido</label>
        <input v-model="lastName" type="text" required class="input" />
      </div>
      <div class="form-group">
        <label>Fecha de Nacimiento</label>
        <input v-model="birthDate" type="date" required class="input" />
      </div>
      <div class="form-group">
        <label>Género</label>
        <select v-model="gender" required class="input">
          <option disabled value="">Seleccione una opción</option>
          <option value="male">Masculino</option>
          <option value="female">Femenino</option>
          <option value="other">Otro</option>
        </select>
      </div>
      <div class="form-group">
        <label>País</label>
        <input v-model="country" type="text" required class="input" />
      </div>
      <div class="form-group">
        <label>Número de Teléfono</label>
        <input v-model="phoneNumber" type="tel" required class="input" />
      </div>
      <div class="form-group">
        <label>Contraseña</label>
        <input v-model="password" type="password" required class="input" />
      </div>
      <div class="form-group">
        <label>Confirmar Contraseña</label>
        <input v-model="confirmPassword" type="password" required class="input" />
      </div>
      <button type="submit" class="btn">Guardar</button>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    <p v-if="successMessage" class="success">{{ successMessage }}</p>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import api from "@/services/api";

export default {
  name: "CompleteProfile",
  setup() {
    const router = useRouter();
    const route = useRoute();
    const email = ref(route.query.email || "");
    const password = ref("");
    const confirmPassword = ref("");
    const firstName = ref("");
    const lastName = ref("");
    const birthDate = ref("");
    const gender = ref("");
    const country = ref("");
    const phoneNumber = ref("");
    const errorMessage = ref("");
    const successMessage = ref("");

    const completeProfile = async () => {
      if (password.value !== confirmPassword.value) {
        errorMessage.value = "Las contraseñas no coinciden.";
        return;
      }
      try {
        const response = await api.put(
          "/users/complete-profile",
          {
            email: email.value,
            password: password.value,
            first_name: firstName.value,
            last_name: lastName.value,
            birth_date: birthDate.value,
            gender: gender.value,
            country: country.value,
            phone_number: phoneNumber.value,
          },
          { withCredentials: true }
        );
        if (response.status === 200) {
          successMessage.value = "Perfil completado con éxito.";
          setTimeout(() => {
            router.push({ name: "Auth" });
          }, 1000);
        }
      } catch (error) {
        errorMessage.value = error.response?.data?.detail || "Error al completar el perfil.";
      }
    };

    return {
      email,
      password,
      confirmPassword,
      firstName,
      lastName,
      birthDate,
      gender,
      country,
      phoneNumber,
      errorMessage,
      successMessage,
      completeProfile,
    };
  },
};
</script>

<style scoped>
.container {
  max-width: 480px;
  margin: auto;
  padding: 20px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.title {
  font-size: 28px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
  text-align: left;
}

.form-group label {
  display: block;
  font-weight: 600;
  margin-bottom: 8px;
  color: #555;
}

.input {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  transition: border-color 0.3s ease;
}

.input:focus {
  border-color: #007bff;
  outline: none;
}

.readonly-input {
  background-color: #f3f3f3;
  cursor: not-allowed;
}

.btn {
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: white;
  font-size: 18px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #0056b3;
}

.error {
  color: red;
  margin-top: 15px;
  font-size: 14px;
}

.success {
  color: green;
  margin-top: 15px;
  font-size: 14px;
}
</style>
