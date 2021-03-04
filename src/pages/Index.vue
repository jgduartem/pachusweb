<template>
  <div>
    <div>
      <div class="q-mb-md flex flex-center">
        <q-img class="q-my-md" width="20%" height="50%" src="pachuslogo.png" />
      </div>
      <Navigation />
      <Principal />
      <Timeline />
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
import Timeline from "src/components/Timeline";
import Principal from "src/components/Principal.vue";
export default {
  components: { Navigation, CardItems, Timeline, Principal },
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
        await this.$store.dispatch("getUserIdAction", user.uid);
        await this.getUserData();
        this.session = true;
      } else {
        this.session = false;
      }
    });
    this.getData("clothes");
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
.bg-customBlue {
  background-color: #d3f1f1;
}
</style>