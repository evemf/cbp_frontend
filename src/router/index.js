// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
import AuthPage from "../views/AuthPage.vue";
import RankingPage from "../views/RankingPage.vue";
import CompetitionPage from "../views/CompetitionPage.vue"; 
import ReservationPage from "../views/ReservationPage.vue"; 
import DashboardPage from "../views/DashboardPage.vue";
import RoomsPage from "../views/RoomsPage.vue";  // Asegúrate de que este componente exista

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/auth",
    name: "Auth",
    component: AuthPage,
  },
  {
    path: "/competitions",
    name: "Competitions",
    component: CompetitionPage,
  },
  {
    path: "/rankings",   // Ajustado a plural para que coincida con la navegación
    name: "Ranking",
    component: RankingPage,
  },
  {
    path: "/rooms",      // Agregada la ruta para "/rooms"
    name: "Rooms",
    component: RoomsPage,
  },
  {
    path: "/reservations",
    name: "Reservations",
    component: ReservationPage,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: DashboardPage,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token');
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/auth');
  } else {
    next();
  }
});

export default router;
