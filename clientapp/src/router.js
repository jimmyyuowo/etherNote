import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'
import ChatView from './views/ChatView.vue'
import AboutView from './views/AboutView.vue'

const routes = [
  {
    path: '/note',
    name: 'Note',
    component: HomeView
  },
  {
    path: '/chat',
    name: 'Chat',
    component: ChatView
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router