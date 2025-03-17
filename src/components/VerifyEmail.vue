<template>
  <div>
    <h1>Verificando tu cuenta...</h1>
    <p v-if="isVerified">Tu cuenta ha sido verificada exitosamente. Redirigiendo...</p>
    <p v-if="errorMessage">{{ errorMessage }}</p>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

export default {
  name: "VerifyEmail",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const isVerified = ref(false);
    const errorMessage = ref("");

    const verifyToken = async () => {
      const token = route.params.token;
      if (!token) {
        errorMessage.value = "Token no proporcionado.";
        return;
      }
      try {
        const response = await fetch(`${process.env.VUE_APP_API_URL}/auth/verify/${token}`, {
          credentials: "include"
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.detail || "Error en la verificación");
        }
        isVerified.value = true;
        if (data.redirect_url) {
          window.location.href = data.redirect_url;
        } else {
          router.push({ name: "CompleteProfile", query: { email: data.email } });
        }
      } catch (error) {
        errorMessage.value = error.message;
      }
    };

    onMounted(() => {
      verifyToken();
    });

    return { isVerified, errorMessage };
  },
};
</script>
