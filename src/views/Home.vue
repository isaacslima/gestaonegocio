<template>
  <v-app>
    <v-card max-width="344">
      <v-card-text>
        <div>Total de Entradas no mês</div>
        <p class="display-1 text--primary">
          R$ {{ totalInvoices }}
        </p>
      </v-card-text>
    </v-card>
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
        :page.sync="page"
      ></v-data-table>
    </v-card>
  </v-app>
</template>

<script>
import Vue from 'vue';
import Storage from 'vue-web-storage';
import { clientesRef, entradasRef } from '../firebase';

Vue.use(Storage);

export default {
  data() {
    return {
      clientes: [],
      totalInvoices: 0,
      page: 0,
      dateRange: {
        from: null,
        to: null,
      },
      mesAtual: new Date().getMonth() + 1,
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
    addInvoiceToSum(invoice) {
      const { pago, dataPagamento, valor } = invoice;
      const mesPagamento = parseInt(dataPagamento.substring(3, 5), 10);
      if (!pago && mesPagamento === this.mesAtual) {
        this.totalInvoices += valor;
      }
    },
  },
  created() {
    this.verifyLogin();
  },
  watch: {
    page(newPage) {
      localStorage.pageHome = newPage;
    },
  },
  mounted() {
    if (localStorage.pageHome) {
      this.page = localStorage.pageHome;
    }
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
    entradasRef.on('child_added', (snapshot) => {
      snapshot.val().entradas.forEach((element) => {
        this.addInvoiceToSum(element);
      });
    });
  },
};
</script>
<style>
.home{
  background-color: red;
}
</style>

