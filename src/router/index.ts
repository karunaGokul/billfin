import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import store from '@/store';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/home/Index.vue'),
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: () => import('@/views/auth/SignUp.vue'),
    meta: { anonymous: true }
  },
  {
    path: '/email-verification',
    name: 'EmailVerification',
    component: () => import('@/views/auth/Email-Verification.vue'),
    meta: { anonymous: true }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router


router.beforeEach((to, from, next) => {
  if (to.matched.some(record => !record.meta.anonymous)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/sign-up')
  } else {
    next()
  }
})