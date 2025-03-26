<template>
    <div class="container">
      <h1>Editar Competición</h1>
      <form @submit.prevent="updateCompetition">
        <label>Nombre:</label>
        <input v-model="competition.name" required />
  
        <label>Descripción:</label>
        <textarea v-model="competition.description" required></textarea>
  
        <label>Máx. Participantes:</label>
        <input type="number" v-model="competition.max_participants" required />
  
        <label>Fecha Inicio:</label>
        <input type="datetime-local" v-model="competition.start_date" required />
  
        <label>Fecha Fin:</label>
        <input type="datetime-local" v-model="competition.end_date" required />
  
        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    props: ["id"],
    data() {
      return {
        competition: {
          name: "",
          description: "",
          max_participants: "",
          start_date: "",
          end_date: "",
        },
      };
    },
    methods: {
      async fetchCompetition() {
        try {
          const response = await axios.get(`http://localhost:8000/competitions/${this.id}`);
          this.competition = response.data;
        } catch (error) {
          console.error("Error al obtener la competición:", error);
        }
      },
      async updateCompetition() {
        try {
          await axios.put(`http://localhost:8000/competitions/${this.id}`, this.competition);
          alert("Competición actualizada");
          this.$router.push("/competitions");
        } catch (error) {
          console.error("Error al actualizar la competición:", error);
        }
      }
    },
    mounted() {
      this.fetchCompetition();
    }
  };
  </script>
  
  <style scoped>
  .container {
    padding: 20px;
  }
  input, textarea {
    display: block;
    width: 100%;
    margin-bottom: 10px;
    padding: 8px;
  }
  button {
    padding: 10px;
    cursor: pointer;
  }
  </style>
  