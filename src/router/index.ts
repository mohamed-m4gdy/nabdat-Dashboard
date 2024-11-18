import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHistory } from 'vue-router'
import { isUserLoggedIn } from './utils'
import routes from '~pages'

const secureRoutes = routes.map(route => {
  return {
    ...route,
    meta: {
      ...route.meta,
      requiresAuth: true,
    },
  }
})

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...setupLayouts(secureRoutes),
  ],
})

// Docs: https://router.vuejs.org/guide/advanced/navigation-guards.html#global-before-guards

router.beforeEach((to, from, next) => {
  const isLoggedIn = isUserLoggedIn()
  // auth middleware
  if (isLoggedIn) {
    if (!to.meta.loginPage) {
      return next()
    } else {
      return next({ name: 'index' })
    }
  } 
  // gest middleware
  else {
    if (to.meta.loginPage) {
      return next()
    } else {
      return next({ name: 'login' })
    }
  }
  
})

export default router
