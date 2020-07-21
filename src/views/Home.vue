<template>
  <d-container fluid class="main-content-container px-4">
    <!-- Page Header -->
    <d-row no-gutters class="page-header py-4">
      <d-col col sm="4" class="text-center text-sm-left mb-4 mb-sm-0">
        <h3 class="page-title">DashBoard</h3>
      </d-col>
    </d-row>

    <!-- Small Stats Blocks -->
    <d-row v-if="false">
      <d-col lg v-for="(stats, idx) in smallStats" :key="idx" class="mb-4">
        <small-stats :id="`small-stats-${idx}`" variation="1" :chart-data="stats.datasets" :label="stats.label" :value="stats.value" :percentage="stats.percentage" :increase="stats.increase" :decrease="stats.decrease" />
      </d-col>
    </d-row>
    <d-row>
      <d-card class="card-small col-12">
        <!-- Form Example -->
        <d-card-header class="border-bottom">
          <h6 class="m-0">Aniversariantes do mês</h6>
        </d-card-header>
        <d-list-group class="border-bottom" flush v-for="item in clientes" :key="item['.key']">
          <d-list-group-item class="p-3">
            <h5>
            <b> Cliente: </b> {{ item.nome }}
            <br> <b>Aniversario Cliente</b> {{ item.aniversarioMae }}
            <br> <b>Aniversário Criança</b> {{ item.aniversarioCrianca }}
            </h5>
          </d-list-group-item>
        </d-list-group>
      </d-card>
    </d-row>
  </d-container>
</template>

<script>
import SmallStats from '@/components/common/SmallStats.vue';

import Vue from 'vue';
import Storage from 'vue-web-storage';
import { clientesRef } from '../firebase';

Vue.use(Storage);

export default {
  components: {
    SmallStats,
  },
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
    handleApprove(id) {
      alert(`Approving discussion id: ${id}`); // eslint-disable-line no-alert
    },
    handleReject(id) {
      alert(`Rejecting discussion id: ${id}`); // eslint-disable-line no-alert
    },
    handleEdit(id) {
      alert(`Editing discussion id: ${id}`); // eslint-disable-line no-alert
    },
    handleViewAllComments() {
      alert('Viewing all comments!'); // eslint-disable-line no-alert
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

