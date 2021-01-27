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
          </q-card-section>

          <q-card-section class="col-5 flex flex-center">
            <q-avatar size="100px">
              <q-img :src="i.url" :ratio="16 / 9" />
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
            @click="deleteItem(i, i.talla[0].cantidad)"
          />
        </q-card-actions>

        <q-card-actions v-if="i.item != 'Ropa'">
          <q-btn flat round icon="add_circle" @click="count++" />
          <q-input
            input-class="text-center"
            :value="i.cantidad"
            type="text"
            label="Cantidad"
          />
          <q-btn flat round icon="remove_circle" @click="count--" />
        </q-card-actions>
      </q-card>
    </div>
    <q-dialog v-model="openModal" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="signal_wifi_off" color="primary" text-color="white" />
          <span class="q-ml-sm">Introduce la cantidad deseada</span>
        </q-card-section>
        <q-card-section>
          <q-input :rules="[count => count >=1 ]" input-class="text-center" v-model="count" type="number" label="Cantidad" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancelar" v-close-popup />
          <q-btn flat label="Aceptar" :disable='count < 1' color="primary" v-close-popup @click="modifyQuantity()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  name: "Checkout",
  props: {},
  data() {
    return {
      count: 1,
      openModal: false,
      itemSaved: {}
    };
  },
  methods: {
    openModify(item){
      this.openModal = true,
      this.itemSaved = item
    },
    modifyQuantity() {
      let itemToModify = {};
      if (this.itemSaved.item == "Ropa") {
        itemToModify = {
          item: this.itemSaved.item,
          name: this.itemSaved.name,
          color: this.itemSaved.color,
          descripcion: this.itemSaved.descripcion,
          cantidad: this.count,
          talla: [{ talla: this.itemSaved.talla[0].talla, cantidad: this.count }],
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
    },
    deleteItem(item, quantity) {
      let itemToDelete = {};
      if (item.item == "Ropa") {
        itemToDelete = {
          item: item.item,
          name: item.name,
          color: item.color,
          descripcion: item.descripcion,
          cantidad: quantity,
          talla: [{ talla: this.size, cantidad: quantity }],
          url: item.url,
          precio: item.precio,
          id: item.id,
        };
      } else {
        itemToDelete = {
          item: item.item,
          name: item.name,
          descripcion: item.descripcion,
          cantidad: quantity,
          url: item.url,
          precio: item.precio,
          id: item.id,
        };
      }
      this.$store.dispatch("deleteItemAction", itemToDelete);
    },
  },
};
</script>

<style>
</style>