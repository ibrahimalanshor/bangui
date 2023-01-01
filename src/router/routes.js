import { RouterView } from 'vue-router';

export default [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/home-page.vue'),
  },
  {
    path: '/components',
    component: RouterView,
    children: [
      {
        path: 'button',
        name: 'components.button',
        component: () => import('@/pages/components/button-page.vue'),
      },
    ],
  },
];
