<template>
    <v-container>
      <v-app-bar app color="cyan" dark>
        <v-spacer></v-spacer>
        <v-btn v-if="!isLoggedIn" @click="openAuthForm">Sign In / Register</v-btn>
        <v-btn v-else>Hi!, {{ userName }}</v-btn>
      </v-app-bar>
  
      <v-row>
        <v-col cols="12">
          <v-data-table :headers="headers" :items="rankings" item-key="id">
            <template v-slot:item="{ item }">
              <tr>
                <td>{{ item.name }}</td>
                <td>{{ item.points }}</td>
                <td>{{ item.status }}</td>
              </tr>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
  
      <v-footer color="cyan" dark>
        <v-spacer></v-spacer>
        <v-col class="text-center" cols="12">
          <p>&copy; 2025 Catalonia Blackball Party</p>
        </v-col>
      </v-footer>
    </v-container>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        isLoggedIn: false,
        userName: '',
        headers: [
          { text: 'Player', align: 'start', key: 'name' },
          { text: 'Points', align: 'start', key: 'points' },
          { text: 'Status', align: 'start', key: 'status' },
        ],
        rankings: [],
      };
    },
    methods: {
      openAuthForm() {
        this.$router.push('/auth');
      },
      fetchRankings() {
        axios.get('https://api.example.com/rankings')
          .then(response => {
            this.rankings = response.data;
          })
          .catch(error => {
            console.error('Error fetching rankings:', error);
          });
      }
    },
    created() {
      const user = localStorage.getItem('user');
      if (user) {
        this.isLoggedIn = true;
        this.userName = JSON.parse(user).name;
      }
      this.fetchRankings();  // Llamada a la API para obtener los rankings
    },
  };
  </script>
  
  <style scoped>
  .v-container {
    padding-top: 50px;
  }
  </style>
  