<template>
  <div>
    <q-drawer v-model="drawer" show-if-above :width="200" :breakpoint="500">
      <q-scroll-area class="fit">
        <q-list padding class="menu-list">
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="person" />
            </q-item-section>

            <q-item-section> Mi Cuenta </q-item-section>
          </q-item>

          <q-item clickable v-ripple @click="activeCheckout=true">
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
      <Checkout v-if="activeCheckout==true"/>
    </div>
  </div>
</template>

<script>
import Checkout from "src/pages/Checkout.vue";
export default {
  name: "MyAccount",
  components: {Checkout},
  props: {},
  data() {
    return {
      drawer: true,
      activeCheckout: false
    };
  },
  methods: {
  },
};
</script>

<style>
</style>