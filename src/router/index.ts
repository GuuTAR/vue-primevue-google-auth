import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '@/views/Login/LoginPage.vue'
import TodoView from '@/views/Todo/TodoPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: TodoView,
      meta: { showMenu: true },
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
