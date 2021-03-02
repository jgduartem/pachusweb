<template>
  <div class="q-mt-lg row col-12 bg-grey-2">
    <div
      v-for="item in data"
      :key="item.id"
      class="row col-xs-6 col-sm-6 col-md-4 col-lg-4 justify-center"
    >
    <q-card class="my-card q-ma-md" @click="openItem(item)">
      <img :src="item.url.urlFront">
      <q-card-actions align="between">
        <span class="text-body1">{{item.name}}</span>
        <span class="text-body1">${{item.precio}}</span>
      </q-card-actions>
    </q-card>
    </div>
  </div>
</template>

<script>
import { auth, usersRef } from "src/firebase/firebaseConfig";
export default {
  name: "CardItems",
  props: {
    data: Array,
  },
  data() {
    return {
      enableShop: false,
    };
  },
  mounted() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.enableShop = true;
      } else {
        this.enableShop = false;
      }
    });
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
    async addItem(item) {
      let itemToAdd = {};
      itemToAdd = {
        item: item.item,
        name: item.name,
        descripcion: item.descripcion,
        cantidad: 1,
        url: item.url,
        precio: item.precio,
        id: item.id,
      };
      await this.$store.dispatch("addItemAction", itemToAdd);
      this.$q.notify({
        message: itemToAdd.name + ' agregado al carrito',
        timeout: 1000,
        color: 'info',
        textColor: 'white',
        position: 'bottom'
      })
      await this.getUserData();
    },
    openItem(item) {
      this.$store.dispatch("openItemAction", item);
      this.$emit('closeModal');
      console.log(this.$store.state.item);
      console.log(this.$store.state.itemToCustomize)
    },
  },
};
</script>

<style>
</style>