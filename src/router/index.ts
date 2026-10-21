import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/Home/HomePage.vue'
import LoginView from '@/views/Login/LoginPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { showMenu: false },
    },
  ],
})

export default router
