<template>
  <v-app id="invoice">
    <div class="main-content-container container-fluid px-4">
      <div class="page-header row no-gutters py-4">
        <div class="col-12 col-sm-9 text-center text-sm-left mb-0">
          <h3 class="page-title">Cadastro Entrada</h3>
        </div>
        <div class="col-3 col-sm-3 text-center text-sm-right mb-0">
          <v-btn small class="mb-2 mr-1" style="background-color: green" dark @click="back()">Voltar</v-btn>
        </div>
      </div>
      <div class="col-12 col-sm-12 text-center text-sm-left mb-0">
        <v-form v-on:submit.prevent="salvar" ref="form" v-model="valid" lazy-validation>
          <v-content id="inspire">
            <v-container grid-list-md>
              <v-layout row wrap xs12>
                <v-flex xs12 sm5>
                  <v-autocomplete :items="clientes" v-model="keyCliente" item-text="nome" item-value="key" required label="Cliente">
                  </v-autocomplete>
                </v-flex>
                <v-flex xs12 sm5>
                  <v-autocomplete
                    v-model="keyService"
                    :items="servicos"
                    required
                    @change="buscaPreco(keyService)"
                    item-text="nome" item-value="key"
                    label="Serviço"
                  ></v-autocomplete>
                </v-flex>
                <v-flex xs12 sm2>
                  Preço<br>
                  <money v-model="preco" readonly required class="form-input input-lg" v-bind="money"></money>
                </v-flex>
              </v-layout>
              <v-layout xs12>
                <v-flex xs12>
                  <v-text-field slot="activator" v-model="observacao" label="Observação" ></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout xs12>
                <v-flex xs12 sm3>
                  <v-menu ref="menuData" :close-on-content-click="false" v-model="menuData" :nudge-right="40" lazy
                    transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
                    <v-text-field slot="activator" v-model="data" label="Data" persistent-hint readonly
                      prepend-icon="event" @blur="date = parseDate(data)"></v-text-field>
                    <v-date-picker v-model="date" no-title @input="menuData = false"></v-date-picker>
                  </v-menu>
                </v-flex>
                <v-flex xs12 sm3>
                  <v-menu ref="menu1" :close-on-content-click="false" v-model="menu1" :nudge-right="40" lazy
                    transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
                    <v-text-field slot="activator" v-model="dataFinal" label="Data Término Serviço" persistent-hint
                      readonly prepend-icon="event" @blur="dateFinal = parseDate(dataFinal)"></v-text-field>
                    <v-date-picker v-model="dateFinal" no-title @input="menu1 = false"></v-date-picker>
                  </v-menu>
                </v-flex>
              </v-layout>
              <div v-for="item in entradas" :key="item.value" pt-5>
                <v-card pa-5>
                  <v-layout row wrap pl-3>
                    <v-flex xs12 sm2>
                      <v-select :items="tipoPagamento" v-model="item.pagamento" label="Tipo Pagamento"></v-select>
                    </v-flex>
                    <v-flex xs12 sm2>
                      <v-text-field mask="##/##/####"  v-model="item.dataPagamento" persistent-hint hint="dd/mm/aaaa">
                      </v-text-field>
                    </v-flex>
                    <v-flex xs12 sm2>
                      Valor Pago<br>
                      <money v-model="item.valor" required class="form-input input-lg" v-bind="money"></money>
                    </v-flex>
                    <v-flex xs12 sm2>
                      <v-checkbox color="success" v-model="item.pago" label="Pago"></v-checkbox>
                    </v-flex>
                    <v-flex xs12 sm2>
                      <v-btn class="mb-2 btn-outline-light mr-1" small style="background-color: red" dark @click="removeEntrada(item)">
                        <i class="material-icons mr-1 text-white">close</i>Remover Pagamento
                      </v-btn>
                    </v-flex>
                  </v-layout>
                </v-card>
              </div>
              <div class="text-right">
                <v-btn small style="background-color: blue" dark class="mb-2 mr-1" @click="addEntrada()">Adicionar Forma de Pagamento</v-btn>
              </div>
              <v-flex xs12 sm4>
                <v-btn small style="background-color: red" dark  class="mb-2 mr-1" type="reset" :disabled="loading" @click="back()">Cancelar</v-btn>
                <v-btn small style="background-color: green" dark  class="mb-2 mr-1" :loading="loading" :disabled="loading || !valid" type="submit">Salvar</v-btn>
              </v-flex>
              <v-snackbar v-model="snackbar" :color="color" :multi-line="'multi-line'" :timeout="6000">
                {{ msg }}
                <v-btn dark text @click="back()">
                  Fechar
                </v-btn>
              </v-snackbar>
            </v-container>
          </v-content>
        </v-form>
      </div>
    </div>
  </v-app>
</template>

<script>
import moment from 'moment';
import {
  servicosRef,
  clientesRef,
  entradasRef,
} from '../firebase';

