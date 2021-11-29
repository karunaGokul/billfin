import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import store from "@/store";
import axios from "axios";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/home/Index.vue"),
    redirect: { 
      name: 'Dashboard'
    },
    children: [
      {
        path: "/dashboard",
        name: "Dashboard",
        component: () => import("@/views/dashboard/Index.vue"),
      },
      {
        path: "/sign-up-plan",
        name: "Sign Up Plan",
        component: () => import("@/views/admin/SignUpPlan/Index.vue")
      },
      {
        path: "/setup",
        name: "Setup",
        component: () => import("@/views/admin/Setup.vue")
      },
      {
        path: "/my-subscription",
        name: 'Manage Subscription',
        component: () => import("@/views/admin/MySubscription/Index.vue")
      },{
        path: '/bills-payments',
        name: 'Bills & Payments',
        component: () => import("@/views/admin/BillsPayments/Index.vue")
      }
    ],
  },
  {
    path: "/sign-up",
    name: "Sign Up",
    component: () => import("@/views/auth/SignUp.vue"),
    meta: { anonymous: true },
  },
  {
    path: "/verification-email",
    name: "Email Verification",
    component: () => import("@/views/auth/EmailVerification.vue"),
    meta: { anonymous: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => !record.meta.anonymous)) {
    
    if (store.getters.isLoggedIn) {
      const token = store.getters.accessToken;
      if (token)
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        store.dispatch("updateState");
      next();
      return;
    }

    store.dispatch("login").then(() => {
      if (store.getters.isLoggedIn) {
        const token = store.getters.accessToken;
        if (token)
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        next("/");
      } else next("/");
    });
    
  } else {
    next();
  }
});
