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
      <v-form v-on:submit.prevent="cadastrar" ref="form" v-model="valid" lazy-validation>
        <v-content id="inspire">
          <v-btn fab top right color="indigo" dark fixed to="/entradas">
            <v-icon>arrow_back</v-icon>
          </v-btn>
          <v-container grid-list-md>
            <h2>Cadastro de Entrada</h2>
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
                    <v-text-field mask="##/##/####" persistent-hint hint="dd/mm/aaaa">
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
                    <v-btn color="error" @click="removeEntrada(item)">x</v-btn>
                  </v-flex>
                </v-layout>
              </v-card>
            </div>
            <v-flex xs12 sm1 pt-3>
              <v-btn color="info" @click="addEntrada">Adicionar Forma de Pagamento</v-btn>
            </v-flex>
            <v-flex xs12 sm4>
              <v-btn large color="primary" :loading="loading" :disabled="loading || !valid" type="submit">Salvar</v-btn>
              <v-btn large type="reset" :disabled="loading" @click="clear">Cancelar</v-btn>
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
import moment from 'moment';
import {
  servicosRef,
  clientesRef,
  entradasRef,
} from '../firebase';

export default {
  firebase: {
    clientes: clientesRef,
    servicos: servicosRef,
  },
  data: vm => ({
    obrigatorio: [
      v => !!v || 'Campo é obrigatório',
    ],
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
    cadastrar() {
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
