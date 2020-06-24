<template>
<d-col class="main-content offset-lg-2 offset-md-3 p-0" tag="main" lg="10" md="9" sm="12">
    <d-container fluid class="main-content-container px-4">
      <d-row no-gutters class="page-header py-2 pb-4 mb-3">
        <d-col col sm="4" class="text-center text-sm-left mb-4 mb-sm-0">
          <img id="main-logo" class="d-inline-block align-top mr-1" style="max-width: 360px;" src="@/assets/images/image-logo.png" alt="Shards Dashboard">
        </d-col>
      </d-row>
      <d-row>
        <d-col lg="6" class="mb-4">
          <d-card class="card-small">
            <!-- Form Example -->
            <d-card-header class="border-bottom">
              <h6 class="m-0">Login</h6>
            </d-card-header>
            <d-list-group flush>
              <d-list-group-item class="p-3">
                <d-row>
                  <d-col>
                    <d-form>
                      <d-form-row class="pb-3">
                        <d-col md="12" class="form-group">
                          <label for="feEmailAddress">Email</label>
                          <d-input id="feEmailAddress" v-model="email" type="email" placeholder="Email" />
                        </d-col>
                        <d-col md="12">
                          <label for="fePassword">Senha</label>
                          <d-input id="fePassword" v-model="password" type="password" placeholder="Password" />
                        </d-col>
                      </d-form-row>
                      <d-button @click="doLogin()">Entrar</d-button>
                    </d-form>
                  </d-col>
                </d-row>
              </d-list-group-item>
            </d-list-group>
          </d-card>
        </d-col>
      </d-row>
    </d-container>
  </d-col>
</template>
<script>
</script>

<script>
export default {
  data: () => ({
    email: '',
    password: ''
  }),
  methods: {
    doLogin() {
      console.log(this.email + this.password);
      this.$router.push('/home');
    },
  }
};
</script>
