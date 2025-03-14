<template>
    <div>
      <h1>Verificando tu cuenta...</h1>
      <p v-if="isVerified">Tu cuenta ha sido verificada exitosamente.</p>
      <p v-if="errorMessage">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'VerifyEmail',
    props: ['token'], 
    data() {
      return {
        isVerified: false,
        errorMessage: '',
      };
    },
    mounted() {
      this.verifyToken(this.token);
    },
    methods: {
      async verifyToken(token) {
        try {
          const response = await fetch(`http://127.0.0.1:8000/auth/verify/${token}`);
          if (response.ok) {
            this.isVerified = true;
          } else {
            throw new Error('Token inválido o expirado');
          }
        } catch (error) {
          this.errorMessage = error.message;
        }
      }
    }
  }
  </script>
  