// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import RatesView from '../components/ExchangeRateViewer.vue'
import LoginView from '../components/LoginView.vue'
import RegisterView from '../components/RegisterView.vue'
import RateEntryView from '../components/ExchangeRateEntry.vue'

const routes = [
  { path: '/', component: RatesView },
  { path: '/login', component: LoginView },
  { path: '/register', component: RegisterView },
  { path: '/rate-entry', component: RateEntryView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
