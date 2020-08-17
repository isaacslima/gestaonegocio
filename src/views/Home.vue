<template>
  <v-container fluid>
    <v-app-bar app style="background-color: #759F89" color="blue-grey" dark >
      Aniversariantes do mês
    </v-app-bar>
    <v-row class="mt-4">
      <v-card class="card-small col-12">
        <v-card-text class="border-bottom" flush v-for="item in clientes" :key="item['.key']">
            <h5>
            <b> Cliente: </b> {{ item.nome }}
            <br> <b>Aniversario Cliente</b> {{ item.aniversarioMae }}
            <br> <b>Aniversário Criança</b> {{ item.aniversarioCrianca }}
            </h5>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
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

