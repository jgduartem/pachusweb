<template>
  <div class="row col-12 bg-grey-2 justify-center" v-if="show == true">
    <div class="q-ml-xl q-mr-xl row col-xs-12 col-sm-5 col-md-5 col-lg-5">
      <q-img class="q-pa-xl" :src="itemToShow.url" />
    </div>
    <div class="q-ml-xl q-mr-xl row col-xs-12 col-sm-5 col-md-5 col-lg-5">
      <q-card class="q-pa-xl my-card" style="width: 100vw">
        <q-card-section>
          <div class="q-ml-sm text-h4">{{ itemToShow.name }}</div>
          <div class="q-ml-sm text-subtitle1">{{ itemToShow.color }}</div>
        </q-card-section>
        <q-card-section>
          <div class="q-ml-sm text-subitle2">
            {{ itemToShow.descripcion }}
          </div>
        </q-card-section>
        <q-card-section>
          <div class="row col-12" v-if="itemToShow.talla">
            <div class="row col-xs-12 col-2 q-ml-md text-h6 text-blue">
              <div class="flex flex-center align-start">Talla:</div>
            </div>
            <div class="row col-xs-12 col-9 text-center">
              <q-select
                class="row col-12 q-ml-md text-center"
                v-model="size"
                :options="options"
                label="Talla"
              />
            </div>
          </div>
          <div class="q-mt-lg row col-12">
            <div class="row col-2 q-ml-md text-h6 text-blue">
              <div class="flex flex-center align-start">Precio:</div>
            </div>
            <div class="q-mr-xs row col-9 text-center">
              <h6 class="q-ml-md">{{ itemToShow.precio }}$</h6>
            </div>
          </div>
          <div class="row col-xs-12-col-12 justify-end">
            <q-btn
              color="primary"
              icon="shopping_cart"
              label="Agregar al carrito"
              @click="addItem(itemToShow, count)"
              :disable="enableShop == false || count == 0 || (size == null && itemToShow.item == 'Ropa')"
            />
          </div>
        </q-card-section>
        <q-card-actions>
          <div class="row col-12 justify-center">
            <q-btn color="primary" icon="add_circle" @click="count++" />
            <q-input
              class="col-8"
              input-class="text-center text-h6"
              v-model="count"
              type="number"
            />
            <q-btn
              color="primary"
              icon="remove_circle"
              @click="count--"
              :disable="count == 0"
            />
          </div>
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<script>
import { auth, usersRef } from "src/firebase/firebaseConfig";
import router from "src/router";
export default {
  name: "ProductView",
  props: {},
  data() {
    return {
      size: null,
      text: "",
      itemToShow: this.$store.state.item,
      options: [],
      count: 0,
      enableShop: false,
      show: false,
    };
  },
  mounted() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.enableShop = true;
        console.log("sesion");
      } else {
        this.enableShop = false;
      }
    });
  },
  created() {
    if (this.itemToShow != null) {
      if (this.itemToShow.talla instanceof Array) {
        this.setOptions();
      }
      this.show = true;
    } else {
      this.$router.push("/");
    }
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
    setOptions() {
      this.itemToShow.talla.forEach((item) => {
        this.options.push(item.talla);
      });
    },
    async addItem(item, count) {
      let itemToAdd = {};
      if (item.item == "Ropa") {
        itemToAdd = {
          item: item.item,
          name: item.name,
          color: item.color,
          descripcion: item.descripcion,
          cantidad: this.count,
          talla: [{talla: this.size, cantidad: this.count}],
          url: item.url,
          precio: item.precio,
          id: item.id,
        };
      } else {
        itemToAdd = {
          item: item.item,
          name: item.name,
          descripcion: item.descripcion,
          cantidad: count,
          url: item.url,
          precio: item.precio,
          id: item.id,
        };
      }
      this.$q.notify({
        message: itemToAdd.name + ' agregado al carrito',
        timeout: 1000,
        color: 'info',
        textColor: 'white',
        position: 'bottom'
      })
      this.$store.dispatch("addItemAction", itemToAdd);
      await this.getUserData()
    },
  },
};
</script>

<style>
</style>