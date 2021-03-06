/* eslint-disable */
import Vue from 'vue';
import firebase from 'firebase';
import './firebase'
import money from 'v-money'
Vue.use(money, { precision: 4 })

// Styles
import 'bootstrap/dist/css/bootstrap.css';
import '@/assets/scss/date-range.scss';

// Core
import App from './App.vue';
import router from './router';

// Layouts
import Default from '@/layouts/Default.vue';

import vuetify from './plugins/vuetify';

Vue.component('default-layout', Default);

Vue.config.productionTip = false;
Vue.prototype.$eventHub = new Vue();

let app

firebase.auth().onAuthStateChanged(function () {
  if (!app) {
    app = new Vue({
      firebase,
      router,
      vuetify,
      render: h => h(App)
    }).$mount('#app')
  }
})
