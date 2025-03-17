import { createRouter, createWebHistory } from "vue-router";
import VerifyEmail from '@/components/VerifyEmail.vue';
import CompleteProfile from '@/views/CompleteProfile.vue';
import HomePage from "../views/HomePage.vue";
import AuthPage from "../views/AuthPage.vue";
import RankingPage from "../views/RankingPage.vue";
import CompetitionPage from "../views/CompetitionPage.vue"; 
import ReservationPage from "../views/ReservationPage.vue"; 
import DashboardPage from "../views/DashboardPage.vue";
import RoomsPage from "../views/RoomsPage.vue";  

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
    path: '/auth/verify/:token',
    name: 'verify-email',
    component: VerifyEmail,
    props: true
  },
  { 
    path: '/complete-profile',
    name: 'CompleteProfile',
    component: CompleteProfile,
  }
];

const router = createRouter({
  history: createWebHistory(),
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
