<template>
  <div class="dashboard">
    <h1>Welcome to Your Dashboard!</h1>
    <div v-if="user && user.email" class="user-info">
      <p>You're logged in as: <strong>{{ user.email }}</strong></p>
      <p>Name: <strong>{{ user.first_name }} {{ user.last_name }}</strong></p>
      <p>Country: <strong>{{ user.country }}</strong></p>
      <p>Phone Number: <strong>{{ user.phone_number }}</strong></p>
      <p>Gender: <strong>{{ user.gender }}</strong></p>
      <p>Birth Date: <strong>{{ new Date(user.birth_date).toLocaleDateString() }}</strong></p>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
    <div v-if="error" class="error">
      <p>{{ error }}</p>
    </div>
    <div class="actions">
      <button @click="logout" class="btn logout">Log Out</button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "DashboardPage",
  data() {
    return {
      user: null,
      error: null,
    };
  },
  computed: {
    ...mapGetters(["getUser", "isAuthenticated"]),
  },
  methods: {
    ...mapActions(["logout"]),
    fetchUserData() {
      if (this.isAuthenticated) {
        this.user = this.getUser;
      } else {
        this.error = "You are not authenticated.";
      }
    },
  },
  created() {
    this.fetchUserData();
  },
};
</script>

<style scoped>
.dashboard {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 24px;
  color: #333;
}

.user-info {
  text-align: left;
  margin-top: 20px;
}

.user-info p {
  font-size: 16px;
  color: #555;
  margin: 5px 0;
}

.error {
  color: red;
  margin-top: 20px;
}

.actions {
  margin-top: 30px;
}

.btn.logout {
  padding: 12px 24px;
  background-color: #ff4d4d;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn.logout:hover {
  background-color: #cc3d3d;
}
</style>
