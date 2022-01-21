import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import store from "@/store";
import axios from "axios";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/home/Index.vue"),
    redirect: {
      name: "Dashboard",
    },
    children: [
      {
        path: "/dashboard",
        name: "Dashboard",
        component: () => import("@/views/dashboard/Index.vue"),
      },
      {
        path: "/signup",
        name: "Sign Up",
        component: () => import("@/views/admin/SignUpPlan/Index.vue"),
      },
      {
        path: "/setup",
        name: "Setup",
        component: () => import("@/views/admin/Setup.vue"),
      },
      {
        path: "/my-subscription",
        name: "Manage Subscription",
        component: () => import("@/views/admin/MySubscription/Index.vue"),
      },
      {
        path: "/help",
        name: "Help",
        component: () => import("@/views/admin/Help.vue"),
      },
      {
        path: "/bills-payments",
        name: "Bills & Payments",
        component: () => import("@/views/admin/BillsPayments/Index.vue"),
      },
      {
        path: "/payment",
        name: "Payment Method",
        component: () => import("@/views/admin/PaymentMethod/Index.vue"),
        props: true
      },
      {
        path: "/clients",
        name: "Clients",
        component: () => import("@/views/client-info/Clients.vue"),
      },
      {
        path: "/fee-schedules",
        name: "Fee Schedules",
        component: () => import("@/views/client-info/FeeSchedules.vue"),
      },
      {
        path: "/products",
        name: "Products",
        component: () => import("@/views/client-info/Products.vue"),
      },
      {
        path: "/subscriptions",
        name: "Subscriptions",
        component: () => import("@/views/client-info/Subscriptions.vue"),
      },
      {
        path: "/timesheets",
        name: "Timesheets",
        component: () => import("@/views/client-info/Timesheets.vue"),
      },
      {
        path: "/fees",
        name: "Fees",
        component: () => import("@/views/bills-payments/Fees.vue"),
      },
      {
        path: "/invoices",
        name: "Invoices",
        component: () => import("@/views/bills-payments/Invoices.vue"),
      },
      {
        path: "/payments",
        name: "Payments",
        component: () => import("@/views/bills-payments/Payments.vue"),
      },
      {
        path: "/reports",
        name: "Reports",
        component: () => import("@/views/bills-payments/Reports.vue"),
      },
      {
        path: "/add-more-addons",
        name: "Sign Up For Add-Ons",
        component: () => import("@/views/admin/SignUpForAddons/Index.vue")
      },
      {
        path: "/add-users",
        name: "Add Users",
        component: () => import("@/views/admin/SignUpForAddons/Index.vue")
      },
      {
        path: "/add-connectors",
        name: "Add Connectors",
        component: () => import("@/views/admin/SignUpForAddons/Index.vue")
      },
      {
        path: "/change-plan",
        name: "Change Plan",
        component: () => import("@/views/admin/ChangePlan/Index.vue")
      },
      {
        path: "/account-expired",
        name: 'Account Expired',
        component: () => import("@/views/auth/account-expired/Index.vue")
      },
      {
        path: '/account-expired/signup',
        name: 'Reactivate Account',
        component: () => import("@/views/admin/SignUpPlan/Index.vue"),
      }
    ],
  },
  {
    path: "/sign-up",
    name: "Sign-Up",
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
      store.dispatch("loadSettings");
      store.dispatch("loadEntitlements").then(() => {
        next();
      });
      return;
    }

    store.dispatch("login").then(() => {
      store.dispatch("clearFirm");
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
