<template>
  <div>
    <div>
      <div class="q-mb-md flex flex-center">
        <q-img class="q-my-md" width="20%" height="50%" src="pachuslogo.png" />
      </div>
      <Navigation />
      <div class="row col-12">
        <div class="col-5"></div>
        <div class="col-7 text-center">
          <div class="q-pa-md">
            <q-carousel
              animated
              v-model="slide"
              infinite
              :autoplay="2500"
              transition-prev="slide-right"
              transition-next="slide-left"
              @mouseenter="autoplay = false"
              @mouseleave="autoplay = true"
            >
              <q-carousel-slide
                :name="1"
                img-src="jesus.jpeg"
              />
              <q-carousel-slide
                :name="2"
                img-src="https://cdn.quasar.dev/img/parallax1.jpg"
              />
              <q-carousel-slide
                :name="3"
                img-src="https://cdn.quasar.dev/img/parallax2.jpg"
              />
              <q-carousel-slide
                :name="4"
                img-src="https://cdn.quasar.dev/img/quasar.jpg"
              />
            </q-carousel>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  auth,
  clothesRef,
  hatsRef,
  cupsRef,
  othersRef,
  imageRef,
} from "src/firebase/firebaseConfig";
import Navigation from "src/components/Navigation.vue";

export default {
  components: { Navigation },
  name: "Index",
  data() {
    return {
      name: "",
      newUser: false,
      isPwd: true,
      isPwd2: true,
      session: false,
      email: "",
      pass: "",
      passConfirm: "",
      registro: false,
      step: 1,
      data: [],
      slide: 1,
    };
  },
  created() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        this.session = true;
      } else {
        this.session = false;
      }
    });
    this.getData();
  },
  methods: {
    async getData() {
      let datos = [];
      clothesRef.once("value").then((snapshot) => {
        snapshot.forEach((childSnapshot) => {
          let item = {
            item: childSnapshot.child("item").val(),
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
      hatsRef.once("value").then((snapshot) => {
        snapshot.forEach((childSnapshot) => {
          let item = {
            item: childSnapshot.child("item").val(),
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
      cupsRef.once("value").then((snapshot) => {
        snapshot.forEach((childSnapshot) => {
          let item = {
            item: childSnapshot.child("item").val(),
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
      othersRef.once("value").then((snapshot) => {
        snapshot.forEach((childSnapshot) => {
          let item = {
            item: childSnapshot.child("item").val(),
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
    },
  },
};
</script>

<style>
.pachuAzul {
  background-color: #33cdd1;
}
.pachuRosa {
  background-color: #f64965;
}
</style>