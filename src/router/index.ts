import { createRouter, type RouterHistory, type RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ServiceView from '../views/ServiceView.vue'

export const routes: RouteRecordRaw[] = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/services/:slug', name: 'service', component: ServiceView }
]

export function createAppRouter (history: RouterHistory) {
  return createRouter({
    history,
    routes,
    scrollBehavior (to, from, savedPosition) {
      function target () {
        if (savedPosition) {
          return savedPosition
        }
        if (to.hash) {
          return { el: to.hash, behavior: 'smooth' as const }
        }
        return { top: 0 }
      }

      const samePage = from.path === to.path
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (samePage || reduced) {
        return target()
      }
      return new Promise((resolve) => {
        window.setTimeout(() => {
          resolve(target())
        }, 300)
      })
    }
  })
}
