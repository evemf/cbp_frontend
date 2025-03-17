<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-container>
        <v-row align="center" justify="space-between">
          <v-col cols="auto">
            <router-link to="/">
              <v-img :src="logo" alt="Logo" max-width="100" />
            </router-link>
          </v-col>
          <v-col class="d-flex" cols="auto">
            <v-btn text to="/competitions">Competitions</v-btn>
            <v-btn text to="/rooms">Rooms</v-btn>
            <v-btn text to="/rankings">Rankings</v-btn>

            <!-- Si NO está logueado, muestra Login / Register -->
            <v-btn v-if="!isAuthenticated" text @click="goToAuthPage">Login / Register</v-btn>

            <!-- Si está logueado, muestra su nombre con menú desplegable -->
            <v-menu v-else offset-y>
              <template v-slot:activator="{ props }">
                <v-btn v-bind="props" text>{{ userName || "Mi Perfil" }}</v-btn>
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
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>

    <v-footer app color="primary">
      <v-container>
        <v-row class="d-flex align-center justify-center">
          <v-col class="text-center" cols="12">
            <div class="white--text">
              © 2025 - Dirección: Carrer dels Muntanyals, 5, 43481 Platja de la Pineda, Tarragona
            </div>
            <div class="footer-links">
              <a href="#" @click.prevent="openModal('cookies')">Cookies</a>
              <a href="#" @click.prevent="openModal('dataProtection')">Protección de Datos</a>
              <a href="#" @click.prevent="openModal('privacy')">Política de Privacidad</a>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>

    <!-- Modal para mostrar información de Cookies, Protección de Datos y Privacidad -->
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title class="headline">{{ modalTitle }}</v-card-title>
        <v-card-text>{{ modalContent }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
import logo from "@/assets/logo.png";

export default {
  name: "App",
  data() {
    return {
      logo,
      dialog: false,
      modalType: null
    };
  },
  computed: {
    ...mapState({
      isAuthenticated: (state) => !!state.user, // Verifica si el usuario está autenticado
      userName: (state) => state.user?.first_name || "Mi Perfil"
    }),
    modalTitle() {
      switch (this.modalType) {
        case "cookies":
          return "Cookies";
        case "dataProtection":
          return "Protección de Datos";
        case "privacy":
          return "Política de Privacidad";
        default:
          return "";
      }
    },
    modalContent() {
      switch (this.modalType) {
        case "cookies":
          return "Información detallada sobre el uso de cookies en nuestro sitio.";
        case "dataProtection":
          return "Información detallada sobre cómo protegemos tus datos.";
        case "privacy":
          return "Información detallada sobre nuestra política de privacidad.";
        default:
          return "No se encontró información.";
      }
    }
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
      this.$router.push("/");
    },
    openModal(type) {
      this.modalType = type;
      this.dialog = true;
    }
  },
  async created() {
    await this.$store.dispatch("fetchUser"); // Asegura que el usuario se cargue correctamente
  }
};
</script>

<style scoped>
.footer-links a {
  color: white;
  margin: 0 10px;
  text-decoration: underline;
  cursor: pointer;
}
.footer-links a:hover {
  color: #007bff;
}
</style>
