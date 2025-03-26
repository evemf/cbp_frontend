<template>
    <div class="container">
      <h1 class="title">Listado de Competiciones</h1>
      <button @click="navigateToCreate" class="create-btn">➕ Crear Competición</button>
  
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Tipo</th>
            <th>Participantes</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="competition in competitions" :key="competition.id">
            <td>{{ competition.id }}</td>
            <td>{{ competition.name }}</td>
            <td>{{ competition.competition_type }}</td>
            <td>{{ competition.max_participants }}</td>
            <td :class="competition.is_active ? 'active' : 'inactive'">
              {{ competition.is_active ? "Activa" : "Inactiva" }}
            </td>
            <td>
              <button @click="editCompetition(competition.id)">✏️ Editar</button>
              <button @click="toggleCompetition(competition.id)">
                {{ competition.is_active ? "🚫 Desactivar" : "✅ Activar" }}
              </button>
              <button @click="deleteCompetition(competition.id)" class="delete-btn">🗑️ Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import { useRouter } from "vue-router";
  
  export default {
    data() {
      return {
        competitions: [],
      };
    },
    setup() {
      const router = useRouter();
      return { router };
    },
    methods: {
      async fetchCompetitions() {
        try {
          const response = await axios.get("http://localhost:8000/competitions/");
          this.competitions = response.data;
        } catch (error) {
          console.error("Error al obtener competiciones:", error);
        }
      },
      navigateToCreate() {
        this.router.push({ name: "CreateCompetition" });
      },
      editCompetition(id) {
        this.router.push({ name: "EditCompetition", params: { id } });
      },
      async toggleCompetition(id) {
        try {
          await axios.patch(`http://localhost:8000/competitions/${id}/toggle-active`);
          this.fetchCompetitions(); // Recargar la lista
        } catch (error) {
          console.error("Error al cambiar el estado de la competición:", error);
        }
      },
      async deleteCompetition(id) {
        if (confirm("¿Estás seguro de que quieres eliminar esta competición?")) {
          try {
            await axios.delete(`http://localhost:8000/competitions/${id}`);
            this.fetchCompetitions(); // Recargar la lista
          } catch (error) {
            console.error("Error al eliminar la competición:", error);
          }
        }
      },
    },
    mounted() {
      this.fetchCompetitions();
    },
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 900px;
    margin: auto;
    text-align: center;
  }
  .title {
    margin-bottom: 20px;
  }
  .create-btn {
    margin-bottom: 10px;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
  }
  th, td {
    border: 1px solid #ddd;
    padding: 10px;
  }
  .active {
    color: green;
  }
  .inactive {
    color: red;
  }
  .delete-btn {
    background-color: red;
    color: white;
  }
  </style>
  