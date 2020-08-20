<template>
  <v-form v-on:submit.prevent="cadastrar" ref="form" class="white form" v-model="valid" lazy-validation>
    <v-content id="inspire">
      <v-container grid-list-md>
        <v-layout align-center justify-center row wrap>
          <img src="@/assets/images/image-logo.png" style="width:70%" height="70%">
          <v-alert :value="formularioOk" type="success">
            Obrigado os seus dados foram enviados com sucesso.
          </v-alert>
        </v-layout>
        <div v-if="!formularioOk">
          <h2>Formulário Cadastro Espaço Materno</h2>
          <p>Preencha todos os campos com * ele são obrigatórios </p>
          <v-layout row wrap>
            <v-flex xs12 sm5>
              <v-text-field v-model="nome" required :rules="obrigatorio" label="Nome *"></v-text-field>
            </v-flex>
            <v-flex xs12 sm2>
              <v-text-field v-model="telefone" required :rules="obrigatorio" mask="(##) # ####-####" label="Telefone *">
              </v-text-field>
            </v-flex>
            <v-flex xs12 sm2>
              <v-text-field v-model="instagram" required prepend-inner-icon="alternate_email" label="Instagram">
              </v-text-field>
            </v-flex>
            <v-flex xs12 sm3>
              <v-text-field v-model="email" required :rules="obrigatorio" label="E-mail *"></v-text-field>
            </v-flex>
            <v-flex xs12 sm3>
              <v-text-field v-model="indicacao" required label="Indicação"></v-text-field>
            </v-flex>

            <v-flex xs12 sm2>
              <v-text-field v-model="aniversarioMae" label="Data Nascimento Mãe" mask="##/##/####" hint="dd/mm/aaaa"
                persistent-hint></v-text-field>
            </v-flex>
            <v-flex xs12 sm5>
              <v-text-field v-model="nomePai" required label="Nome Pai"></v-text-field>
            </v-flex>
            <v-flex xs12 sm2>
              <v-text-field v-model="telefonePai" required mask="(##) # ####-####" label="Telefone Pai"></v-text-field>
            </v-flex>
            <v-flex xs12 sm3>
              <v-text-field v-model="cep" required @change="validaCEP" mask="##.###-###" append-icon="search"
                :rules="obrigatorio" @click:append="validaCEP" label="CEP *"></v-text-field>
            </v-flex>
            <v-flex xs12 sm3>
              <v-text-field v-model="logradouro" required :rules="obrigatorio" label="Logradouro *"></v-text-field>
            </v-flex>
            <v-flex xs12 sm3>
              <v-text-field v-model="numero" :rules="obrigatorio" required label="Número *"></v-text-field>
            </v-flex>
            <v-flex xs12 sm3>
              <v-text-field v-model="complemento" required label="Complemento"></v-text-field>
            </v-flex>
            <v-flex xs12 sm3>
              <v-text-field v-model="bairro" required :rules="obrigatorio" label="Bairro *"></v-text-field>
            </v-flex>
            <v-flex xs12 sm3>
              <v-text-field v-model="cidade" required :rules="obrigatorio" label="Cidade *"></v-text-field>
            </v-flex>
            <v-flex xs12 sm3>
              <v-text-field v-model="uf" required :rules="obrigatorio" label="Estado *"></v-text-field>
            </v-flex>
          </v-layout>
          <v-card class="light-gray p-4" style="width:100%">
            <v-layout row wrap v-for="(item, index) in filhos" v-bind:key="item.id" mb-3>
              <v-card-title>{{ index + 1 }}º Filho(a)</v-card-title>
              <v-flex xs12 sm2>
                <v-text-field v-model="item.nome" required label="Nome">
                </v-text-field>
              </v-flex>
              <v-flex xs12 sm2>
                <v-text-field v-model="item.dataParto" label="Data Parto" mask="##/##/####" persistent-hint
                  hint="DD/MM/AAAA"></v-text-field>
              </v-flex>
              <v-btn color="info" style="background-color: blue" small @click="addFilho()">Adicionar Filho(a)</v-btn>
              <v-btn color="error" style="background-color: red" small @click="removeFilho(index)">Remover Filho(a)</v-btn>
            </v-layout>
          </v-card>
          <v-flex xs12 sm12>
            <v-textarea v-model="observacao" required label="Observação">
            </v-textarea>
          </v-flex>
          <v-flex xs12 sm4>
              <v-btn small style="background-color: grey" dark   type="reset" :disabled="loading" @click="clear">Cancelar</v-btn>
            <v-btn  style="background-color: green" small dark :loading="loading" :disabled="loading || !valid" type="submit">Salvar</v-btn>
          </v-flex>
        </div>
        <v-snackbar v-model="snackbar" :color="color" :multi-line="'multi-line'">
          {{ msg }}
          <v-btn dark text @click="snackbar = false">
            Fechar
          </v-btn>
        </v-snackbar>
      </v-container>
    </v-content>
  </v-form>
</template>

<script>
import Vue from 'vue';
import Storage from 'vue-web-storage';
import moment from 'moment';
import { clientesRef } from '../firebase';

Vue.use(Storage);

