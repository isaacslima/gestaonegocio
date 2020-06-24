<template>
  <d-navbar-nav class="border-left flex-row">
    <li class="nav-item dropdown">
      <a class="nav-link dropdown-toggle text-nowrap px-3" v-d-toggle.user-actions>
        <img class="user-avatar rounded-circle mr-2" src="@/assets/images/avatars/user.png" alt="User Avatar"> <span class="d-none d-md-inline-block">Bem vindo</span>
      </a>
      <d-collapse id="user-actions" class="dropdown-menu dropdown-menu-small">
        <!-- <d-dropdown-item><i class="material-icons">&#xE7FD;</i> Profile</d-dropdown-item>
        <d-dropdown-item><i class="material-icons">&#xE8B8;</i> Edit Profile</d-dropdown-item>
        <d-dropdown-item><i class="material-icons">&#xE2C7;</i> Files</d-dropdown-item>
        <d-dropdown-item><i class="material-icons">&#xE896;</i> Transactions</d-dropdown-item>
        <d-dropdown-divider /> -->
        <d-dropdown-item class="text-danger" @click="logout()">
          <a>
            <i class="material-icons text-danger">&#xE879;</i> Sair
          </a>
        </d-dropdown-item>
      </d-collapse>
    </li>
  </d-navbar-nav>
</template>

<script>
import firebase from 'firebase';

export default {
  data: () => ({
  }),
  methods: {
    logout() {
      console.log('sair');
      firebase.auth().signOut().then(() => {
        this.login = false;
        this.$router.replace('login');
      });
    },
  },
};
</script>

<style>
  .nav-link:hover {
    cursor: pointer;
  }
</style>
