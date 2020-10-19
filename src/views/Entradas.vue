<template>
  <v-app id="crudInvoice">
    <v-card elevation="24">
      <v-card-title>
        Cadastro de Entradas
        <v-btn small style="background-color: green" dark class="mb-2 mr-1" @click="editInvoice('new')">Nova Entrada
        </v-btn>
        <v-spacer></v-spacer>
        <v-text-field v-model="search" append-icon="mdi-magnify" label="Pesquisar" single-line hide-details>
        </v-text-field>
      </v-card-title>
      <v-data-table :headers="headers" :items="entradas" :search="search" sort-by="nome" :page.sync="page">
        <template v-slot:item.preco="{ item }">
          <b>R$ {{ item.preco.toFixed(2) }}</b>
        </template>
        <template v-slot:item.edicao="{ item }">
          <v-btn small class="mb-2 mr-1" style="background-color: blue" dark @click="editInvoice(item.key)">
            <i class="material-icons mr-1 text-white">edit</i>
          </v-btn>
          <v-btn small class="mb-2 mr-1" style="background-color: red" dark
            @click="confirmRemoveInvoice(item.key, item.cliente, item.servico)">
            <i class="material-icons mr-1 text-white">close</i>
          </v-btn>
        </template>
        <template v-slot:item.entradas="{ item }">
          {{ item.entradas.length }}
        </template>
      </v-data-table>
    </v-card>
    <v-row>
      <v-dialog v-model="dialog" max-width="360">
        <v-card>
          <v-card-title class="headline">Deseja realmente remover a entrada?</v-card-title>
          <v-card-text>
            Do cliente: {{ nomeCliente }}<br>
            Serviço: {{ nomeServico }}
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="dialog = false">
              Não
            </v-btn>
            <v-btn color="green darken-1" text @click="removeInvoice()">
              Sim
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-app>
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
    nomeCliente: '',
    page: 0,
    nomeServico: '',
    keyExclusao: false,
    keys: [],
    headers: [
      { text: 'Nome', value: 'cliente' },
      { text: 'Telefone', value: 'data' },
      { text: 'Email', value: 'preco' },
      { text: 'Serviço', value: 'servico' },
      { text: 'Observação', value: 'observacao' },
      // { text: 'entradas', value: 'entradas' },
      { text: '', value: 'edicao', sortable: false },
    ],
  }),
  methods: {
    editInvoice(key) {
      this.$router.replace(`/addedit-invoice/${key}`);
    },
    verifyLogin() {
      this.$emit('logou');
    },
    confirmRemoveInvoice(key, nomeCliente, nomeServico) {
      this.dialog = true;
      this.nomeCliente = nomeCliente;
      this.nomeServico = nomeServico;
      this.keyExclusao = key;
    },
    removeInvoice() {
      entradasRef.child(this.keyExclusao).remove();
      this.updateListInvoices();
      this.dialog = false;
    },
    updateListInvoices() {
      const self = this;
      this.entradas = [];
      entradasRef.on('child_added', (snapshot) => {
        const invoice = {
          key: snapshot.key,
          cliente: snapshot.val().cliente,
          data: snapshot.val().data,
          preco: snapshot.val().preco,
          servico: snapshot.val().servico,
          observacao: snapshot.val().observacao,
          entradas: snapshot.val().entradas,
        };
        self.entradas.push(invoice);
      });
    },
  },
  created() {
    this.verifyLogin();
  },
  watch: {
    page(newPage) {
      localStorage.pageInvoices = newPage;
    },
  },
  mounted() {
    if (localStorage.pageInvoices) {
      this.page = localStorage.pageInvoices;
    }
  },
  beforeMount() {
    this.updateListInvoices();
  },
};
</script>
