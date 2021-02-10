<template>
  <div>
    <q-drawer v-model="drawer" show-if-above :width="150" :breakpoint="200">
      <q-scroll-area class="fit">
        <q-list padding class="menu-list">
          <q-item clickable v-ripple @click="changeSelection('myData')">
            <q-item-section avatar>
              <q-icon name="person" />
            </q-item-section>

            <q-item-section> Mi Cuenta </q-item-section>
          </q-item>

          <q-item clickable v-ripple @click="changeSelection('checkout')">
            <q-item-section avatar>
              <q-icon name="shopping_cart" />
            </q-item-section>

            <q-item-section> Mi Carrito </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="shopping_basket" />
            </q-item-section>

            <q-item-section> Mis Compras </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <div class="q-pa-md" v-if="activeSelection == 'checkout'">
      <Checkout />
      <div class="q-pa-md q-ma-md row col-12 justify-center">
        <q-btn color="info" icon="check" label="Finalizar compra" @click="openBuyModal()"/>
      </div>
    </div>
    <div class="q-pa-md" v-if="activeSelection == 'myData'">
      <AccountData />
    </div>
    <div class="q-pa-md" v-if="openModal == true">
      <q-dialog v-model="openModal" persistent>
        <BuyModal />
      </q-dialog>
    </div>
  </div>
</template>

<script>
import Checkout from "src/pages/Checkout.vue";
import AccountData from "src/components/AccountData.vue";
import BuyModal from "src/components/BuyModal";
export default {
  name: "MyAccount",
  components: { Checkout, AccountData, BuyModal },
  props: {},
  data() {
    return {
      drawer: true,
      activeSelection: "checkout",
      openModal: false,
    };
  },
  methods: {
    changeSelection(option) {
      this.activeSelection = option;
    },
    openBuyModal(){
      this.openModal = true
    }
  },
};
</script>

<style>
</style>