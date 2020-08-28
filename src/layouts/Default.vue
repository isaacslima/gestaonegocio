<template>
  <v-app fluid>
    <v-row>
      <main-sidebar :items="sidebarItems" v-if="logged" />
      <d-col class="main-content offset-lg-2 offset-md-3 p-0" tag="main" lg="10" md="9" sm="12">
        <main-navbar v-if="logged" />
        <slot v-on:login="loggedin" />
      </d-col>
    </v-row>
  </v-app>
</template>

<script>
import firebase from 'firebase';
import getSidebarItems from '@/data/sidebar-nav-items';

// Main layout components
import MainNavbar from '@/components/layout/MainNavbar/MainNavbar.vue';
import MainSidebar from '@/components/layout/MainSidebar/MainSidebar.vue';

export default {
  name: 'analytics',
  components: {
    MainNavbar,
    MainSidebar,
  },
  data: () => ({
    logged: false,
    sidebarItems: getSidebarItems(),
  }),
  methods: {
    verifyLogin() {
      const self = this;
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          self.logged = true;
        } else {
          self.logged = false;
        }
      });
    },
    loggedin() {
      this.login = true;
    },
  },
  updated() {
    this.verifyLogin();
  },
  created() {
    this.verifyLogin();
  },
};
</script>

