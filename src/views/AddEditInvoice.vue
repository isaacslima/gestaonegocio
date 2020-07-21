<template>
  <div class="main-content-container container-fluid px-4">
    <div class="page-header row no-gutters py-4">
      <div class="col-12 col-sm-9 text-center text-sm-left mb-0">
        <h3 class="page-title">Cadastro Entrada</h3>
      </div>
      <div class="col-3 col-sm-3 text-center text-sm-right mb-0">
        <d-button theme="success" class="mb-2 mr-1" @click="back()">Voltar</d-button>
      </div>
    </div>
    <div class="col-12 col-sm-12 text-center text-sm-left mb-0">
      <v-form v-on:submit.prevent="salvar" ref="form" v-model="valid" lazy-validation>
        <v-content id="inspire">
          <v-container grid-list-md>
            <v-layout row wrap xs12>
              <v-flex xs12 sm5>
                <v-autocomplete :items="clientes" v-model="cliente" item-text="nome" required label="Cliente">
                </v-autocomplete>
              </v-flex>
              <v-flex xs12 sm5>
                <v-select :items="servicos" item-text="nome" v-model="servico" required @change="buscaPreco(servico)"
                  label="Serviço">
                </v-select>
              </v-flex>
              <v-flex xs12 sm2>
                Preço<br>
                <money v-model="preco" readonly required class="form-input input-lg" v-bind="money"></money>
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
                    <v-autocomplete :items="tipoPagamento" v-model="item.pagamento" label="Tipo Pagamento">
                    </v-autocomplete>
                  </v-flex>
                  <v-flex xs12 sm2>
                    <v-text-field mask="##/##/####"  v-model="item.dataPagamento" persistent-hint hint="dd/mm/aaaa">
                    </v-text-field>
                  </v-flex>
                  <v-flex xs12 sm2>
                    Preço<br>
                    <money v-model="item.valor" required class="form-input input-lg" v-bind="money"></money>
                  </v-flex>
                  <v-flex xs12 sm2>
                    <v-checkbox color="success" v-model="item.pago" label="Pago"></v-checkbox>
                  </v-flex>
                  <v-flex xs12 sm2>
                    <d-button size="sm" theme="danger" class="mb-2 btn-outline-light mr-1" @click="removeEntrada(item)">
                      <i class="material-icons mr-1 bg-primary text-white">close</i>Remover Entrada
                    </d-button>
                  </v-flex>
                </v-layout>
              </v-card>
            </div>
            <div class="text-right">
              <d-button theme="accent" class="mb-2 mr-1" @click="addEntrada">Adicionar Forma de Pagamento</d-button>
            </div>
            <v-flex xs12 sm4>
              <d-button theme="danger" class="mb-2 mr-1" type="reset" :disabled="loading" @click="clear">Cancelar</d-button>
              <d-button theme="success" class="mb-2 mr-1" :loading="loading" :disabled="loading || !valid" type="submit">Salvar</d-button>
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
    clientes: [],
    date: new Date().toISOString().substr(0, 10),
    data: vm.formatDate(new Date().toISOString().substr(0, 10)),
    dateFinal: new Date().toISOString().substr(0, 10),
    dataFinal: vm.formatDate(new Date().toISOString().substr(0, 10)),
    datePagamento: new Date().toISOString().substr(0, 10),
    preco: 0.00,
    cliente: '',
    servico: '',
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
        cliente: snapshot.val().cliente,
        data: snapshot.val().data,
        preco: snapshot.val().preco,
        servico: snapshot.val().servico,
        entradas: snapshot.val().entradas,
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
    getInvoice() {
      const self = this;
      entradasRef.orderByKey().equalTo(this.id).on('child_added', (snapshot) => {
        self.cliente = snapshot.val().cliente;
        self.data = snapshot.val().data;
        self.dataFinal = snapshot.val().dataFinal;
        self.entradas = snapshot.val().entradas;
        self.preco = snapshot.val().preco;
        self.servico = snapshot.val().servico;
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
      servicosRef.orderByChild('nome').equalTo(val).on('child_added', (snapshot) => {
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
    salvar() {
      if (true) {
        return;
      }
      if (this.$refs.form.validate()) {
        this.loading = true;
        const self = this;
        const dados = {
          horaLancamento: (moment().format('DD/MM/YYYY HH:mm:ss')),
        };
        entradasRef.push().set({
          cliente: this.cliente,
          servico: this.servico,
          data: this.data,
          preco: this.preco,
          dataFinal: this.dataFinal,
          horaLancamento: dados.horaLancamento,
          entradas: this.entradas,
        });
        self.msg = 'Serviço cadastrado com sucesso.';
        self.color = 'success';
        self.snackbar = true;
        self.loading = false;
        self.$refs.form.reset();
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
