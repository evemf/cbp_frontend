<template>
    <div class="create-competition">
      <h1>Crear Competición</h1>
      <form @submit.prevent="createCompetition">
        <div class="form-group">
          <label>Nombre</label>
          <input type="text" v-model="competition.name" required />
        </div>
        <div class="form-group">
          <label>Descripción</label>
          <textarea v-model="competition.description" placeholder="Descripción de la competición"></textarea>
        </div>
        <div class="form-group">
          <label>Máximo de Participantes</label>
          <input type="number" v-model.number="competition.max_participants" required min="1" />
        </div>
        <div class="form-group">
          <label>Fecha de Inicio</label>
          <input type="datetime-local" v-model="competition.start_date" required />
        </div>
        <div class="form-group">
          <label>Fecha de Finalización</label>
          <input type="datetime-local" v-model="competition.end_date" required />
        </div>
        <div class="form-group">
          <label>Tipo de Competición</label>
          <select v-model="competition.competition_type" required>
            <option value="individual">Individual</option>
            <option value="team">Equipo</option>
          </select>
        </div>
        <div class="form-group">
          <label>Restricción de Edad</label>
          <input type="number" v-model.number="competition.age_restriction" min="0" placeholder="Opcional" />
        </div>
        <div class="form-group">
          <label>Restricción de Género</label>
          <input type="text" v-model="competition.gender_restriction" placeholder="Ej: Masculino, Femenino, etc." />
        </div>
        <button type="submit">Crear Competición</button>
      </form>
    </div>
  </template>
  
  <script>
  import api from "@/services/api"; // Asegúrate de que este import es correcto
  
  export default {
    name: "CreateCompetition",
    data() {
      return {
        competition: {
          name: "",
          description: "",
          max_participants: 1,
          start_date: "",
          end_date: "",
          competition_type: "individual",
          age_restriction: null,
          gender_restriction: ""
        }
      };
    },
    methods: {
      async createCompetition() {
        try {
          // Envía los datos al endpoint de creación de competiciones
          await api.post("/competitions", this.competition, { withCredentials: true });
          alert("Competición creada exitosamente.");
          // Redirige a la dashboard de administración o limpia el formulario según lo necesites
          this.$router.push({ name: "AdminDashboard" });
        } catch (error) {
          console.error("Error al crear la competición:", error);
          alert("Error al crear la competición. Verifica los datos e inténtalo de nuevo.");
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .create-competition {
    max-width: 600px;
    margin: 40px auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    font-family: Arial, sans-serif;
  }
  
  .create-competition h1 {
    text-align: center;
    margin-bottom: 20px;
    color: #2c3e50;
  }
  
  .form-group {
    margin-bottom: 16px;
  }
  
  .form-group label {
    display: block;
    font-weight: bold;
    margin-bottom: 6px;
    color: #34495e;
  }
  
  .form-group input,
  .form-group textarea,
  .form-group select {
    width: 100%;
    padding: 8px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }
  
  .form-group textarea {
    resize: vertical;
    min-height: 80px;
  }
  
  button[type="submit"] {
    display: block;
    width: 100%;
    padding: 10px;
    background-color: #3498db;
    color: #fff;
    font-size: 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  button[type="submit"]:hover {
    background-color: #2980b9;
  }
  </style>
  