import { createRouter, createWebHistory } from "vue-router";
import store from "../store";
import VerifyEmail from '@/components/VerifyEmail.vue';
import CompleteProfile from '@/views/CompleteProfile.vue';
import HomePage from "../views/HomePage.vue";
import AuthPage from "../views/AuthPage.vue";
import RankingPage from "../views/RankingPage.vue";
import CompetitionPage from "../views/CompetitionPage.vue"; 
import ReservationPage from "../views/ReservationPage.vue"; 
import DashboardPage from "../views/DashboardPage.vue";
import RoomsPage from "../views/RoomsPage.vue"; 
import EditProfile from "../views/EditProfile.vue";  

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
    path: "/rankings",
    name: "Ranking",
    component: RankingPage,
  },
  {
    path: "/rooms",      
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
    meta: { requiresAuth: true },
    component: DashboardPage,
  },
  {
    path: "/edit-profile", 
    name: "EditProfile",
    meta: { requiresAuth: true },
    component: EditProfile,
  },
  {
    path: "/auth/verify/:token",
    name: "verify-email",
    component: VerifyEmail,
    props: true,
  },
  { 
    path: "/complete-profile",
    name: "CompleteProfile",
    component: CompleteProfile,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Middleware para verificar autenticación antes de acceder a rutas protegidas
router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    try {
      // Si el usuario no está en el store, intenta obtenerlo desde el backend
      if (!store.state.user) {
        await store.dispatch("fetchUser");
      }

      // Si después de intentar no hay usuario, redirigir a auth
      if (!store.getters.isAuthenticated) {
        return next("/auth");
      }
    } catch (error) {
      console.error("Error verificando autenticación:", error);
      return next("/auth");
    }
  }

  next();
});

export default router;
