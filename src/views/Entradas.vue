<template>
  <div>
    <v-app-bar dense app style="background-color: #759F89" color="blue-grey" dark >
      Cadastro de Entradas
      <v-spacer></v-spacer>
      <v-btn small style="background-color: green" dark class="mb-2 mr-1" @click="editInvoice('new')">Nova Entrada</v-btn>
    </v-app-bar>
    <div class="col-12 col-sm-12 text-center text-sm-left mb-0 mt-4">
      <v-card class="card-small mb-4" v-for="item in entradas" :key="item['.key']">
        <v-card-text class="px-3">
          <h5>
            <b>Cliente: </b> {{ item.cliente }} <b>Data: </b>{{ item.data }} <b>Preço: </b> R$ {{ item.preco.toFixed(2) }} <b>Serviços: </b> {{ item.servico }}
          </h5>
          <div class="row">
            <v-card class="col-3 m-1" v-for="e in item.entradas" :key="e['.key']" >
              <p><b>Pago:</b>
                <i class="material-icons mr-1 bg-success rounded text-white" v-if="e.pago" >check</i>
              <i class="material-icons mr-1 bg-danger rounded text-white" v-if="!e.pago">close</i>
                  <b>Valor:</b> {{ e.valor.toFixed(2) }} <br><b>Data Pagamento:</b> {{ e.dataPagamento }}</p>
            </v-card>
          </div>
          <div class="text-right">
            <v-btn small style="background-color: blue" dark class="mb-2 btn-outline-light mr-1" @click="editInvoice(item.key)">
              <i class="material-icons mr-1 text-white">edit</i>Editar
            </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import Storage from 'vue-web-storage';
import { entradasRef } from '../firebase';

Vue.use(Storage);

export default {
  data: () => ({
    search: '',
    entradas: [],
    dialog: false,
    keyExclusao: false,
    keys: [],
  }),
  methods: {
    editInvoice(key) {
      this.$router.replace(`/addedit-invoice/${key}`);
    },
    verifyLogin() {
      this.$emit('logou');
    },
    confirmRemoveClient(key) {
      this.dialog = true;
      this.keyExclusao = key;
    },
    removeClient() {
      entradasRef.child(this.keyExclusao).remove();
      this.dialog = false;
    },
  },
  created() {
    this.verifyLogin();
  },
  beforeMount() {
    const self = this;
    entradasRef.on('child_added', (snapshot) => {
      const invoice = {
        key: snapshot.key,
        cliente: snapshot.val().cliente,
        data: snapshot.val().data,
        preco: snapshot.val().preco,
        servico: snapshot.val().servico,
        entradas: snapshot.val().entradas,
      };
      self.entradas.push(invoice);
    });
  },
};
</script>
