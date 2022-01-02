import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../components/Register.vue'
import Login from '../components/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import AuthService from '../services/auth.service'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/verify-user/:id',
    name: 'VerifyUser',
    component: () => import(/* webpackChunkName: "about" */ '../views/VerifyUser.vue')
  },
  {
    path: '/forget-password',
    name: 'ForgetPassword',
    component: () => import(/* webpackChunkName: "about" */ '../views/ForgetPassword.vue')
  },
  {
    path: '/reset-password',
    name: 'ResetPassword',
    component: () => import(/* webpackChunkName: "about" */ '../views/ResetPassword.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  if ((to.name === 'Login' || to.name === 'Register') && AuthService.checkToken()) {
    next({
      path: '/dashboard'
    })
  } else if (to.meta && to.meta.requiresAuth && !AuthService.checkToken()) {
    console.log('WYMAGANA AUTORYZACJA')
    next({
      path: '/login'
    })
  }
  next()

})
export default router
