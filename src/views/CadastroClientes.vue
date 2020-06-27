<template>
  <div class="main-content-container container-fluid px-4">
    <!-- Page Header -->
    <div class="page-header row no-gutters py-4">
      <div class="col-12 col-sm-4 text-center text-sm-left mb-0">
        <h3 class="page-title">Clientes</h3>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <v-card>
          <v-card-title>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="clientes"
            :search="search"
          >
            <template slot="items" slot-scope="props" >
              <td  @click="mostraCliente(props.item['.key'])">{{ props.item.nome }}</td>
              <td >{{ props.item.telefone }}</td>
              <td >{{ props.item.email }}</td>
              <td >{{ props.item.cidade }}</td>
              <td >{{ props.item.dataContato }}</td>
              <td >{{ props.item.dataParto }}</td>
              <td align="center">
                <v-icon color="green" v-if="props.item.interessado">check_circle_outline</v-icon>
              </td>
              <td align="center">
                <v-icon color="green" v-if="props.item.formulario">check_circle_outline</v-icon>
              </td>
              <td >{{ props.item.followup }}</td>
              <td>
                <v-btn-toggle v-model="toggle_multiple" multiple>
                  <v-btn flat color="blue" @click="editaCliente(props.item['.key'])">
                    <v-icon>edit</v-icon>
                  </v-btn>
                  <v-btn flat color="red" @click="desativar(props.item['.key'])" >
                    <v-icon>close</v-icon>
                  </v-btn>
                </v-btn-toggle>
              </td>
            </template>
          </v-data-table>
        </v-card>
        <v-dialog
      v-model="dialog"
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">Confirmar Exclusão</v-card-title>

        <v-card-text>
          Deseja realmente excluir o(a) Cliente?
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="red darken-1"
            flat="flat"
            @click="dialog = false, keyExclusao = null"
          >
            Cancelar
          </v-btn>

          <v-btn
            color="green darken-1"
            flat="flat"
            @click="remover()"
          >
            Excluir
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
      </div>
    </div>
  </div>
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
    pagina: 0,
    keyExclusao: false,
    keys: [],
    toggle_multiple: [0, 1],
    headers: [
      { text: 'Nome', value: 'nome' },
      { text: 'Telefone', value: 'telefone' },
      { text: 'Email', value: 'email' },
      { text: 'Cidade', value: 'cidade' },
      { text: 'Data Contato', value: 'dataContato' },
      { text: 'Data Parto', value: 'dataParto' },
      { text: 'Interessado', value: 'interessado' },
      { text: 'Formulário', value: 'formulario' },
      { text: 'Follow-up', value: 'followup' },
      { text: '', value: 'desativar' },
    ],
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
      clientesRef.child(this.keyExclusao).remove();
      this.dialog = false;
    },
  },
  created() {
    this.verifyLogin();
  },
  beforeMount() {
    const self = this;
    clientesRef.on('child_added', (snapshot) => {
      self.clientes.push(snapshot.val());
    });
  },
};
</script>
