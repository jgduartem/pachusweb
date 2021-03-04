<template>
  <div class="row col-12 justify-center">
    <div
      class="q-pa-md row items-start q-gutter-md"
      v-for="(i, index) in $store.state.actualUser.shoppingCart"
      :key="index"
    >
      <q-card class="my-card" flat bordered>
        <q-card-section horizontal>
          <q-card-section class="q-pt-xs">
            <div class="text-h5 q-mt-sm q-mb-xs">{{ i.name }}</div>
            <div class="text-caption text-grey">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </div>
            <div v-if="i.item == 'Ropa'">
              <div class="text-caption text-grey">
                Talla: {{ i.talla[0].talla }}
              </div>
              <div class="text-caption text-grey">
                Cantidad: {{ i.talla[0].cantidad }}
              </div>
            </div>
            <div v-if="i.item != 'Ropa'">
              <div class="text-caption text-grey">
                Cantidad: {{ i.cantidad }}
              </div>
            </div>
            <div class="text-caption text-grey">
                Precio: ${{ i.precio }}
              </div>
          </q-card-section>

          <q-card-section class="col-5 flex flex-center">
            <q-avatar size="100px">
              <q-img :src="i.url.urlFront" />
            </q-avatar>
          </q-card-section>
        </q-card-section>

        <q-separator />

        <q-card-actions v-if="i.item == 'Ropa'">
          <q-btn label="Modificar Cantidad" @click="openModify(i)" />
          <q-btn
            class="q-ml-md"
            icon-right="delete"
            label="Eliminar"
            @click="deleteItem(i)"
          />
        </q-card-actions>

        <q-card-actions v-if="i.item != 'Ropa'">
          <q-btn label="Modificar Cantidad" @click="openModify(i)" />
          <q-btn
            class="q-ml-md"
            icon-right="delete"
            label="Eliminar"
            @click="deleteItem(i)"
          />
        </q-card-actions>
      </q-card>
    </div>
    <q-dialog v-model="openModal" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="warning" color="primary" text-color="white" />
          <span class="q-ml-sm">Introduce la cantidad deseada</span>
        </q-card-section>
        <q-card-section>
          <q-input
            :rules="[(count) => count >= 1]"
            input-class="text-center"
            v-model="count"
            type="number"
            label="Cantidad"
          />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancelar" v-close-popup />
          <q-btn
            flat
            label="Aceptar"
            :disable="count < 1"
            color="primary"
            v-close-popup
            @click="modifyQuantity()"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { usersRef, auth } from "src/firebase/firebaseConfig";
export default {
  name: "Checkout",
  props: {},
  data() {
    return {
      count: 1,
      openModal: false,
      itemSaved: {},
    };
  },
  async created() {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        await this.$store.dispatch("getUserIdAction", user.uid);
        await this.getUserData();
      }else{
        this.$router.push('/')
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
    openModify(item) {
      this.openModal = true;
      this.itemSaved = item;
    },
    async modifyQuantity() {
      let itemToModify = {};
      if (this.itemSaved.item == "Ropa") {
        itemToModify = {
          item: this.itemSaved.item,
          name: this.itemSaved.name,
          color: this.itemSaved.color,
          descripcion: this.itemSaved.descripcion,
          cantidad: this.count,
          talla: [
            { talla: this.itemSaved.talla[0].talla, cantidad: this.count },
          ],
          url: this.itemSaved.url,
          precio: this.itemSaved.precio,
          id: this.itemSaved.id,
        };
      } else {
        itemToModify = {
          item: this.itemSaved.item,
          name: this.itemSaved.name,
          descripcion: this.itemSaved.descripcion,
          cantidad: this.count,
          url: this.itemSaved.url,
          precio: this.itemSaved.precio,
          id: this.itemSaved.id,
        };
      }
      this.$store.dispatch("modifyQuantityAction", itemToModify);
      this.count = 1;
      await this.getUserData();
    },
    async deleteItem(item) {
      let itemToDelete = {};
      if (item.item == "Ropa") {
        itemToDelete = {
          item: item.item,
          name: item.name,
          color: item.color,
          descripcion: item.descripcion,
          cantidad: item.cantidad,
          talla: [
            { talla: item.talla[0].talla, cantidad: item.talla[0].cantidad },
          ],
          url: item.url,
          precio: item.precio,
          id: item.id,
        };
      } else {
        itemToDelete = {
          item: item.item,
          name: item.name,
          descripcion: item.descripcion,
          cantidad: item.cantidad,
          url: item.url,
          precio: item.precio,
          id: item.id,
        };
      }
      this.$store.dispatch("deleteItemAction", itemToDelete);
      await this.getUserData();
    },
  },
};
</script>

<style>
</style>