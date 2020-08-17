<template>
  <div >
    <v-app-bar dense app style="background-color: #759F89" color="blue-grey" dark >
      Cadastro de Clientes
      <v-spacer></v-spacer>
      <v-btn small class="mb-2 mr-1" style="background-color: green" dark @click="newClient()">Novo Cliente</v-btn>
    </v-app-bar>
    <div class="col-12 col-sm-12 text-center text-sm-left mb-0 mt-4">
      <v-card class="card-small mb-4" v-for="item in clientes" :key="item.key">
        <v-card-text flush>
            <h5>
              <b>Nome:</b> {{ item.nome }} <b>Telefone:</b> {{ item.telefone }}
              <b>Interessado: </b>
                <i class="material-icons mr-1 bg-success rounded text-white" v-if="item.interessado" >check</i>
                <i class="material-icons mr-1 bg-danger rounded text-white" v-if="!item.interessado">close</i>
            </h5>
             <div class="text-right">
               <v-btn small class="mb-2 mr-1" style="background-color: blue" dark @click="editClient(item.key)">
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
    doSearch() {
      const self = this;
      // const clientesFiltered = this.clientes.filter((el) => {
      //   return el.nome = el.nome.includes(self.search);
      // })
      const newArray = this.clientes.filter(this.nome.includes(self.search));
      this.clientes = newArray;
    },
    editClient(key) {
      this.$router.replace(`addedit-cliente/${key}`);
    },
    verifyLogin() {
      this.$emit('logou');
    },
    newClient() {
      this.$router.replace('/addedit-cliente/new');
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
      const cliente = {
        key: snapshot.key,
        nome: snapshot.val().nome,
        telefone: snapshot.val().telefone,
        interessado: snapshot.val().interessado,
        aniversarioMae: snapshot.val().aniversarioMae,
      };
      self.clientes.push(cliente);
    });
  },
};
</script>
