import Vue from "vue";
import Router from "vue-router";
import Login from "../components/Login";
import Register from "../components/Register";
import Dashboard from "../components/Dashboard";
import firebase from "firebase";
Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/register",
      name: "Register",
      component: Register
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    }
  ]
});

//Restrict user access to dashboard
router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth && !currentUser) {
    next("/login");
  } else if (!requiresAuth && currentUser) {
    next("/dashboard");
  } else {
    next();
  }
});

export default router;
