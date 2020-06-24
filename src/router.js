import Vue from 'vue';
import Router from 'vue-router';
import Meta from 'vue-meta';
import firebase from 'firebase';
import NProgress from 'nprogress';

import Home from './views/Home.vue';
import UserProfileLite from './views/UserProfileLite.vue';
import ComponentsOverview from './views/ComponentsOverview.vue';
import CadastroClientes from './views/CadastroClientes.vue';
import CadastroServicos from './views/CadastroServicos.vue';
import Entradas from './views/Entradas.vue';
import Saidas from './views/Saidas.vue';
import Tables from './views/Tables.vue';
import Login from './auth/Login.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  linkExactActiveClass: 'exact-active',
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes: [
    {
      path: '*',
      redirect: '/login',
    },
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: { requiresAuth: true },
    },
    {
      path: '/user-profile-lite',
      name: 'user-profile-lite',
      component: UserProfileLite,
      meta: { requiresAuth: true },
    },
    {
      path: '/components-overview',
      name: 'components-overview',
      component: ComponentsOverview,
      meta: { requiresAuth: true },
    },
    {
      path: '/cadastro-clientes',
      name: 'cadastro-clientes',
      component: CadastroClientes,
      meta: { requiresAuth: true },
    },
    {
      path: '/cadastro-servicos',
      name: 'cadastro-servicos',
      component: CadastroServicos,
      meta: { requiresAuth: true },
    },
    {
      path: '/entradas',
      name: 'entradas',
      component: Entradas,
      meta: { requiresAuth: true },
    },
    {
      path: '/saidas',
      name: 'saidas',
      component: Saidas,
      meta: { requiresAuth: true },
    },
    {
      path: '/tables',
      name: 'tables',
      component: Tables,
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const { currentUser } = firebase.auth();
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth && !currentUser) next('login');
  else if (!requiresAuth && currentUser) next('home');
  else next();
});

router.beforeResolve((to, from, next) => {
  if (to.name) {
    NProgress.start();
  }
  next();
});

router.afterEach(() => {
  NProgress.done();
});

Vue.use(Meta);

export default router;
