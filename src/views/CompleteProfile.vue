<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

const route = useRoute();
const router = useRouter();
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
    await axios.put(`${process.env.VUE_APP_API_URL}/users/complete-profile`, { 
        email: email.value,
        password: password.value,
        first_name: firstName.value,
        last_name: lastName.value,
        birth_date: birthDate.value,
        gender: gender.value,
        country: country.value,
        phone_number: phoneNumber.value,
    });

    successMessage.value = "Perfil completado con éxito.";
    setTimeout(() => {
      router.push("/login");
    }, 2000);
  } catch (error) {
    errorMessage.value = error.response?.data?.detail || "Error al completar el perfil.";
  }
};

onMounted(() => {
  if (!email.value) {
    router.push("/");
  }
});
</script>

<template>
  <div class="container">
    <h1>Completar Perfil</h1>

    <form @submit.prevent="completeProfile">
      <div class="form-group">
        <label>Email</label>
        <input v-model="email" type="email" readonly class="readonly-input" />
      </div>

      <div class="form-group">
        <label>Nombre</label>
        <input v-model="firstName" type="text" required />
      </div>

      <div class="form-group">
        <label>Apellido</label>
        <input v-model="lastName" type="text" required />
      </div>

      <div class="form-group">
        <label>Fecha de Nacimiento</label>
        <input v-model="birthDate" type="date" required />
      </div>

      <div class="form-group">
        <label>Género</label>
        <select v-model="gender" required>
          <option value="male">Masculino</option>
          <option value="female">Femenino</option>
          <option value="other">Otro</option>
        </select>
      </div>

      <div class="form-group">
        <label>País</label>
        <input v-model="country" type="text" required />
      </div>

      <div class="form-group">
        <label>Número de Teléfono</label>
        <input v-model="phoneNumber" type="tel" required />
      </div>

      <div class="form-group">
        <label>Contraseña</label>
        <input v-model="password" type="password" required />
      </div>

      <div class="form-group">
        <label>Confirmar Contraseña</label>
        <input v-model="confirmPassword" type="password" required />
      </div>

      <button type="submit" class="btn">Guardar</button>
    </form>

    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    <p v-if="successMessage" class="success">{{ successMessage }}</p>
  </div>
</template>

<style scoped>
.container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  text-align: center;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 24px;
  color: #333;
}

.form-group {
  margin-bottom: 15px;
  text-align: left;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input, select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

.readonly-input {
  background: #f3f3f3;
  cursor: not-allowed;
}

.btn {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn:hover {
  background-color: #0056b3;
}

.error {
  color: red;
  margin-top: 10px;
}

.success {
  color: green;
  margin-top: 10px;
}
</style>
