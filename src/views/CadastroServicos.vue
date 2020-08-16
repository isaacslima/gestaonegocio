<template>
  <div class="main-content-container container-fluid px-4">
    <!-- Page Header -->
    <div class="page-header row no-gutters py-4">
      <div class="col-12 col-sm-9 text-center text-sm-left mb-0">
        <h3 class="page-title">Servicos</h3>
      </div>
      <div class="col-3 col-sm-3 text-center text-sm-right mb-0">
        <v-btn small style="background-color: red" dark class="mb-2 mr-1" @click="newService()">Novo Serviço</v-btn>
      </div>
    </div>
    <div class="col-12 col-sm-12 text-center text-sm-left mb-0">
      <d-card class="card-small mb-4" v-for="item in servicos" :key="item.key">
        <d-list-group flush>
          <d-list-group-item class="px-3">
            <h5>
              <b>Nome:</b> {{ item.nome }} <b>Preço:</b> R$ {{ item.preco.toFixed(2) }}
            </h5>
            <h5>
              Observação: {{ item.observacao }}
            </h5>
            <div class="text-right">
              <v-btn small style="background-color: blue" dark class="mb-2 btn-outline-light mr-1" @click="editService(item.key)">
                <i class="material-icons mr-1 bg-primary text-white">edit</i>Editar
              </v-btn>
            </div>
          </d-list-group-item>
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
    newService() {
      this.$router.replace('/addedit-service/new');
    },
    editService(key) {
      this.$router.replace(`/addedit-service/${key}`);
    },
    verifyLogin() {
      this.$emit('logou');
    },
    confirmRemoveService(key) {
      this.dialog = true;
      this.keyExclusao = key;
    },
    removeService() {
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
      const servico = {
        key: snapshot.key,
        nome: snapshot.val().nome,
        preco: snapshot.val().preco,
        observacao: snapshot.val().observacao,
      };
      self.servicos.push(servico);
    });
  },
};
</script>
