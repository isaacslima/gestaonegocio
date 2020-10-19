<template>
  <v-app id="client">
    <v-card elevation="24">
      <v-card-title>
        Cadastro de Clientes
        <v-btn small style="background-color: green" dark class="mb-2 mr-1" @click="newClient()">Novo Cliente</v-btn>
        <v-spacer></v-spacer>
        <v-text-field v-model="search" append-icon="mdi-magnify" label="Pesquisar" single-line hide-details>
        </v-text-field>
      </v-card-title>
      <v-data-table :headers="headers" :items="clientes" :search="search" sort-by="nome" :page.sync="page">
        <template v-slot:item.interessado="{ item }">
          <i class="material-icons mr-1 bg-success rounded text-white" v-if="item.interessado" >check</i>
          <i class="material-icons mr-1 bg-danger rounded text-white" v-if="!item.interessado">close</i>
        </template>
        <template v-slot:item.edicao="{ item }">
          <v-btn small class="mb-2 mr-1" style="background-color: blue" dark @click="editClient(item.key)">
              <i class="material-icons mr-1 text-white">edit</i>
            </v-btn>
            <v-btn small class="mb-2 mr-1" style="background-color: red" dark @click="confirmRemoveClient(item.key, item.nome)">
              <i class="material-icons mr-1 text-white">close</i>
            </v-btn>
        </template>
      </v-data-table>
    </v-card>
    <v-row>
      <v-dialog v-model="dialog" max-width="360">
        <v-card>
          <v-card-title class="headline">Deseja realmente remover o cliente?</v-card-title>
          <v-card-text>
            {{ nome }}
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="dialog = false"> Não </v-btn>
            <v-btn color="green darken-1" text @click="removeService()"> Sim </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-app>
</template>

<script>
import Vue from 'vue';
import Storage from 'vue-web-storage';
import { clientesRef } from '../firebase';

Vue.use(Storage);

export default {
  data: () => ({
    search: '',
    clientes: [],
    pagination: {},
    dialog: false,
    page: 0,
    keyExclusao: false,
    keys: [],
    nome: '',
    toggle_multiple: [0, 1],
    headers: [
      { text: 'Nome', value: 'nome' },
      { text: 'Telefone', value: 'telefone' },
      { text: 'Email', value: 'email' },
      { text: 'Data Parto', value: 'dataParto' },
      { text: 'Interessado', value: 'interessado' },
      { text: '', value: 'edicao', sortable: false },
    ],
  }),
  watch: {
    page(newPage) {
      localStorage.pageClient = newPage;
    },
  },
  methods: {
    editClient(key) {
      this.$router.replace(`addedit-cliente/${key}`);
    },
    verifyLogin() {
      this.$emit('logou');
    },
    newClient() {
      this.$router.replace('/addedit-cliente/new');
    },
    confirmRemoveClient(key, nome) {
      this.dialog = true;
      this.keyExclusao = key;
      this.nome = nome;
    },
    removeClient() {
      clientesRef.child(this.keyExclusao).remove();
      this.dialog = false;
    },
  },
  mounted() {
    if (localStorage.pageClient) {
      this.page = localStorage.pageClient;
    }
  },
  created() {
    this.verifyLogin();
  },
  beforeMount() {
    const self = this;
    clientesRef.on('child_added', (snapshot) => {
      const cliente = {
        key: snapshot.key,
        nome: snapshot.val().nome,
        telefone: snapshot.val().telefone,
        interessado: snapshot.val().interessado,
        email: snapshot.val().email,
        dataParto: snapshot.val().dataParto,
        aniversarioMae: snapshot.val().aniversarioMae,
      };
      self.clientes.push(cliente);
    });
  },
};
</script>
