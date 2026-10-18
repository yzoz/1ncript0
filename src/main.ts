import { createWebHistory } from 'vue-router'
import { createPortfolioApp } from './app'
import './styles/main.css'

const root = document.getElementById('app')!
const { app, router } = createPortfolioApp(createWebHistory(), root.hasChildNodes())

await router.isReady()
app.mount(root)
