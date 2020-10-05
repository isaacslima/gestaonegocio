<template>
  <div>
    <v-navigation-drawer v-if="login" v-model="drawer" :mini-variant.sync="mini" permanent app>
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="@/assets/images/logo-materno.png"></v-img>
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
    <v-container>
      <router-view />
    </v-container>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  data: () => ({
    drawer: false,
    login: false,
    mini: false,
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
