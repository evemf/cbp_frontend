import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import 'vuetify/styles';

const vuetify = createVuetify({
  components,
  directives,
});

const app = createApp(App);

app.use(vuetify);
app.use(router);
app.use(store);

// Esperar a que fetchUser termine ANTES de montar la app
store.dispatch("fetchUser").finally(() => {
  app.mount("#app");
});

// Manejar autenticación en las rutas protegidas
router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    await store.dispatch("fetchUser"); // Esperamos la carga del usuario

    if (!store.getters.isAuthenticated) {
      next({ name: "Auth" });
    } else {
      next();
    }
  } else {
    next();
  }
});
