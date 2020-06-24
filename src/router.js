import Vue from 'vue';
import Router from 'vue-router';

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

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  linkExactActiveClass: 'exact-active',
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/user-profile-lite',
      name: 'user-profile-lite',
      component: UserProfileLite,
    },
    {
      path: '/components-overview',
      name: 'components-overview',
      component: ComponentsOverview,
    },
    {
      path: '/cadastro-clientes',
      name: 'cadastro-clientes',
      component: CadastroClientes,
    },
    {
      path: '/cadastro-servicos',
      name: 'cadastro-servicos',
      component: CadastroServicos,
    },
    {
      path: '/entradas',
      name: 'entradas',
      component: Entradas,
    },
    {
      path: '/saidas',
      name: 'saidas',
      component: Saidas,
    },
    {
      path: '/tables',
      name: 'tables',
      component: Tables,
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
