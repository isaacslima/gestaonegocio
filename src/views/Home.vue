<template>
  <v-app >
    <v-card elevation="24">
      <v-card-title>
        Aniversariantes do mês
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Pesquisar"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="clientes"
        :search="search"
        sort-by="nome"
      ></v-data-table>
    </v-card>
  </v-app>
</template>

<script>
import Vue from 'vue';
import Storage from 'vue-web-storage';
import { clientesRef } from '../firebase';

Vue.use(Storage);

export default {
  data() {
    return {
      clientes: [],
      dateRange: {
        from: null,
        to: null,
      },
      search: '',
      headers: [
        { text: 'Cliente', align: 'start', value: 'nome' },
        { text: 'Aniversario Cliente', value: 'aniversarioMae' },
        { text: 'Aniversário Criança', value: 'aniversarioCrianca' },
      ],
    };
  },
  methods: {
    verifyLogin() {
      this.$emit('logou');
    },
  },
  created() {
    this.verifyLogin();
  },
  beforeMount() {
    const self = this;
    const data = new Date().getMonth() + 1;
    clientesRef.on('child_added', (snapshot) => {
      const dataAniversarioMae = parseInt(snapshot.val().aniversarioMae.substring(3, 5), 10);
      const dataAniversarioCrianca = parseInt(snapshot.val().aniversarioCrianca.substring(3, 5), 10);
      if (dataAniversarioMae === data || dataAniversarioCrianca === data) {
        self.clientes.push(snapshot.val());
      }
    });
  },
};
</script>
<style>
.home{
  background-color: red;
}
</style>

