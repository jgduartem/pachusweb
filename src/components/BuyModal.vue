<template>
  <div>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="shopping_bag" color="primary" text-color="white" />
        <span class="q-ml-sm">Introduce los datos de tu compra.</span>
      </q-card-section>
      <q-card-section>
        <q-input
          :value="$store.state.actualUser.name"
          type="text"
          label="Nombre"
        />
        <q-input
          :value="$store.state.actualUser.phone"
          type="text"
          label="Telefono"
        />
        <q-input
          :value="$store.state.actualUser.email"
          type="text"
          label="Email"
        />
      </q-card-section>
      <q-card-section>
        <q-select
          v-model="model"
          :options="options"
          label="Tipo de pago"
        />
        <q-input v-if="model != null" v-model="reference" type="text" label="Numero de referencia" />
        <q-field label="Precio en Bs" stack-label>
        <template v-slot:control>
          <div class="self-center full-width no-outline" tabindex="0">{{totalBs}}</div>
        </template>
      </q-field>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Cancelar" color="primary" v-close-popup />
        <q-btn flat label="Finalizar Compra" color="primary" v-close-popup :disable="reference == ''" @click="finishBuy()" />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import Axios from "axios";
export default {
  name: "BuyModal",
  props: {},
  data() {
    return {
      model: null,
      options: ["Pago Movil", "Transferencia", "Zelle"],
      dolarPrice: "",
      totalBs: 0,
      reference: ''
    };
  },
  methods: {
    finishBuy(){
      this.$emit('finishBuy', this.reference)
    },
    getDolarPrice() {
      console.log('entro')
      Axios({
        method: "get",
        url: "https://s3.amazonaws.com/dolartoday/data.json",
      })
        .then(async (res) => {
          this.dolarPrice = await res.data.USD.promedio;
          console.log(this.dolarPrice);
          this.totalBs = this.dolarPrice * this.$store.state.itemPrice
          this.totalBs = this.totalBs.toFixed(2)
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getDolarPrice()
  },
};
</script>

<style>
</style>