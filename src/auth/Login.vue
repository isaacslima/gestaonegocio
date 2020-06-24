<template>
  <div>
    <d-container fluid class="main-content-container px-4">

      <!-- Page Header -->
      <d-row no-gutters class="page-header py-2 pb-4 mb-3 border-bottom">
        <d-col col sm="4" class="text-center text-sm-left mb-4 mb-sm-0">
          <img id="main-logo" class="d-inline-block align-top mr-1" style="max-width: 360px;" src="@/assets/images/image-logo.png" alt="Shards Dashboard">
        </d-col>
      </d-row>

      <d-row>
        <d-col lg="8" class="mb-4">
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
                      <d-form-row>
                        <d-col md="12" class="form-group">
                          <label for="feEmailAddress">Email</label>
                          <d-input id="feEmailAddress" type="email" placeholder="Email" />
                        </d-col>
                        <d-col md="12">
                          <label for="fePassword">Password</label>
                          <d-input id="fePassword" type="password" placeholder="Password" />
                        </d-col>
                      </d-form-row>
                      <d-button type="submit">Entrar</d-button>
                    </d-form>
                  </d-col>
                </d-row>
              </d-list-group-item>
            </d-list-group>

          </d-card>
        </d-col>

      </d-row>
    </d-container>
  </div>
</template>
