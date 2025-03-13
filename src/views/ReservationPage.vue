<template>
    <div class="reservation-page">
      <h1>Available Rooms</h1>
      
      <!-- Mostramos las habitaciones en tarjetas -->
      <div v-if="rooms.length === 0" class="no-rooms">
        <p>No rooms available at the moment. Please check back later!</p>
      </div>
      <div v-else class="rooms-list">
        <div v-for="room in rooms" :key="room.id" class="room-card">
          <h2>{{ room.name }}</h2>
          <p>{{ room.description }}</p>
          <p><strong>Price:</strong> ${{ room.price }} per night</p>
          <button @click="reserveRoom(room.id)">Reserve Now</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import api from "@/services/api"; // Asegúrate de tener la API correctamente configurada
  
  export default {
    name: "ReservationPage",
    data() {
      return {
        rooms: [], // Aquí almacenaremos las habitaciones
      };
    },
    mounted() {
      this.fetchRooms(); // Cargar habitaciones cuando la vista esté montada
    },
    methods: {
      // Método para obtener las habitaciones de la API
      async fetchRooms() {
        try {
          const response = await api.get("/rooms"); // Endpoint para obtener las habitaciones
          this.rooms = response.data; // Guardamos las habitaciones en el array
        } catch (error) {
          console.error("Error fetching rooms:", error);
          alert("There was an error fetching the rooms.");
        }
      },
      // Método para reservar una habitación
      async reserveRoom(roomId) {
        try {
          const token = localStorage.getItem("token");
          if (!token) {
            alert("You need to be logged in to reserve a room.");
            return;
          }
  
          // Aquí iría la lógica para hacer la reserva
          const response = await api.put(`/rooms/${roomId}/reserve`, {}, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          if (response.status === 200) {
            alert("Room reserved successfully!");
          }
        } catch (error) {
          console.error("Error reserving room:", error);
          alert("There was an error reserving the room.");
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .reservation-page {
    text-align: center;
    padding: 20px;
  }
  
  .rooms-list {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
  }
  
  .room-card {
    background-color: #fff;
    padding: 20px;
    width: 250px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    text-align: left;
  }
  
  .room-card h2 {
    font-size: 1.5rem;
    margin-bottom: 10px;
  }
  
  .room-card p {
    font-size: 1rem;
    margin-bottom: 10px;
  }
  
  .room-card button {
    background-color: #ff4747;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .room-card button:hover {
    background-color: #e63b3b;
  }
  
  .no-rooms {
    color: #ff4747;
    font-size: 1.2rem;
    margin-top: 20px;
  }
  </style>
  