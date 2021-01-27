<template>
  <div class="q-mt-lg row col-12 bg-grey-2">
    <div
      v-for="item in data"
      :key="item.id"
      class="row col-xs-6 col-sm-6 col-md-4 col-lg-4 justify-center"
    >
      <div class="q-pa-md">
        <q-card class="row col-12 bg-grey-2">
          <q-img :src="item.url" height="auto" width="100%" />

          <q-card-section class="row col-12">
            <q-btn
              fab
              icon="shopping_cart"
              @click="addItem(item)"
              text-color="white"
              class="pachuAzul absolute"
              style="top: 0; right: 12px; transform: translateY(-50%)"
              disable
            />
            <div class="row no-wrap items-center">
              <div class="col text-h6 ellipsis">
                {{ item.name }}
              </div>
            </div>
          </q-card-section>

          <q-card-section class="row col-12 q-pt-none">
            <div class="q-ml-md text-caption text-grey">
              {{ item.descripcion }}.
            </div>
          </q-card-section>

          <q-separator />

          <q-card-actions class="row col-12 justify-between">
            <div class="q-ml-md text-subtitle1">$ {{ item.precio }}</div>
            <q-btn
              class="q-mr-md"
              flat
              color="dark"
              label="Ver"
              @click="openItem(item)"
              to="/View"
            />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import { auth, db } from "src/firebase/firebaseConfig";
import ProductView from "src/pages/ProductView";
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
          cantidad: count,
          url: item.url,
          precio: item.precio,
          id: item.id,
        };
      this.$store.dispatch("addItemAction", itemToAdd);
      await this.getUserData()
    },
    openItem(item) {
      this.$store.dispatch("openItemAction", item);
      console.log(this.$store.state.item);
    },
  },
};
</script>

<style>
</style>