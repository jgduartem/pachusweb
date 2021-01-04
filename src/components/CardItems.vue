<template>
  <div class="q-ma-md">
    <div v-for="item in data" :key="item.id">
      <q-card class="q-ma-md q-my-lg q-pa-sm">
        <q-card-section class="row col-12">
          <div class="col-6">
            <div class="text-h4 q-mt-sm q-mb-xs">{{ item.item }}</div>
            <div class="text-overline text-primary">{{ item.color }}</div>
            <div class="text-caption text-grey">{{ item.descripcion }}</div>
            <div class="text-h5">$ {{ item.precio }}</div>
          </div>
          <div class="row col-5 q-mr-md">
            <q-img :src="item.url" />
          </div>
        </q-card-section>
        <q-card-actions class="row justify-end">
          <q-btn label="Ver" />
          <q-btn label="Agregar al carrito" @click="addItem(item)" />
        </q-card-actions>
      </q-card>
      <q-space />
    </div>
  </div>
</template>

<script>
export default {
  name: "CardItems",
  props: {
    data: Array,
  },
  data() {
    return {};
  },
  methods: {
    addItem(item) {
      this.$store.dispatch("addItemAction", item);
      console.log(this.$store.state.items);
    },
    prueba(){
      console.log(item)
    }
  },
};
</script>

<style>
</style>