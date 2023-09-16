import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Insight from '../views/Insight.vue';
import Redirection from '../views/Redirection.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home,
    children: [
      {
        path: 'event-insight',
        name: 'Insight',
        component: Insight
      },
      {
        path: ':eventPublicId',
        name: 'Redirection',
        component: Redirection
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.params.eventPublicId) {
    localStorage.setItem('eventPublicId', to.params.eventPublicId + location.hash);

    next('/event-insight');
  } else {
    next();
  }
})

export default router
