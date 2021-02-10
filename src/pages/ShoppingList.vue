<template>
  <div style="width: 200px">
    <div class="text-h4 q-my-md" v-if="$store.state.itemPrice != 0">
      Total: ${{ $store.state.actualUser.cartPrice }}
    </div>
    <div class="row col-12">
      <q-btn
        class="q-ma-sm pachuAzul"
        text-color="white"
        icon="shopping_cart"
        label="Ir Al carrito"
        to="/Checkout"
      />
      <q-btn
        :disable="$store.state.items.length == 0"
        class="q-ma-sm pachuRosa"
        text-color="white"
        icon="remove_shopping_cart"
        label="Vaciar Carrito"
        @click="warning = true"
      />
      <q-btn
        :disable="$store.state.items.length == 0"
        class="q-ma-sm pachuAzul"
        text-color="white"
        icon="check"
        label="Comprar"
        to="/MyAccount"
      />
    </div>
    <q-dialog v-model="warning" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="warning" class="pachuAzul" text-color="white" />
          <span class="q-ml-sm">¿Quieres vaciar el carrito?</span>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="No" v-close-popup />
          <q-btn
            flat
            label="Si"
            color="primary"
            @click="deleteAll()"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { usersRef } from "src/firebase/firebaseConfig";
import Axios from "axios";
export default {
  name: "ShoppingList",
  data() {
    return {
      warning: false,
    };
  },
  created() {
    this.getUserData();
  },
  methods: {
    finishBuy() {
      Axios({
        method: "post",
        url: "https://pachumailer.herokuapp.com/api",
        data: {
          to: this.$store.state.actualUser.email,
          subject: "Tu compra en Pachus",
          message: "mensaje de prueba",
          html: "<h4>Gracias por comprar en Pachu's</h4></br></br> <p></p>"
        },
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          console.log(res);
          this.$q.notify({
            message: "¡Gracias por tu compra! Recibiras un email con los detalles",
            timeout: 2000,
            color: "info",
            textColor: "white",
            position: "bottom",
          });
          this.deleteAll();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async getUserData() {
      let id = this.$store.state.actualUser.uid;
      let actualUser = {};
      usersRef
        .orderByKey()
        .equalTo(id)
        .once("value")
        .then(async (snapshot) => {
          actualUser.name = await snapshot.val()[id].name;
          actualUser.email = await snapshot.val()[id].email;
          actualUser.phone = await snapshot.val()[id].phone;
          actualUser.shoppingCart = await snapshot.val()[id].shoppingCart;
          actualUser.itemPrice = await snapshot.val()[id].cartPrice;
          await this.$store.dispatch("getUserDataAction", actualUser);
        });
    },
    async deleteAll() {
      await this.$store.dispatch("deleteAllAction");
      this.getUserData();
    },
  },
};
</script>

<style>
</style>