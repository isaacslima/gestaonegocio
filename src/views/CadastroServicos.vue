<template>
  <div class="main-content-container container-fluid px-4">
    <!-- Page Header -->
    <div class="page-header row no-gutters py-4">
      <div class="col-12 col-sm-9 text-center text-sm-left mb-0">
        <h3 class="page-title">Servicos</h3>
      </div>
      <div class="col-3 col-sm-3 text-center text-sm-right mb-0">
        <d-button theme="success" class="mb-2 mr-1">Novo Serviço</d-button>
      </div>
    </div>
    <div class="col-12 col-sm-12 text-center text-sm-left mb-0">
      <d-card class="card-small mb-4" v-for="item in servicos" :key="item['.key']">
        <d-list-group flush>
          <d-list-group-item class="px-3">
            <h5>
              <b>Nome:</b> {{ item.nome }} <b>Preço:</b> R$ {{ item.preco.toFixed(2) }}
            </h5>
            <h5>
              Observação: {{ item.observacao }}
            </h5>
          </d-list-group-item>
        </d-list-group>
        <d-list-group flush class="text-right">
          <d-button size="sm" theme="primary" class="mb-2 btn-outline-light mr-1">
            <i class="material-icons mr-1 bg-primary text-white">edit</i>Editar
          </d-button>
        </d-list-group>
      </d-card>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import Storage from 'vue-web-storage';
import { servicosRef } from '../firebase';

Vue.use(Storage);

export default {
  data: () => ({
    search: '',
    servicos: [],
    dialog: false,
    keyExclusao: false,
    keys: [],
  }),
  methods: {
    editClient(key) {
      Vue.$localStorage.set('idEdita', key);
      Vue.$localStorage.set('pagina', this.pagination.page);
      this.$router.replace('edita-cliente');
    },
    verifyLogin() {
      this.$emit('logou');
    },
    confirmRemoveClient(key) {
      this.dialog = true;
      this.keyExclusao = key;
    },
    removeClient() {
      servicosRef.child(this.keyExclusao).remove();
      this.dialog = false;
    },
  },
  created() {
    this.verifyLogin();
  },
  beforeMount() {
    const self = this;
    servicosRef.on('child_added', (snapshot) => {
      self.servicos.push(snapshot.val());
    });
  },
};
</script>
