<template>
  <div>
    <v-app-bar app color="blue-grey" dark v-if="login">
      <div class="d-flex align-center" to="/home">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      </div>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-navigation-drawer v-if="login" v-model="drawer" :mini-variant.sync="mini" absolute permanent app>
      <img to="/home" src="./assets/images/image-logo.png" style="width:100%">
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-title>Bem Vindo</v-list-item-title>

        <v-btn
          icon
          @click.stop="mini = !mini"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-list dense>
        <v-list-item to="/home">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Início</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/cadastro-clientes">
          <v-list-item-icon>
            <v-icon>mdi-account-box</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Cadastro Clientes</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/cadastro-servicos">
          <v-list-item-icon>
            <v-icon>mdi-toolbox</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Cadastro Serviços</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/entradas">
          <v-list-item-icon>
            <v-icon>mdi-cash-usd</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Entradas</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/saidas">
          <v-list-item-icon>
            <v-icon>mdi-account-cash-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Saídas</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/usuarios">
          <v-list-item-icon>
            <v-icon>mdi-account-circle</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Usuarios</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="logout">
          <v-list-item-icon>
            <v-icon>mdi-arrow-left</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Sair</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <router-view />
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  data: () => ({
    drawer: false,
    login: false,
    mini: true,
  }),
  updated() {
    this.verificaLogin();
  },
  created() {
    this.verificaLogin();
  },
  methods: {
    verificaLogin() {
      const self = this;
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          self.login = true;
        } else {
          self.login = false;
        }
      });
    },
    logado() {
      this.login = true;
    },
    logout() {
      firebase.auth().signOut().then(() => {
        this.login = false;
        this.$router.replace('login');
      });
    },
  },
};
</script>
