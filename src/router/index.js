import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Insight from '../views/Insight.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home,
    children: [
      {
        path: '',
        name: 'Insight',
        component: Insight
      }
    ]
  },
  {
    path: '/:eventPublicId',
    component: Home,
    children: [
      {
        path: '',
        name: 'Insight',
        component: Insight
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
