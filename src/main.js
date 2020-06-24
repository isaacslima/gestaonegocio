/* eslint-disable */
import Vue from 'vue';
import ShardsVue from 'shards-vue';
import firebase from 'firebase';
import './firebase'
import money from 'v-money'
Vue.use(money, { precision: 4 })

// Styles
import 'bootstrap/dist/css/bootstrap.css';
import '@/scss/shards-dashboards.scss';
import '@/assets/scss/date-range.scss';

// Core
import App from './App.vue';
import router from './router';

// Layouts
import Default from '@/layouts/Default.vue';

ShardsVue.install(Vue);

Vue.component('default-layout', Default);

Vue.config.productionTip = false;
Vue.prototype.$eventHub = new Vue();

let app

firebase.auth().onAuthStateChanged(function () {
  if (!app) {
    app = new Vue({
      firebase,
      router,
      render: h => h(App)
    }).$mount('#app')
  }
})
