import { createRouter, createWebHistory } from "vue-router";
import store from "../store";
import VerifyEmail from '@/components/VerifyEmail.vue';
import CompleteProfile from '@/views/CompleteProfile.vue';
import HomePage from "../views/HomePage.vue";
import AuthPage from "../views/AuthPage.vue";
import RankingPage from "../views/RankingPage.vue";
import CompetitionPage from "../views/CompetitionPage.vue"; 
import ReservationPage from "../views/ReservationPage.vue"; 
import AdminDashboard from '@/views/AdminDashboard.vue';
import UserDashboard from '@/views/UserDashboard.vue';
import RoomsPage from "../views/RoomsPage.vue"; 
import EditProfile from "../views/EditProfile.vue";  
import CreateCompetition from "../views/CreateCompetition.vue"; 
import EditCompetition from "../views/EditCompetition.vue";   

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
    path: '/dashboard',
    name: 'UserDashboard',
    component: UserDashboard,
    meta: { requiresAuth: true, role: 'user' },
  },
  {
    path: '/admin',
    name: 'AdminDashboard',
    component: AdminDashboard,
    meta: { requiresAuth: true, role: 'admin' },
  },
  {
    path: "/create-competition",
    name: "CreateCompetition",
    component: CreateCompetition,
    meta: { requiresAuth: true, role: 'admin' },
  },
  {
    path: "/edit-competition",
    name: "EditCompetition",
    component: EditCompetition,
    meta: { requiresAuth: true, role: 'admin' },
  },
  {
    path: "/edit-profile", 
    name: "EditProfile",
    meta: { requiresAuth: true },
    component: EditProfile,
  },
  {
    path: "/auth/verify",
    name: "verify-email",
    component: VerifyEmail,
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
      // Intentar obtener el usuario si no está en el store
      if (!store.state.user) {
        console.log("No hay usuario en el store, intentando fetchUser...");
        await store.dispatch("fetchUser");
      }

      // Si no hay usuario autenticado después del fetch, redirigir a auth
      if (!store.state.user) {
        console.warn("No se pudo obtener el usuario autenticado, redirigiendo a /auth");
        return next("/auth");
      }

      const userRole = store.state.user.role;
      console.log("Rol del usuario autenticado:", userRole);

      // Si la ruta requiere un rol específico y no coincide con el del usuario
      if (to.meta.role && to.meta.role !== userRole) {
        console.log("Rol no autorizado. Redirigiendo...");
        return next(userRole === "admin" ? "/admin" : "/dashboard");
      }

    } catch (error) {
      console.error("Error en la verificación de autenticación:", error);
      return next("/auth");
    }
  }

  next();
});

export default router;
