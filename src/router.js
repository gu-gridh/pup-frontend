// src/router.js
import { createRouter, createWebHistory } from 'vue-router'
import { nextTick } from 'vue'
import Home from './views/Home.vue'
import Journal from './views/Journal.vue'
import Article from './views/Article.vue'
import NotFound from './views/NotFound.vue'

const routes = [
  { path: '/', name: 'home', component: Home },

  // put the more specific dynamic route first
  { path: '/:journalName/:identifier/:revision', name: 'article', component: Article },

  // then the single-segment dynamic route
  { path: '/:journalName', name: 'journal', component: Journal },

  // 👇 Vue Router v4 catch-all — must be LAST
  { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFound },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return new Promise((resolve) => {
        setTimeout(() => {
          nextTick(() => {
            resolve({ el: to.hash, behavior: 'smooth' })
          })
        }, 500)
      })
    }
    return savedPosition || { left: 0, top: 0 }
  },
})

export default router