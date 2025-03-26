<template>
  <div class="admin-dashboard">
    <!-- Menú lateral -->
    <aside class="sidebar">
      <h2>Menú Admin</h2>
      <ul>
        <li @click="navigateTo('AdminDashboard')">Dashboard</li>
        <li @click="navigateTo('CreateCompetition')">Crear Competición</li>
      </ul>
    </aside>

    <!-- Contenido principal -->
    <main class="main-content">
      <h1>Detalls del Registre d'Usuaris</h1>
      <div class="table-container">
        <table class="users-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Verificado</th>
              <th>País</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td>{{ user.first_name }}</td>
              <td>{{ user.last_name }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.role }}</td>
              <td>{{ user.is_verified ? 'Sí' : 'No' }}</td>
              <td>{{ user.country }}</td>
              <td class="actions">
                <button class="action-button" @click="deleteUser(user.id)">❌</button>
                <button class="action-button" @click="openEditDialog(user)">✏️</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Modal para editar usuario -->
      <div v-if="editDialog" class="modal-overlay" @click.self="closeEditDialog">
        <div class="modal">
          <h2>Editar Usuario</h2>
          <form @submit.prevent="updateUser">
            <div class="form-group">
              <label>Nombre</label>
              <input type="text" v-model="editedUser.first_name" required />
            </div>
            <div class="form-group">
              <label>Apellido</label>
              <input type="text" v-model="editedUser.last_name" required />
            </div>
            <div class="form-group">
              <label>Email</label>
              <input type="email" v-model="editedUser.email" disabled />
            </div>
            <div class="form-group">
              <label>País</label>
              <input type="text" v-model="editedUser.country" />
            </div>
            <div class="modal-actions">
              <button type="button" @click="closeEditDialog">Cancelar</button>
              <button type="submit">Guardar</button>
            </div>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import api from "@/services/api";

export default {
  name: "AdminDashboard",
  data() {
    return {
      users: [],
      editDialog: false,
      editedUser: {},
    };
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await api.get("/admin/users", { withCredentials: true });
        this.users = response.data;
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
        alert("No autorizado. Verifica tus credenciales.");
      }
    },
    async deleteUser(userId) {
      try {
        await api.delete(`/admin/users/${userId}`, { withCredentials: true });
        this.fetchUsers();
        alert("Usuario eliminado correctamente.");
      } catch (error) {
        console.error("Error al eliminar usuario:", error);
        alert("Error al intentar eliminar el usuario.");
      }
    },
    openEditDialog(user) {
      // Clonamos el objeto para evitar problemas de referencia
      this.editedUser = JSON.parse(JSON.stringify(user));
      this.editDialog = true;
    },
    closeEditDialog() {
      this.editDialog = false;
      this.editedUser = {};
    },
    async updateUser() {
  try {
    const response = await api.put(`/users/${this.editedUser.id}`, this.editedUser, { withCredentials: true });

    console.log("Respuesta del backend:", response.data); // <-- Aquí vemos qué devuelve el backend

    alert("Usuario actualizado correctamente.");
    this.closeEditDialog();
    this.fetchUsers(); // Recargar los usuarios después de actualizar
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    alert("Error al intentar actualizar el usuario.");
  }
},
    navigateTo(routeName) {
      this.$router.push({ name: routeName });
    },
  },
};
</script>

<style scoped>
/* Estructura principal con Flexbox para que el sidebar llegue al footer */
.admin-dashboard {
  display: flex;
  min-height: 100vh;
  font-family: Arial, sans-serif;
}

/* Sidebar */
.sidebar {
  width: 180px; /* Menú más estrecho */
  background-color: #2c3e50;
  color: #ecf0f1;
  padding: 16px;
  box-sizing: border-box;
  flex-shrink: 0;
}
.sidebar h2 {
  font-size: 18px;
  margin-bottom: 12px;
  text-align: center;
}
.sidebar ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.sidebar li {
  text-align: center;
  padding: 8px 0;
  cursor: pointer;
}
.sidebar li:hover {
  background-color: #34495e;
}

/* Main content */
.main-content {
  flex: 1;
  padding: 16px;
  background-color: #ecf0f1;
  box-sizing: border-box;
  overflow-y: auto;
}

/* Título principal */
.main-content h1 {
  font-size: 22px;
  margin-bottom: 16px;
  color: #2c3e50;
}

/* Contenedor de la tabla */
.table-container {
  overflow-x: auto;
  margin-top: 16px;
}

/* Tabla de usuarios */
.users-table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
.users-table thead th {
  background-color: #3498db;
  color: #fff;
  font-size: 16px;
  padding: 8px;
  text-align: left;
  border-bottom: 2px solid #2980b9;
}
.users-table tbody tr {
  border-bottom: 1px solid #ddd;
  transition: background-color 0.2s;
}
.users-table tbody tr:hover {
  background-color: #f0f0f0;
}
.users-table td {
  padding: 4px 8px;
  font-size: 14px;
  line-height: 1.2;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Columna de acciones */
.actions {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding-right: 8px;
}

/* Botones de acción */
.action-button {
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  padding: 2px 4px;
}

/* Modal de edición */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.modal {
  background: #fff;
  padding: 20px;
  max-width: 500px;
  width: 100%;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
}
.modal h2 {
  margin-top: 0;
  font-size: 20px;
  color: #2c3e50;
}
.form-group {
  margin-bottom: 12px;
}
.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 4px;
}
.form-group input {
  width: 100%;
  padding: 6px;
  font-size: 14px;
  box-sizing: border-box;
}
.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 12px;
}
.modal-actions button {
  padding: 6px 12px;
  font-size: 14px;
  cursor: pointer;
}
</style>
