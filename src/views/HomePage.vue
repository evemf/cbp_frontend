<template>
    <v-container>
      <!-- Hero Section -->
      <v-row>
        <v-col cols="12" class="text-center">
          <!-- Mostramos el logo en lugar de la imagen de hero, o bien una imagen de hero sin sobreponer botón -->
          <v-img :src="logo" alt="Hero Image" height="400px" class="rounded-xl"></v-img>
          <!-- Botón debajo de la imagen -->
          <v-btn color="primary" class="mt-4 white--text" @click="goToCompetitionsPage">
            Get Started
          </v-btn>
        </v-col>
      </v-row>
  
      <!-- Sección de Servicios -->
      <v-row class="my-5" align="center">
        <v-col v-for="(service, index) in services" :key="index" cols="12" md="4">
          <v-card>
            <v-img :src="service.image" height="200px"></v-img>
            <v-card-title>{{ service.title }}</v-card-title>
            <v-card-subtitle>{{ service.description }}</v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import logo from '@/assets/logo.png'; // Asegúrate de que el logo existe en src/assets/logo.png
  
  export default {
    name: "HomePage",
    data() {
      return {
        logo,
        services: [
          {
            title: "Networking Opportunities",
            description: "Meet and connect with industry professionals.",
            image: "https://via.placeholder.com/600x200?text=Networking"
          },
          {
            title: "Workshops and Training",
            description: "Enhance your skills through hands-on workshops.",
            image: "https://via.placeholder.com/600x200?text=Workshops"
          },
          {
            title: "Exclusive Events",
            description: "Attend special events designed for you.",
            image: "https://via.placeholder.com/600x200?text=Exclusive+Events"
          }
        ]
      };
    },
    methods: {
      goToCompetitionsPage() {
        this.$router.push('/competitions');
      }
    }
  };
  </script>
  
  <style scoped>
  .v-img {
    border-radius: 10px;
  }
  .v-card {
    transition: transform 0.2s ease;
  }
  .v-card:hover {
    transform: scale(1.05);
  }
  .v-card-title {
    font-weight: bold;
  }
  .v-card-subtitle {
    color: #555;
  }
  .v-container {
    padding-top: 20px;
    padding-bottom: 20px;
  }
  </style>
  