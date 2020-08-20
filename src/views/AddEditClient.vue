<template>
<div class="main-content-container container-fluid px-4">
  <div class="page-header row no-gutters py-4">
      <div class="col-12 col-sm-9 text-center text-sm-left mb-0">
        <h3 class="page-title">Cadastro Cliente</h3>
      </div>
      <div class="col-3 col-sm-3 text-center text-sm-right mb-0">
        <v-btn small class="mb-2 mr-1" style="background-color: green" dark @click="back()">Voltar</v-btn>
      </div>
  </div>
<div class="col-12 col-sm-12 text-center text-sm-left mb-0">
  <v-form v-on:submit.prevent="salvar" ref="form" v-model="valid" lazy-validation>
    <v-content id="inspire">
      <v-container grid-list-md>
        <v-layout row wrap>
          <v-flex xs12 sm5>
            <v-text-field v-model="nome" required label="Nome"></v-text-field>
          </v-flex>
          <v-flex xs12 sm2>
            <v-text-field v-model="telefone" required mask="(##) # ####-####" label="Telefone"></v-text-field>
          </v-flex>
          <v-flex xs12 sm2>
            <v-text-field v-model="instagram" required prepend-inner-icon="alternate_email" label="Instagram">
            </v-text-field>
          </v-flex>
          <v-flex xs12 sm3>
            <v-text-field v-model="email" required label="E-mail"></v-text-field>
          </v-flex>
          <v-flex xs12 sm2>
            <v-menu ref="menuDataContato" :close-on-content-click="false" v-model="menuDataContato" :nudge-right="40"
              lazy transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
              <v-text-field slot="activator" v-model="dataContato" label="Data Contato" persistent-hint readonly
                prepend-icon="event" @blur="date = parseDate(dataContato)"></v-text-field>
              <v-date-picker v-model="date" no-title @input="menuDataContato = false"></v-date-picker>
            </v-menu>

          </v-flex>
          <v-flex xs12 sm1>
            <v-text-field v-model="meioContato" required label="Meio Contato"></v-text-field>
          </v-flex>
          <v-flex xs12 sm3>
            <v-text-field v-model="indicacao" required label="Indicação"></v-text-field>
          </v-flex>
          <v-flex xs12 sm2>
            <v-menu ref="menuDataParto" :close-on-content-click="false" v-model="menuDataParto" :nudge-right="40" lazy
              transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
              <v-text-field slot="activator" v-model="dataParto" readonly label="Data Parto / Idade Criança"
                persistent-hint prepend-icon="event" @blur="dateParto = parseDate(dataParto)"></v-text-field>
              <v-date-picker v-model="dateParto" no-title @input="menuDataParto = false"></v-date-picker>
            </v-menu>
          </v-flex>
          <v-flex xs12 sm2>
            <v-text-field v-model="aniversarioMae" label="Data Nascimento Mãe" mask="##/##/####" hint="dd/mm/aaaa"
              persistent-hint></v-text-field>
          </v-flex>
          <v-flex xs12 sm2>
            <v-menu ref="menuAniversarioCrianca" :close-on-content-click="false" v-model="menuAniversarioCrianca"
              :nudge-right="40" lazy transition="scale-transition" offset-y full-width max-width="290px"
              min-width="290px">
              <v-text-field slot="activator" v-model="aniversarioCrianca" label="Aniversário Criança" persistent-hint
                prepend-icon="event" @blur="dateAniversarioCrianca = parseDate(aniversarioCrianca)"></v-text-field>
              <v-date-picker v-model="dateAniversarioCrianca" no-title @input="menuAniversarioCrianca = false">
              </v-date-picker>
            </v-menu>
          </v-flex>
          <v-flex xs12 sm5>
            <v-text-field v-model="nomePai" required label="Nome Pai"></v-text-field>
          </v-flex>
          <v-flex xs12 sm3>
            <v-text-field v-model="telefonePai" required mask="(##) # ####-####" label="Telefone Pai"></v-text-field>
          </v-flex>
          <v-layout xs12 sm12>
            <v-flex xs12 sm1>
              <v-checkbox v-model="checkContrato" label="Contrato">
              </v-checkbox>
            </v-flex>
            <v-flex xs12 sm2>
              <v-menu ref="menuDataContrato" :close-on-content-click="false" v-model="menuDataContrato"
                :nudge-right="40" lazy transition="scale-transition" offset-y full-width max-width="290px"
                min-width="290px">
                <v-text-field slot="activator" v-model="dataContrato" label="Data Contrato" persistent-hint readonly
                  prepend-icon="event" @blur="dateContrato = parseDate(dataContrato)"></v-text-field>
                <v-date-picker v-model="dateContrato" no-title @input="menuDataContrato = false"></v-date-picker>
              </v-menu>
            </v-flex>
            <v-flex xs12 sm1>
              <v-checkbox v-model="checkEnxoval" label="Enxoval">
              </v-checkbox>
            </v-flex>
            <v-flex xs12 sm2>
              <v-menu ref="menuDataEnxoval" :close-on-content-click="false" v-model="menuDataEnxoval" :nudge-right="40"
                lazy transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
                <v-text-field slot="activator" v-model="dataEnxoval" label="Data Enxoval" persistent-hint readonly
                  prepend-icon="event" @blur="dateEnxoval = parseDate(dataEnxoval)"></v-text-field>
                <v-date-picker v-model="dateEnxoval" no-title @input="menuDataEnxoval = false"></v-date-picker>
              </v-menu>
            </v-flex>
            <v-flex xs12 sm1>
              <v-checkbox v-model="checkPortifolio" label="Portifólio">
              </v-checkbox>
            </v-flex>
            <v-flex xs12 sm2>
              <v-menu ref="menuDataPortifolio" :close-on-content-click="false" v-model="menuDataPortifolio"
                :nudge-right="40" lazy transition="scale-transition" offset-y full-width max-width="290px"
                min-width="290px">
                <v-text-field slot="activator" v-model="dataPortifolio" label="Data Portifólio" persistent-hint readonly
                  prepend-icon="event" @blur="datePortifolio = parseDate(dataPortifolio)"></v-text-field>
                <v-date-picker v-model="datePortifolio" no-title @input="menuDataPortifolio = false"></v-date-picker>
              </v-menu>

            </v-flex>
          </v-layout>

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

          <v-flex xs12 sm12>
            <v-textarea v-model="observacao" required label="Observação">
            </v-textarea>
          </v-flex>

          <v-flex xs12 sm3>
            <v-text-field v-model="followup" required label="Follow-up"></v-text-field>
          </v-flex>

          <v-flex xs12 sm3>
            <v-checkbox v-model="interessado" label="Interessado">
            </v-checkbox>
          </v-flex>

          <v-card class="light-gray" style="width:100%">
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
              <v-btn style="background-color: blue" small dark @click="addFilho()">Adicionar Filho(a)</v-btn>
              <v-btn style="background-color: red" small dark @click="removeFilho(index)">Remover Filho(a)</v-btn>
            </v-layout>
          </v-card>
        </v-layout>
        <v-flex xs12 sm4>
          <v-btn small class="mb-2 mr-1" :disabled="loading" style="background-color: red" dark @click="back()">Voltar</v-btn>
          <v-btn small class="mb-2 mr-1" :loading="loading" :disabled="loading || !valid" type="submit" style="background-color: green" dark>Salvar</v-btn>
        </v-flex>
        <v-snackbar v-model="snackbar" :color="color" :multi-line="'multi-line'" :timeout="96000">
          {{ msg }}
          <v-btn dark text @click="snackbar = false" to="/cadastro-clientes">
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
import axios from 'axios';
import moment from 'moment';
import Storage from 'vue-web-storage';
import {
  clientesRef,
} from '../firebase';


