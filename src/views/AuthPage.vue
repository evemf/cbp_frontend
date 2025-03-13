<template>
    <v-container>
      <v-tabs v-model="tab" background-color="primary" dark>
        <v-tab :value="0">Login</v-tab>
        <v-tab :value="1">Register</v-tab>
      </v-tabs>
      <v-tabs-window v-model="tab">
        <v-tabs-window-item :value="0">
          <LoginForm />
        </v-tabs-window-item>
        <v-tabs-window-item :value="1">
          <RegisterForm />
        </v-tabs-window-item>
      </v-tabs-window>
    </v-container>
  </template>
  
  <script>
  import LoginForm from '@/components/LoginForm.vue'
  import RegisterForm from '@/components/RegisterForm.vue'
  
  export default {
    name: 'AuthPage',
    components: { LoginForm, RegisterForm },
    data() {
      return {
        tab: 0
      }
    }
  }
  </script>
  
  <style scoped>
  </style>
  