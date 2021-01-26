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
          <q-btn flat round icon="add_circle" @click="count++" />
          <q-input
            input-class="text-center"
            v-model="i.talla[0].cantidad"
            type="text"
            label="Cantidad"
          />
          <q-btn flat round icon="remove_circle" @click="count--" />
          <q-btn color="primary" icon="delete" label="Eliminar" @click="deleteItem(i, i.talla[0].cantidad)" />
        </q-card-actions>
        
        <q-card-actions v-if="i.item != 'Ropa'">
          <q-btn flat round icon="add_circle" @click="count++" />
          <q-input
            input-class="text-center"
            v-model="i.cantidad"
            type="text"
            label="Cantidad"
          />
          <q-btn flat round icon="remove_circle" @click="count--" />
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "Checkout",
  props: {},
  data() {
    return {
      count: 0,
    };
  },
  methods: {
    deleteItem(item, quantity) {
      let itemToDelete = {}
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
      this.$store.dispatch('deleteItemAction', itemToDelete)
    },
  },
};
</script>

<style>
</style>