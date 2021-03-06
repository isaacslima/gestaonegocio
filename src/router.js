import Vue from 'vue';
import Router from 'vue-router';
import Meta from 'vue-meta';
import firebase from 'firebase';
import NProgress from 'nprogress';

import Home from './views/Home.vue';
import CadastroClientes from './views/CadastroClientes.vue';
import AddEditClient from './views/AddEditClient.vue';
import AddEditService from './views/AddEditService.vue';
import AddEditInvoice from './views/AddEditInvoice.vue';
import CadastroServicos from './views/CadastroServicos.vue';
import FormClient from './views/FormClient.vue';
import Entradas from './views/Entradas.vue';
import Saidas from './views/Saidas.vue';
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
      path: '/cadastro-clientes',
      name: 'cadastro-clientes',
      component: CadastroClientes,
      meta: { requiresAuth: true },
    },
    {
      path: '/addedit-cliente/:id',
      name: 'addedit-cliente',
      component: AddEditClient,
      meta: { requiresAuth: true },
    },
    {
      path: '/addedit-service/:id',
      name: 'addedit-service',
      component: AddEditService,
      meta: { requiresAuth: true },
    },
    {
      path: '/addedit-invoice/:id',
      name: 'addedit-invoice',
      component: AddEditInvoice,
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
      path: '/formulario',
      name: 'formulario',
      component: FormClient,
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
