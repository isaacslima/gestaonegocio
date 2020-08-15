<template>
  <div class="main-content-container container-fluid px-4">
    <div class="page-header row no-gutters py-4">
      <div class="col-12 col-sm-9 text-center text-sm-left mb-0">
        <h3 class="page-title">Cadastro Serviço</h3>
      </div>
      <div class="col-3 col-sm-3 text-center text-sm-right mb-0">
        <v-btn small style="background-color: green" dark class="mb-2 mr-1" @click="back()">Voltar</v-btn>
      </div>
    </div>
    <div class="col-12 col-sm-12 text-center text-sm-left mb-0">
      <v-form v-on:submit.prevent="salvar" ref="form" v-model="valid" lazy-validation>
        <v-content id="inspire">
          <v-container grid-list-md>
            <v-layout row wrap>
              <v-flex xs12 sm4>
                <v-text-field v-model="nome" required label="Nome"></v-text-field>
              </v-flex>
              <v-flex xs12 sm4>
                Preço<br>
                <money v-model="preco" required class="form-input input-lg" v-bind="money"></money>
              </v-flex>
              <v-flex xs12 sm4>
                <v-text-field v-model="observacao" required label="Observação"></v-text-field>
              </v-flex>
            </v-layout>
            <v-flex xs12 sm4>
                <v-btn small style="background-color: red" dark class="mb-2 mr-1" :disabled="loading" @click="back()">Cancelar</v-btn>
                <v-btn small style="background-color: green" dark class="mb-2 mr-1" :loading="loading" :disabled="loading || !valid" type="submit">Salvar</v-btn>
            </v-flex>

            <v-snackbar v-model="snackbar" :color="color" :multi-line="'multi-line'" :timeout="6000">
              {{ msg }}
              <v-btn dark flat @click="back()">
                Fechar
              </v-btn>
            </v-snackbar>
          </v-container>
        </v-content>
      </v-form>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import Storage from 'vue-web-storage';
import moment from 'moment';
import {
  servicosRef,
} from '../firebase';

Vue.use(Storage);

export default {
  data() {
    return {
      obrigatorio: [
        v => !!v || 'Campo é obrigatório',
      ],
      nome: '',
      id: '',
      money: {
        decimal: ',',
        thousands: '.',
        prefix: 'R$ ',
        suffix: '',
        precision: 2,
        masked: false,
      },
      preco: 0.00,
      observacao: '',
      valid: true,
      loading: false,
      ativo: true,
      snackbar: false,
    };
  },
  created() {
    this.verificaLogin();
    this.id = this.$route.params.id;
    if (this.id === 'new') {
      return;
    }
    this.buscaServico();
  },
  methods: {
    buscaServico() {
      const self = this;
      servicosRef.orderByKey().equalTo(this.id).on('child_added', (snapshot) => {
        self.ativo = snapshot.val().ativo;
        self.nome = snapshot.val().nome;
        self.observacao = snapshot.val().observacao;
        self.preco = snapshot.val().preco;
      });
    },
    back() {
      this.$router.replace('/cadastro-servicos');
    },
    verificaLogin() {
      this.$emit('logou');
    },
    atualizaServico() {
      const self = this;
      servicosRef.child(this.id).update({
        nome: self.nome,
        preco: self.preco,
        observacao: self.observacao,
        ativo: self.ativo,
      }).then(() => {
        self.color = 'success';
        self.msg = 'Cliente Atualizado com sucesso.';
        self.snackbar = true;
        self.$refs.form.reset();
      }).catch((error) => {
        self.color = 'error';
        self.msg = `Cliente não foi atualizado erro: ${error}`;
        self.snackbar = true;
        self.loading = false;
      });
    },
    cadastraServico() {
      const self = this;
      const dados = {
        nome: this.nome,
        preco: this.preco,
        observacao: this.observacao,
        ativo: this.ativo,
        horaLancamento: (moment().format('DD/MM/YYYY HH:mm:ss')),
      };
      servicosRef.orderByChild('nome').equalTo(this.nome).on('value', (snapshot) => {
        if (snapshot.numChildren() === 0) {
          servicosRef.push().set({
            nome: dados.nome,
            ativo: dados.ativo,
            observacao: dados.observacao,
            preco: dados.preco,
            horaLancamento: dados.horaLancamento,
          });
          self.msg = 'Serviço cadastrado com sucesso.';
          self.color = 'success';
          self.snackbar = true;
          self.$refs.form.reset();
        } else {
          self.msg = 'Serviço com o mesmo nome já cadastrado.';
          self.color = 'error';
          self.snackbar = true;
          self.loading = false;
        }
      });
    },
    salvar() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        if (this.id !== 'new') {
          this.atualizaServico();
        } else this.cadastraServico();
      }
    },
    clear() {
      this.loading = false;
      this.$refs.form.reset();
    },
  },
};
</script>

<style>
.form-input {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-bottom: 1px solid black;
    color: #50596c;
    font-size: 16px;
    max-width: 100%;
    outline: 0;
    padding: 2px;
    position: relative;
    transition: all .2s ease;
    width: 100%;
}
.form-input.input-lg {
    font-size: 16px;
}
</style>
