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
            <v-btn v-if="!isLoggedIn" text @click="goToAuthPage">Login / Register</v-btn>
            <v-btn v-else text>{{ userName }}</v-btn>
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
import { mapState } from 'vuex'
import logo from '@/assets/logo.png'
export default {
  name: 'App',
  data() {
    return {
      logo,
      dialog: false,
      modalType: null
    }
  },
  computed: {
    ...mapState({
      isLoggedIn: state => state.isLoggedIn,
      userName: state => state.userName
    }),
    modalTitle() {
      switch (this.modalType) {
        case 'cookies':
          return 'Cookies'
        case 'dataProtection':
          return 'Protección de Datos'
        case 'privacy':
          return 'Política de Privacidad'
        default:
          return ''
      }
    },
    modalContent() {
      switch (this.modalType) {
        case 'cookies':
          return 'Información detallada sobre el uso de cookies en nuestro sitio.'
        case 'dataProtection':
          return 'Información detallada sobre cómo protegemos tus datos.'
        case 'privacy':
          return 'Información detallada sobre nuestra política de privacidad.'
        default:
          return ''
      }
    }
  },
  methods: {
    goToAuthPage() {
      this.$router.push('/auth')
    },
    openModal(type) {
      this.modalType = type
      this.dialog = true
    }
  }
}
</script>

<style scoped>
#app {
  font-family: 'Arial', sans-serif;
  color: #2c3e50;
}
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
