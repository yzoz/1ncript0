import { createApp, createSSRApp } from 'vue'
import type { RouterHistory } from 'vue-router'
import App from './App.vue'
import { createAppRouter } from './router'

export function createPortfolioApp (history: RouterHistory, hydrate = false) {
  const app = hydrate ? createSSRApp(App) : createApp(App)
  const router = createAppRouter(history)
  app.use(router)
  return { app, router }
}