Vue.use(Storage);

export default {
  data: vm => ({
    obrigatorio: [
      v => !!v || 'Campo é obrigatório',
    ],
    id: '',
    date: new Date().toISOString().substr(0, 10),
    dataContato: vm.formatDate(new Date().toISOString().substr(0, 10)),
    dateParto: new Date().toISOString().substr(0, 10),
    dataParto: vm.formatDate(new Date().toISOString().substr(0, 10)),
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
    nome: '',
    telefone: '',
    valid: true,
    email: '',
    instagram: '',
    nomePai: '',
    formulario: false,
    filhos: [],
    interessado: false,
    checkContrato: false,
    telefonePai: '',
    checkEnxoval: false,
    checkPortifolio: false,
    meioContato: '',
    indicacao: '',
    loading: false,
    ativo: true,
    color: '',
    snackbar: false,
    msg: '',
    logradouro: '',
    cep: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    uf: '',
    observacao: '',
    followup: '',
  }),
  created() {
    this.verificaLogin();
    this.loading = false;
    this.id = this.$route.params.id;
    if (this.id === 'new') {
      return;
    }
    this.buscaClientes();
  },
  watch: {
    cep() {
      this.validaCEP();
    },
    date() {
      this.dataContato = this.formatDate(this.date);
    },
    dateParto() {
      this.dataParto = this.formatDate(this.dateParto);
    },
    dateAniversarioMae() {
      this.aniversarioMae = this.formatDate(this.dateAniversarioMae);
    },
    dateAniversarioCrianca() {
      this.aniversarioCrianca = this.formatDate(this.dateAniversarioCrianca);
    },
    dateContrato() {
      this.dataContrato = this.formatDate(this.dateContrato);
    },
    dateEnxoval() {
      this.dataEnxoval = this.formatDate(this.dateEnxoval);
    },
    datePortifolio() {
      this.dataPortifolio = this.formatDate(this.datePortifolio);
    },
  },
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date);
    },
  },
  methods: {
    back() {
      this.$router.replace('/cadastro-clientes');
    },
    addFilho() {
      const a = {};
      this.filhos.push(a);
    },
    removeFilho(key) {
      this.filhos.splice(key, 1);
    },
    validaCEP() {
      if (this.cep) {
        if (this.cep.length === 8 && !this.logradouro) {
          const api = `https://viacep.com.br/ws/${this.cep}/json/`;
          axios.get(api).then((response) => {
            this.logradouro = response.data.logradouro;
            this.bairro = response.data.bairro;
            this.complemento = response.data.complemento;
            this.cidade = response.data.localidade;
            this.uf = response.data.uf;
          });
        }
      }
    },
    voidIfUndefined(value) {
      if (!value) {
        return '';
      }
      return value;
    },
    buscaClientes() {
      const self = this;
      clientesRef.orderByKey().equalTo(this.id).on('child_added', (snapshot) => {
        if (!snapshot.val().filhos) {
          self.addFilho();
        } else self.filhos = snapshot.val().filhos;
        self.nome = snapshot.val().nome;
        self.telefone = snapshot.val().telefone;
        self.email = snapshot.val().email;
        self.instagram = snapshot.val().instagram;
        self.nomePai = snapshot.val().nomePai;
        self.formulario = snapshot.val().formulario;
        self.interessado = snapshot.val().interessado;
        self.checkContrato = this.voidIfUndefined(snapshot.val().checkContrato);
        self.telefonePai = snapshot.val().telefonePai;
        self.checkEnxoval = this.voidIfUndefined(snapshot.val().checkEnxoval);
        self.checkPortifolio = this.voidIfUndefined(snapshot.val().checkPortifolio);
        self.meioContato = this.voidIfUndefined(snapshot.val().meioContato);
        self.indicacao = snapshot.val().indicacao;
        self.ativo = snapshot.val().ativo;
        self.observacao = snapshot.val().observacao;
        self.cep = snapshot.val().cep;
        self.logradouro = snapshot.val().logradouro;
        self.complemento = snapshot.val().complemento;
        self.numero = snapshot.val().numero;
        self.uf = snapshot.val().uf;
        self.bairro = snapshot.val().bairro;
        self.cidade = snapshot.val().cidade;
        self.dataContrato = this.voidIfUndefined(snapshot.val().dataContrato);
        self.dataParto = this.voidIfUndefined(snapshot.val().dataParto);
        self.aniversarioMae = snapshot.val().aniversarioMae;
        self.aniversarioCrianca = this.voidIfUndefined(snapshot.val().aniversarioCrianca);
        self.dataEnxoval = this.voidIfUndefined(snapshot.val().dataEnxoval);
        self.dataPortifolio = this.voidIfUndefined(snapshot.val().dataPortifolio);
      });
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
    atualizaCliente() {
      const self = this;
      clientesRef.child(this.id).update({
        nome: self.nome,
        telefone: self.telefone,
        telefonePai: self.telefonePai,
        instagram: self.instagram,
        email: self.email,
        dataContato: self.dataContato,
        meioContato: self.meioContato,
        indicacao: self.indicacao,
        dataParto: self.dataParto,
        aniversarioMae: self.aniversarioMae,
        aniversarioCrianca: self.aniversarioCrianca,
        nomePai: self.nomePai,
        checkContrato: self.checkContrato,
        dataContrato: self.dataContrato,
        checkEnxoval: self.checkEnxoval,
        dataEnxoval: self.dataEnxoval,
        checkPortifolio: self.checkPortifolio,
        dataPortifolio: self.dataPortifolio,
        logradouro: self.logradouro,
        numero: self.numero,
        cep: self.cep,
        bairro: self.bairro,
        cidade: self.cidade,
        uf: self.uf,
        complemento: self.complemento,
        observacao: self.observacao,
        followup: self.followup,
        interessado: self.interessado,
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
    salvar() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        if (this.id !== 'new') {
          this.atualizaCliente();
        } else this.cadastraCliente();
      }
    },
    cadastraCliente() {
      const self = this;
      const dados = {
        nome: this.nome,
        telefone: this.telefone,
        telefonePai: this.telefonePai,
        instagram: this.instagram,
        email: this.email,
        dataContato: this.dataContato,
        meioContato: this.meioContato,
        indicacao: this.indicacao,
        dataParto: this.dataParto,
        aniversarioMae: this.aniversarioMae,
        aniversarioCrianca: this.aniversarioCrianca,
        nomePai: this.nomePai,
        checkContrato: this.checkContrato,
        dataContrato: this.dataContrato,
        checkEnxoval: this.checkEnxoval,
        dataEnxoval: this.dataEnxoval,
        checkPortifolio: this.checkPortifolio,
        dataPortifolio: this.dataPortifolio,
        logradouro: this.logradouro,
        numero: this.numero,
        cep: this.cep,
        bairro: this.bairro,
        cidade: this.cidade,
        uf: this.uf,
        complemento: this.complemento,
        observacao: this.observacao,
        followup: this.followup,
        interessado: this.interessado,
        ativo: this.ativo,
        horaLancamento: (moment().format('DD/MM/YYYY HH:mm:ss')),
      };
      clientesRef.orderByChild('nome').equalTo(this.nome).on('value', (snapshot) => {
        if (snapshot.numChildren() === 0) {
          clientesRef.push().set({
            nome: dados.nome,
            telefone: dados.telefone,
            telefonePai: dados.telefonePai,
            email: dados.email,
            instagram: dados.instagram,
            nomePai: dados.nomePai,
            aniversarioMae: dados.aniversarioMae,
            aniversarioCrianca: dados.aniversarioCrianca,
            checkContrato: dados.checkContrato,
            dataContrato: dados.dataContrato,
            checkEnxoval: dados.checkEnxoval,
            dataEnxoval: dados.dataEnxoval,
            checkPortifolio: dados.checkPortifolio,
            dataPortifolio: dados.dataPortifolio,
            interessado: dados.interessado,
            dataContato: dados.dataContato,
            meioContato: dados.meioContato,
            indicacao: dados.indicacao,
            dataParto: dados.dataParto,
            logradouro: dados.logradouro,
            numero: dados.numero,
            cep: dados.cep,
            bairro: dados.bairro,
            cidade: dados.cidade,
            uf: dados.uf,
            complemento: dados.complemento,
            formulario: false,
            observacao: dados.observacao,
            followup: dados.followup,
            ativo: dados.ativo,
            horaLancamento: dados.horaLancamento,
          });
          self.msg = 'Cliente cadastrado com sucesso.';
          self.color = 'success';
          self.snackbar = true;
          self.loading = false;
          self.$refs.form.reset();
        } else {
          self.msg = 'Cliente já cadastrado.';
          self.color = 'error';
          self.snackbar = true;
          self.loading = false;
        }
      });
    },
    clear() {
      this.loading = false;
      this.$refs.form.reset();
    },
  },
};
</script>
