<template>
  <div>
    <div class="bg-grey-2">
      <q-toolbar
        class="pachuAzul text-white row col-12 q-pa-md justify-between"
      >
        <q-btn
          flat
          round
          dense
          icon="fas fa-tshirt"
          class="q-mr-xs"
          @click="getData('clothes')"
        />
        <q-btn
          flat
          round
          dense
          icon="fas fa-tshirt"
          class="q-mr-xs"
          @click="getData('hats')"
        />
        <q-btn
          flat
          round
          dense
          icon="fas fa-mug-hot"
          class="q-mr-xs"
          @click="getData('cups')"
        />
        <q-btn
          flat
          round
          dense
          icon="fas fa-record-vinyl"
          class="q-mr-xs"
          @click="getData('others')"
        />
      </q-toolbar>
      <CardItems :data="data" v-if="active == true" />
    </div>
  </div>
</template>

<script>
import {
  cupsRef,
  clothesRef,
  hatsRef,
  othersRef,
} from "src/firebase/firebaseConfig";
import CardItems from "src/components/CardItems.vue";
export default {
  name: "ProductsList",
  props: {},
  components: { CardItems },
  data() {
    return {
      data: [],
      option: "",
      active: false,
    };
  },
  mounted(){
    this.getData('clothes')
  },
  methods: {
    async getData(option) {
      console.log(option);
      let datos = [];
      switch (option) {
        case "clothes":
          clothesRef
          .once("value")
          .then((snapshot) => {
            snapshot.forEach((childSnapshot) => {
              let item = {
                item: childSnapshot.child("item").val(),
                name: childSnapshot.child("name").val(),
                cantidad: childSnapshot.child("cantidad").val(),
                color: childSnapshot.child("color").val(),
                descripcion: childSnapshot.child("descripcion").val(),
                talla: childSnapshot.child("talla").val(),
                precio: childSnapshot.child("precio").val(),
                imgName: childSnapshot.child("imgName").val(),
                url: childSnapshot.child("url").val(),
                id: childSnapshot.key,
              };
              datos.push(item);
            });
          });
          this.data = await datos;
          this.active = true;
          break;

        case "hats":
          hatsRef
          .once("value")
          .then((snapshot) => {
            snapshot.forEach((childSnapshot) => {
              let item = {
                item: childSnapshot.child("item").val(),
                name: childSnapshot.child("name").val(),
                cantidad: childSnapshot.child("cantidad").val(),
                color: childSnapshot.child("color").val(),
                descripcion: childSnapshot.child("descripcion").val(),
                url: childSnapshot.child("url").val(),
                precio: childSnapshot.child("precio").val(),
                id: childSnapshot.key,
              };
              datos.push(item);
            });
          });
          this.data = await datos;
          break;
        case "cups":
          cupsRef
          .once("value")
          .then((snapshot) => {
            snapshot.forEach((childSnapshot) => {
              let item = {
                item: childSnapshot.child("item").val(),
                name: childSnapshot.child("name").val(),
                cantidad: childSnapshot.child("cantidad").val(),
                color: childSnapshot.child("color").val(),
                descripcion: childSnapshot.child("descripcion").val(),
                url: childSnapshot.child("url").val(),
                precio: childSnapshot.child("precio").val(),
                id: childSnapshot.key,
              };
              datos.push(item);
            });
          });
          this.data = await datos;
          break;

        case "others":
          othersRef
          .once("value")
          .then((snapshot) => {
            snapshot.forEach((childSnapshot) => {
              let item = {
                item: childSnapshot.child("item").val(),
                name: childSnapshot.child("name").val(),
                color: childSnapshot.child("color").val(),
                cantidad: childSnapshot.child("cantidad").val(),
                descripcion: childSnapshot.child("descripcion").val(),
                url: childSnapshot.child("url").val(),
                precio: childSnapshot.child("precio").val(),
                id: childSnapshot.key,
              };
              datos.push(item);
            });
          });
          this.data = await datos;
          console.log(this.data);
          break;
      }
    },
  },
};
</script>

<style>
</style>