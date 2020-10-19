<template>
  <v-app id="service">
    <v-card elevation="24">
      <v-card-title>
        Cadastro de Serviços
        <v-btn small style="background-color: green" dark class="mb-2 mr-1" @click="newService()">Novo Serviço</v-btn>
        <v-spacer></v-spacer>
        <v-text-field v-model="search" append-icon="mdi-magnify" label="Pesquisar" single-line hide-details>
        </v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="servicos"
        :search="search"
        sort-by="nome"
        :page.sync="page"
      >
      <template v-slot:item.preco="{ item }">
        <b>R$ {{ item.preco.toFixed(2) }}</b>
      </template>
      <template v-slot:item.edicao="{ item }">
        <v-btn small class="mb-2 mr-1" style="background-color: blue" dark @click="editService(item.key)">
            <i class="material-icons mr-1 text-white">edit</i>
          </v-btn>
          <v-btn small class="mb-2 mr-1" style="background-color: red" dark @click="confirmRemoveService(item.key)">
            <i class="material-icons mr-1 text-white">close</i>
          </v-btn>
      </template>
      </v-data-table>
    </v-card>
    <v-row>
      <v-dialog v-model="dialog" max-width="360">
        <v-card>
          <v-card-title class="headline">Deseja realmente remover o serviço?</v-card-title>
          <v-card-text>
            {{ nome }}
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="dialog = false">
              Não
            </v-btn>
            <v-btn color="green darken-1" text @click="removeService()">
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
import { servicosRef } from '../firebase';

Vue.use(Storage);

export default {
  data: () => ({
    search: '',
    servicos: [],
    dialog: false,
    nome: '',
    page: 0,
    keyExclusao: false,
    keys: [],
    headers: [
      { text: 'Nome', value: 'nome' },
      { text: 'Preço', value: 'preco' },
      { text: 'Observação', value: 'observacao' },
      { text: '', value: 'edicao', sortable: false },
    ],
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
    confirmRemoveService(key, nome) {
      this.dialog = true;
      this.nome = nome;
      this.keyExclusao = key;
    },
    removeService() {
      servicosRef.child(this.keyExclusao).remove();
      this.updateListServices();
      this.dialog = false;
    },
    updateListServices() {
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
  },
  created() {
    this.verifyLogin();
  },
  watch: {
    page(newPage) {
      localStorage.pageService = newPage;
    },
  },
  mounted() {
    if (localStorage.pageService) {
      this.page = localStorage.pageService;
    }
  },
  beforeMount() {
    this.updateListServices();
  },
};
</script>
