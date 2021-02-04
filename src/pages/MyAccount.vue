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

    <div class="q-pa-md">
      <Checkout v-if="activeSelection == 'checkout' "/>
    </div>
    <div class="q-pa-md">
      <AccountData v-if="activeSelection == 'myData'" />
    </div>
  </div>
</template>

<script>
import Checkout from "src/pages/Checkout.vue";
import AccountData from "src/components/AccountData.vue"
export default {
  name: "MyAccount",
  components: {Checkout, AccountData},
  props: {},
  data() {
    return {
      drawer: true,
      activeSelection: '',
    };
  },
  methods: {
    changeSelection(option){
      this.activeSelection = option;
    }
  },
};
</script>

<style>
</style>