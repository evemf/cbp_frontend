<template>
  <v-app-bar app color="indigo" dark>
    <v-toolbar-title>
      <router-link to="/" class="white--text">Summer Event</router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn v-if="!isAuthenticated" @click="goToAuthPage" color="primary">Login / Register</v-btn>
    <v-btn v-else @click="logout" color="primary">Logout</v-btn>
  </v-app-bar>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      isAuthenticated: state => state.token !== null,
    }),
  },
  methods: {
    goToAuthPage() {
      this.$router.push('/login');
    },
    logout() {
      this.$store.dispatch('logout');
      this.$router.push('/login');
    },
  },
};
</script>
