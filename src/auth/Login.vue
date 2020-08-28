<template>
<v-app class="main-content offset-lg-2 p-0" tag="main" lg="10" md="9" sm="12">
    <div fluid class="main-content-container px-4">
      <v-row no-gutters class="page-header py-2 pb-4 mb-3">
        <v-col col sm="4" class="text-center text-sm-left mb-4 mb-sm-0">
          <img id="main-logo" class="d-inline-block align-top mr-1" style="max-width: 360px;" src="@/assets/images/image-logo.png" alt="Shards Dashboard">
        </v-col>
      </v-row>
      <v-row>
        <v-col lg="6" class="mb-4">
          <v-card class="card-small">
            <!-- Form Example -->
            <v-card-header class="border-bottom">
              <h6 class="m-0">Login</h6>
            </v-card-header>
            <v-card-text flush>
                <v-row>
                  <v-col>
                      <v-col md="12" class="form-group">
                        <v-text-field label="Email" id="feEmailAddress" v-model="email" type="email" placeholder="Email" />
                      </v-col>
                      <v-col md="12">
                        <v-text-field label="Senha" id="fePassword" v-model="password" type="password" placeholder="Password" />
                      </v-col>
                    <v-btn @click="doLogin()">Entrar</v-btn>
                  </v-col>
                </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-app>
</template>
<script>
</script>

<script>
import firebase from 'firebase'
import Vue from 'vue'
import Storage from 'vue-web-storage'
Vue.use(Storage)
export default {
  data: () => ({
    email: '',
    password: ''
  }),
  methods: {
    doLogin() {
      var self = this
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.salvaUid()
          this.$emit('login')
          this.$router.replace('/home')
        }).catch(function () {
          self.snackbar = true
          self.color = 'error'
          self.msg = 'Senha ou email incorretos'
        })
    },
    salvaUid () {
      var user = firebase.auth().currentUser
      Vue.$localStorage.set('id', user.uid)
    },
  }
};
</script>
