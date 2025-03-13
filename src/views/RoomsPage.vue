<template>
    <v-container>
      <v-row>
        <v-col cols="12">
          <h1>Rooms</h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col v-for="room in rooms" :key="room.id" cols="12" md="4">
          <v-card>
            <v-img :src="room.image" height="200px"></v-img>
            <v-card-title>{{ room.name }}</v-card-title>
            <v-card-text>{{ room.description }}</v-card-text>
            <v-card-actions>
              <v-btn text color="primary" @click="bookRoom(room.id)">
                Book Now
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    name: "RoomsPage",
    data() {
      return {
        rooms: [
          {
            id: 1,
            name: "Room A",
            description: "A comfortable room with a beautiful view.",
            image: "https://via.placeholder.com/400x200?text=Room+A"
          },
          {
            id: 2,
            name: "Room B",
            description: "Spacious room equipped with all modern amenities.",
            image: "https://via.placeholder.com/400x200?text=Room+B"
          },
          {
            id: 3,
            name: "Room C",
            description: "Cozy and quiet room ideal for relaxing.",
            image: "https://via.placeholder.com/400x200?text=Room+C"
          }
        ]
      };
    },
    methods: {
      bookRoom(roomId) {
        // Aquí redirigimos a la página de reserva, pasando el id de la habitación
        this.$router.push({ path: '/reservation', query: { room: roomId } });
      }
    }
  };
  </script>
  
  <style scoped>
  h1 {
    margin-bottom: 20px;
  }
  .v-card {
    transition: transform 0.2s ease;
  }
  .v-card:hover {
    transform: scale(1.05);
  }
  </style>
  