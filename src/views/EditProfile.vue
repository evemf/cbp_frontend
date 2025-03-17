<template>
    <div class="edit-profile-container">
      <h1>Editar Perfil</h1>
  
      <form @submit.prevent="updateProfile">
        <label>Nombre:</label>
        <input v-model="form.first_name" type="text" />
  
        <label>Apellido:</label>
        <input v-model="form.last_name" type="text" />
  
        <label>Fecha de nacimiento:</label>
        <input v-model="form.birth_date" type="date" />
  
        <label>Género:</label>
        <select v-model="form.gender">
          <option value="Masculino">Masculino</option>
          <option value="Femenino">Femenino</option>
          <option value="Otro">Otro</option>
        </select>
  
        <label>País:</label>
        <input v-model="form.country" type="text" />
  
        <label>Teléfono:</label>
        <input v-model="form.phone_number" type="tel" />
  
        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  </template>
  
  <script>
  import { mapGetters, mapActions } from "vuex";
  
  export default {
    name: "EditProfile",
    data() {
      return {
        form: {
          first_name: "",
          last_name: "",
          birth_date: "",
          gender: "",
          country: "",
          phone_number: "",
        },
      };
    },
    computed: {
      ...mapGetters(["getUser"]),
    },
    methods: {
      ...mapActions(["updateUserProfile"]),
      async updateProfile() {
        await this.updateUserProfile(this.form);
        this.$router.push("/dashboard");
      },
    },
    created() {
      const user = this.getUser;
      if (user) {
        this.form = { ...user };
      }
    },
  };
  </script>
  
  <style scoped>
  .edit-profile-container {
    max-width: 400px;
    margin: auto;
    padding: 20px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  form {
    display: flex;
    flex-direction: column;
  }
  
  label {
    margin-top: 10px;
    font-weight: bold;
  }
  
  input,
  select {
    padding: 8px;
    margin-top: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  button {
    margin-top: 15px;
    background-color: #28a745;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #218838;
  }
  </style>
  