export default {
  data: vm => ({
    obrigatorio: [
      v => !!v || 'Campo é obrigatório',
    ],
    servicos: [],
    servicoSelecionado: '',
    clienteSelecionado: '',
    clientes: [],
    date: new Date().toISOString().substr(0, 10),
    data: vm.formatDate(new Date().toISOString().substr(0, 10)),
    dateFinal: new Date().toISOString().substr(0, 10),
    dataFinal: vm.formatDate(new Date().toISOString().substr(0, 10)),
    datePagamento: new Date().toISOString().substr(0, 10),
    preco: 0.00,
    cliente: '',
    servico: '',
    observacao: '',
    menu1: false,
    valorTotal: 0.00,
    menuData: false,
    menuDataTermino: false,
    entradas: [{
      menu: false,
      pagamento: '',
      pago: false,
      dataPagamento: vm.formatDate(new Date().toISOString().substr(0, 10)),
    }],
    msg: '',
    color: '',
    tipoPagamento: ['Cartão', 'Dinheiro', 'Cheque', 'Permuta', 'TED/DOC'],
    money: {
      decimal: ',',
      thousands: '.',
      prefix: 'R$ ',
      suffix: '',
      precision: 2,
      masked: false,
    },
    valid: true,
    keyCliente: '',
    keyService: '',
    loading: false,
    ativo: true,
    snackbar: false,
  }),
  created() {
    this.verificaLogin();
    this.id = this.$route.params.id;
    if (this.id === 'new') {
      return;
    }
    this.getInvoice();
  },
  beforeMount() {
    const self = this;
    clientesRef.on('child_added', (snapshot) => {
      const client = {
        key: snapshot.key,
        nome: snapshot.val().nome,
      };
      self.clientes.push(client);
    });
    servicosRef.on('child_added', (snapshot) => {
      const invoice = {
        key: snapshot.key,
        nome: snapshot.val().nome,
        preco: snapshot.val().preco,
      };
      self.servicos.push(invoice);
    });
  },
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date);
    },
  },
  watch: {
    date() {
      this.data = this.formatDate(this.date);
    },
    datePagamento(item) {
      this.entradas.dataPagamento[item] = this.formatDate(this.datePagamento);
    },
    dateFinal() {
      this.dataFinal = this.formatDate(this.dateFinal);
    },
  },
  methods: {
    getKeyCliente() {
      const self = this;
      clientesRef.orderByChild('nome').equalTo(this.cliente).on('child_added', (cliente) => {
        self.keyCliente = cliente.key;
      });
    },
    getKeyService() {
      const self = this;
      servicosRef.orderByChild('nome').equalTo(this.servico).on('child_added', (service) => {
        self.keyService = service.key;
      });
    },
    getInvoice() {
      const self = this;
      entradasRef.orderByKey().equalTo(this.id).on('child_added', (snapshot) => {
        self.cliente = snapshot.val().cliente;
        if (!snapshot.val().keyCliente) {
          self.getKeyCliente();
        } else {
          self.keyCliente = snapshot.val().keyCliente;
        }
        self.data = snapshot.val().data;
        self.dataFinal = snapshot.val().dataFinal;
        self.entradas = snapshot.val().entradas;
        self.preco = snapshot.val().preco;
        self.servico = snapshot.val().servico;
        self.observacao = snapshot.val().observacao;
        if (!snapshot.val().keyService) {
          self.getKeyService();
        } else {
          self.keyService = snapshot.val().keyService;
        }
      });
    },
    back() {
      this.$router.replace('/entradas');
    },
    removeEntrada: (e) => {
      this.entradas.splice(this.entradas.indexOf(e), 1);
    },
    addEntrada() {
      this.entradas.push({
        pagamento: '',
        pago: false,
      });
    },
    buscaPreco(val) {
      const self = this;
      servicosRef.orderByKey().equalTo(val).on('child_added', (snapshot) => {
        self.servicoSelecionado = snapshot.val().nome;
        self.preco = snapshot.val().preco;
      });
    },
    formatDate(date) {
      if (!date) {
        return null;
      }
      const [year, month, day] = date.split('-');
      return `${day}/${month}/${year}`;
    },
    parseDate(date) {
      if (!date) {
        return null;
      }
      const [day, month, year] = date.split('/');
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    },
    verificaLogin() {
      this.$emit('logou');
    },
    updateInvoice() {
      const self = this;
      entradasRef.child(this.id).update({
        keyCliente: self.keyCliente,
        keyService: self.keyService,
        data: self.data,
        preco: self.preco,
        dataFinal: self.dataFinal,
        observacao: self.observacao,
        entradas: self.entradas,
      }).then(() => {
        self.color = 'success';
        self.msg = 'Entrada Atualizada com sucesso.';
        self.snackbar = true;
        self.$refs.form.reset();
      }).catch((error) => {
        self.color = 'error';
        self.msg = `Entrada não foi atualizada erro: ${error}`;
        self.snackbar = true;
        self.loading = false;
      });
    },
    insertInvoice() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        const self = this;
        const dados = {
          horaLancamento: (moment().format('DD/MM/YYYY HH:mm:ss')),
        };
        entradasRef.push().set({
          cliente: this.clienteSelecionado,
          keyCliente: this.keyCliente,
          servico: this.servicoSelecionado,
          keyService: this.keyService,
          data: this.data,
          preco: this.preco,
          dataFinal: this.dataFinal,
          observacao: this.observacao,
          horaLancamento: dados.horaLancamento,
          entradas: this.entradas,
        });
        self.msg = 'Serviço cadastrado com sucesso.';
        self.color = 'success';
        self.snackbar = true;
        self.$refs.form.reset();
      }
    },
    salvar() {
      if (this.$refs.form.validate()) {
        const self = this;
        this.loading = true;
        clientesRef.orderByKey().equalTo(this.keyCliente).on('child_added', (snapshot) => {
          self.clienteSelecionado = snapshot.val().nome;
        });
        servicosRef.orderByKey().equalTo(this.keyService).on('child_added', (snapshot) => {
          self.servicoSelecionado = snapshot.val().nome;
        });
        if (this.id !== 'new') {
          this.updateInvoice();
        } else this.insertInvoice();
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
