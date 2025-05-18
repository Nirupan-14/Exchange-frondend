// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import RatesView from '../components/ExchangeRateViewer.vue'
import LoginView from '../components/LoginView.vue'
import RegisterView from '../components/RegisterView.vue'
import USD from '../components/Entry.vue'
import Welcome from '../components/Welcome.vue' 

const routes = [
  { path: '/', component: RatesView },
  { path: '/login', component: LoginView },
  { path: '/register', component: RegisterView },
  { path: '/usd', component: USD },
  { path: '/entry', component: USD},
  {
    path: '/welcome',
    name: 'Welcome',
    component: Welcome
  }
  
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
