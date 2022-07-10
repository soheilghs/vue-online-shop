import {createRouter, createWebHistory } from 'vue-router';
import {store} from '@/store';
import Cookies from 'js-cookie';

const Login = () => import('@/views/Login')
const TheContainer = () => import('@/containers/TheContainer')
const Dashboard = () => import('@/views/Dashboard')
const SingleProduct = () => import('@/views/SingleProduct')

export const router = createRouter({
  mode: 'history', // https://router.vuejs.org/api/#mode
  history: createWebHistory(process.env.BASE_URL),
  linkActiveClass: 'active',
  scrollBehavior: () => ({y: 0}),
  routes: configRoutes()
});

function configRoutes() {
  return [
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Home',
      component: TheContainer,
      meta: {
        requiresAuth: true,
        label: 'Home'
      },
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard,
          meta: {
            label: 'Dashboard'
          }
        },
        {
          path: 'product/:id',
          name: 'Product',
          component: SingleProduct,
          meta: {
            label: 'Product'
          }
        },
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        redirectDashboard: true
      }
    }
  ]
}

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (store.getters.isAuthenticated) {
      next();
    } else {
      next({
        path: '/login',
        //query: { redirect: to.fullPath }
      });
    }
  } else {
    if (to.matched.some(record => record.meta.redirectDashboard)) {
      if (Cookies.get('access_token')) {
        next({
          path: '/dashboard',
          //query: { redirect: to.fullPath }
        });
      } else {
        next();
      }
    }
    next() // make sure to always call next()!
  }
});