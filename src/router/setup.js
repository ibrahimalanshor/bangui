import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes.js';

export default function setupRouter(app) {
  const router = createRouter({
    routes,
    history: createWebHistory(),
  });

  app.use(router);
}
