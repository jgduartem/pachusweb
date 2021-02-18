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
        <q-btn
          color="info"
          icon="check"
          label="Finalizar compra"
          @click="openBuyModal()"
          v-if="$store.state.actualUser.shoppingCart.length > 0"
        />
      </div>
    </div>
    <div class="q-pa-md" v-if="activeSelection == 'myData'">
      <AccountData />
    </div>
    <div class="q-pa-md" v-if="openModal == true">
      <q-dialog v-model="openModal" persistent>
        <BuyModal @finishBuy="finishBuy" />
      </q-dialog>
    </div>
  </div>
</template>

<script>
import Checkout from "src/pages/Checkout.vue";
import AccountData from "src/components/AccountData.vue";
import BuyModal from "src/components/BuyModal";
import Axios from "axios";
import { auth, usersRef } from "src/firebase/firebaseConfig";
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
    async finishBuy(referencia) {
      let user = auth.currentUser;
      this.$q.loading.show({
        delay: 100,
        message: "Cargando",
      });
      Axios({
        method: "post",
        url: process.env.MAILER_URL,
        data: {
          to: this.$store.state.actualUser.email,
          subject: "Resumen de compra en Pachus",
          message: "mensaje de prueba, numero de referencia: " + referencia,
        },
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(async (res) => {
          console.log(res);
          this.$q.notify({
            message:
              "¡Gracias por tu compra! Recibiras un email con los detalles",
            timeout: 2000,
            color: "info",
            textColor: "white",
            position: "bottom",
          });
          await usersRef.child(user.uid).update({
            finishedBuys: [...this.$store.state.actualUser.shoppingCart],
          });
          await this.sendMailToPachus();
          this.deleteAll();
          this.$q.loading.hide();
        })
        .catch((err) => {
          console.log(err);
          this.$q.notify({
            message: "Error del servidor, intenta nuevamente",
            timeout: 2000,
            color: "info",
            textColor: "white",
            position: "bottom",
          });
          this.$q.loading.hide();
        });
    },
    async deleteAll() {
      await this.$store.dispatch("deleteAllAction");
      this.getUserData();
    },
    changeSelection(option) {
      this.activeSelection = option;
    },
    openBuyModal() {
      this.openModal = true;
    },
    async test() {
      let user = auth.currentUser;
      let infoToSend = await usersRef
        .child(user.uid)
        .once("value")
        .then((snapshot) => {
          return snapshot.val().finishedBuys[0];
        });
      console.log(infoToSend.cantidad, infoToSend.name, infoToSend.color);
    },
    async sendMailToPachus() {
      let user = auth.currentUser;
      let infoToSend = [];
      let order = await usersRef
        .child(user.uid)
        .once("value")
        .then((snapshot) => {
          return snapshot.val().finishedBuys;
        });
      console.log(order);
      order.forEach((e) => {
        infoToSend.push(`<h6> ${e.cantidad} ${e.name} ${e.color} </h6>`);
      });
      Axios({
        method: "post",
        url: process.env.MAILER_URL,
        data: {
          to: process.env.ADMIN_USER1,
          subject: "Compra del cliente: " + user.displayName,
          message: infoToSend.toString(),
        },
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style>
</style>