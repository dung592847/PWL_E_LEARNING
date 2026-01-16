import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CompanyView from '../views/CompanyView.vue'
import ArmanIndustriesView from '../views/ArmanIndustriesView.vue'
import LeanManagementView from '../views/LeanManagementView.vue'
import AbcXyzView from '../views/AbcXyzView.vue'
import MatrixMinimumView from '../views/MatrixMinimumView.vue'
import ConflictView from '../views/ConflictView.vue'
import QuizView from '../views/QuizView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/company', component: CompanyView },
  { path: '/arman-industries', component: ArmanIndustriesView },
  { path: '/lean', component: LeanManagementView },
  { path: '/abc-xyz', component: AbcXyzView },
  { path: '/matrix', component: MatrixMinimumView },
  { path: '/conflict', component: ConflictView },
  { path: '/quiz/:topic?', component: QuizView }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  }
})

export default router