export default {
  data: vm => ({
    obrigatorio: [
      v => !!v || 'Campo é obrigatório',
    ],
    date: new Date().toISOString().substr(0, 10),
    dataContato: vm.formatDate(new Date().toISOString().substr(0, 10)),
    dateAniversarioMae: new Date().toISOString().substr(0, 10),
    aniversarioMae: vm.formatDate(new Date().toISOString().substr(0, 10)),
    dateAniversarioCrianca: new Date().toISOString().substr(0, 10),
    aniversarioCrianca: vm.formatDate(new Date().toISOString().substr(0, 10)),
    dateContrato: new Date().toISOString().substr(0, 10),
    dataContrato: vm.formatDate(new Date().toISOString().substr(0, 10)),
    dateEnxoval: new Date().toISOString().substr(0, 10),
    dataEnxoval: vm.formatDate(new Date().toISOString().substr(0, 10)),
    datePortifolio: new Date().toISOString().substr(0, 10),
    dataPortifolio: vm.formatDate(new Date().toISOString().substr(0, 10)),
    menuDataContato: false,
    menuDataParto: false,
    menuAniversarioMae: false,
    menuAniversarioCrianca: false,
    menuDataContrato: false,
    menuDataEnxoval: false,
    menuDataPortifolio: false,
    formularioOk: false,
    nome: '',
    cep: '',
    logradouro: '',
    complemento: '',
    bairro: '',
    uf: '',
    numero: '',
    valid: true,
    email: '',
    instagram: '',
    nomePai: '',
    filhos: [],
    checkContrato: false,
    telefone: '',
    telefonePai: '',
    checkEnxoval: false,
    checkPortifolio: false,
    interessado: true,
    meioContato: '',
    indicacao: '',
    loading: false,
    ativo: true,
    color: '',
    snackbar: false,
    msg: '',
    cidade: '',
    observacao: '',
    followup: '',
  }),
  created() {
    this.verificaLogin();
    this.addFilho();
  },
  watch: {
    date() {
      this.dataContato = this.formatDate(this.date);
    },
    cep() {
      this.validaCEP();
    },
    dateParto() {
      this.dataParto = this.formatDate(this.dateParto);
    },
    dateAniversarioMae() {
      this.aniversarioMae = this.formatDate(this.dateAniversarioMae);
    },
  },
  methods: {
    addFilho() {
      const a = {};
      this.filhos.push(a);
    },
    removeFilho(key) {
      this.filhos.splice(key, 1);
    },
    validaCEP() {
      if (this.cep.length === 8) {
        const api = `https://viacep.com.br/ws/${this.cep}/json/`;
        this.$http.get(api).then((response) => {
          this.logradouro = response.data.logradouro;
          this.bairro = response.data.bairro;
          this.complemento = response.data.complemento;
          this.cidade = response.data.localidade;
          this.uf = response.data.uf;
        });
      }
    },
    verificaLogin() {
      this.$emit('logou');
    },
    formatDate(date) {
      if (!date) return null;
      const [year, month, day] = date.split('-');
      return `${day}/${month}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;
      const [day, month, year] = date.split('/');
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    },
    cadastrar() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        const self = this;
        const dados = {
          nome: this.nome,
          telefone: this.telefone,
          instagram: this.instagram,
          email: this.email,
          indicacao: this.indicacao,
          aniversarioMae: this.aniversarioMae,
          nomePai: this.nomePai,
          telefonePai: this.telefonePai,
          cep: this.cep,
          logradouro: this.logradouro,
          numero: this.numero,
          complemento: this.complemento,
          bairro: this.bairro,
          cidade: this.cidade,
          uf: this.uf,
          filhos: this.filhos,
          observacao: this.observacao,
          interessado: false,
          ativo: this.ativo,
          formulario: true,
          horaLancamento: (moment().format('DD/MM/YYYY HH:mm:ss')),
        };
        clientesRef.orderByChild('nome').equalTo(this.nome).on('value', (snapshot) => {
          if (snapshot.numChildren() === 0) {
            clientesRef.push().set({
              nome: dados.nome,
              telefone: dados.telefone,
              instagram: dados.instagram,
              email: dados.email,
              indicacao: dados.indicacao,
              aniversarioMae: dados.aniversarioMae,
              nomePai: dados.nomePai,
              telefonePai: dados.telefonePai,
              cep: dados.cep,
              logradouro: dados.logradouro,
              numero: dados.numero,
              complemento: dados.complemento,
              bairro: dados.bairro,
              cidade: dados.cidade,
              uf: dados.uf,
              filhos: dados.filhos,
              observacao: dados.observacao,
              interessado: dados.interessado,
              ativo: dados.ativo,
              formulario: dados.formulario,
              horaLancamento: dados.horaLancamento,
            });
            self.msg = 'Formulário foi enviado com sucesso.';
            self.color = 'success';
            self.snackbar = true;
            self.loading = false;
            self.formularioOk = true;
            self.$refs.form.reset();
          } else {
            self.msg = 'Cliente com o mesmo nome já enviou o formulário.';
            self.color = 'error';
            self.snackbar = true;
            self.formularioOk = false;
            self.loading = false;
          }
        });
      }
    },
    clear() {
      this.loading = false;
      this.$refs.form.reset();
    },
  },
};
</script>
