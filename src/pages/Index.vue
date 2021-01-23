<template>
  <div>
    <div>
      <div class="q-mb-md flex flex-center">
        <q-img class="q-my-md" width="20%" height="50%" src="pachuslogo.png" />
      </div>
      <Navigation />
      <div class="row col-12 justify-end">
        <q-select
          @input="changeData(option)"
          v-model="option"
          class="q-pa-md col-xs-12 col-sm-2 col-md-2 col-lg-2"
          label="Ordenar por"
          :options="['Ropa', 'Tazas', 'Gorras', 'Otros']"
        />
      </div>
      <CardItems :data="data" v-if="active == true" />
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
  usersRef,
} from "src/firebase/firebaseConfig";
import Navigation from "src/components/Navigation.vue";
import CardItems from "src/components/CardItems";
export default {
  components: { Navigation, CardItems },
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
      data: [],
      slide: 1,
      active: false,
      option: "",
    };
  },
  created() {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        console.log(user);
        await this.$store.dispatch("getUserIdAction", user.uid);
        await this.getUserData()
        this.session = true;
      } else {
        this.session = false;
      }
    });
    this.getData("clothes");
  },
  methods: {
    getUserData() {
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
    async changeData(option) {
      this.active = false;
      switch (option) {
        case "Ropa":
          await this.getData("clothes");
          break;

        case "Tazas":
          await this.getData("cups");
          break;

        case "Gorras":
          await this.getData("hats");
          break;

        case "Otros":
          await this.getData("others");
      }
    },
    async getData(option) {
      console.log(option);
      let datos = [];
      switch (option) {
        case "clothes":
          clothesRef.once("value").then((snapshot) => {
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
          hatsRef.once("value").then((snapshot) => {
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
          this.active = true;
          break;
        case "cups":
          cupsRef.once("value").then((snapshot) => {
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
          this.active = true;
          break;

        case "others":
          othersRef.once("value").then((snapshot) => {
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
          this.active = true;
          console.log(this.data);
          break;
      }
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