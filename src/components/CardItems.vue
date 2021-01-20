<template>
  <div class="q-mt-lg row bg-grey-2">
    <div
      v-for="item in data"
      :key="item.id"
      class="row col-xs-6 col-sm-6 col-md-4 col-lg-4 justify-center"
    >
      <div class="q-ma-md">
        <q-card class="row col-12 bg-grey-2">
          <q-img :src="item.url" height="auto" width="100%" />

          <q-card-section class="row col-12">
            <q-btn
              fab
              icon="shopping_cart"
              @click="item.item != 'Ropa' ? addItem(item) : test() "
              text-color="white"
              class="pachuAzul absolute"
              style="top: 0; right: 12px; transform: translateY(-50%)"
              :disable="enableShop==false"
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
            <q-btn class="q-mr-md" flat color="dark"> Ver </q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import { auth } from 'src/firebase/firebaseConfig';
export default {
  name: "CardItems",
  props: {
    data: Array,
  },
  data() {
    return {
      enableShop: false
    };
  },
  mounted(){
    auth.onAuthStateChanged((user) => {
      if(user){
        this.enableShop = true;
      }else{
        this.enableShop = false;
      }
    })
  },
  methods: {
    test(){
      console.log('test')
    },
    addItem(item) {
      this.$store.dispatch("addItemAction", item);
      console.log(this.$store.state.items);
    },
  },
};
</script>

<style>
</style>