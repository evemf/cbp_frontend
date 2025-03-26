<template>
  <div>
    <h1>Verificando tu cuenta...</h1>
    <p v-if="isVerified">Tu cuenta ha sido verificada exitosamente. Redirigiendo...</p>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import api from "../services/api"; // Instancia de axios configurada

export default {
  name: "VerifyEmail",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const isVerified = ref(false);
    const errorMessage = ref("");

    const verifyToken = async () => {
      const token = route.query.token;
      if (!token) {
        errorMessage.value = "Token no proporcionado.";
        return;
      }

      try {
        const response = await api.get(`/auth/verify`, { params: { token } });

        if (response.status === 200) {
          isVerified.value = true;

          // Redirigir correctamente
          const redirectUrl = response.data.redirect_url;
          if (redirectUrl) {
            window.location.href = redirectUrl; // Usamos window.location.href para URLs absolutas
          } else {
            router.push({ name: "CompleteProfile", query: { email: response.data.email } });
          }
        }
      } catch (error) {
        errorMessage.value = error.response?.data?.detail || "Error en la verificación.";
      }
    };

    onMounted(() => {
      verifyToken();
    });

    return { isVerified, errorMessage };
  },
};
</script>

<style scoped>
.error {
  color: red;
  font-weight: bold;
}
</style>
