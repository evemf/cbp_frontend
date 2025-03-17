<template>
  <v-app-bar app color="indigo" dark>
    <v-toolbar-title>
      <router-link to="/" class="white--text">Summer Event</router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>

    <!-- Si el usuario NO está autenticado, muestra Login/Register -->
    <v-btn v-if="!isAuthenticated" @click="goToAuthPage" color="primary">
      Login / Register
    </v-btn>

    <!-- Si el usuario está autenticado, muestra su nombre con un menú -->
    <v-menu v-else offset-y>
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" color="white">
          {{ userName || "Mi Perfil" }}
        </v-btn>
      </template>
      <v-list>
        <v-list-item @click="goToProfile">
          <v-list-item-title>Ver Perfil</v-list-item-title>
        </v-list-item>
        <v-list-item @click="logout">
          <v-list-item-title>Cerrar Sesión</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      isAuthenticated: (state) => !!state.access_token, // Asegurar que usa access_token correctamente
      userName: (state) => state.user?.first_name || "Mi Perfil",
    }),
  },
  methods: {
    goToAuthPage() {
      this.$router.push("/auth");
    },
    goToProfile() {
      this.$router.push("/edit-profile");
    },
    logout() {
      this.$store.dispatch("logout");
      this.$router.push("/auth");
    },
  },
  watch: {
    // Forzar actualización cuando cambie el estado de autenticación
    isAuthenticated(newValue) {
      console.log("Cambio en isAuthenticated:", newValue);
    },
  },
  created() {
    // Cargar usuario al montar el componente
    this.$store.dispatch("fetchUser");
  },
};
</script>
