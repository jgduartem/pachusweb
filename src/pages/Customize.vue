<template>
  <div>
    <div class="row col-12">
      <div class="col-xs-12 col-sm-12 col-md-1 col-lg-1">
        <q-tabs v-model="tab" vertical class="text-dark">
          <q-tab
            name="productos"
            icon="fas fa-tshirt"
            label="Productos"
            @click="openModal('productos')"
          />
          <q-tab name="cargar" icon="fas fa-upload" label="Cargar" @click="openModal('upload')" />
          <q-tab name="texto" icon="fas fa-font" label="Texto" />
        </q-tabs>
      </div>

      <!-- Editor de imagen -->

      <div class="row col-xs-12 col-sm-12 col-md-11 col-lg-11 justify-center" ref="printMe">
        <q-img
          v-if="position == 'front'"
          :src="$store.state.itemToCustomize.urlFront"
          width="360px"
          height="640px"
          crossOrigin="Anonymous"
        />
        <q-img
          v-if="position == 'back'"
          :src="$store.state.itemToCustomize.urlBack"
          width="360px"
          height="640px"
          crossOrigin="Anonymous"
        />
        <q-img
          v-if="position == 'left'"
          :src="$store.state.itemToCustomize.urlLeft"
          width="360px"
          height="640px"
          crossOrigin="Anonymous"
        />
        <q-img
          v-if="position == 'right'"
          :src="$store.state.itemToCustomize.urlRight"
          width="360px"
          height="640px"
          crossOrigin="Anonymous"
        />

        <VueDragResize
          :isActive="false"
          :w="200"
          :h="200"
          v-on:resizing="resize"
          v-on:dragging="resize"
        >
          <q-img :src="imgUploaded" />
        </VueDragResize>
      </div>
      <div class="row col-12 justify-around">
        <q-btn
          flat
          class="q-pa-sm"
          label="Frente"
          @click="position = 'front'"
        />
        <q-btn
          flat
          class="q-pa-sm"
          label="Posterior"
          @click="position = 'back'"
        />
        <q-btn
          flat
          class="q-pa-sm"
          label="Izquierda"
          @click="position = 'left'"
        />
        <q-btn
          flat
          class="q-pa-sm"
          label="Derecha"
          @click="position = 'right'"
        />
      </div>
    </div>

    <!-- Modales -->

    <q-dialog v-model="productos" full-width>
      <q-card>
        <q-card-section>
          <div class="text-h4 text-center">Productos</div>
          <CardItems :data="data" @closeModal="closeModal()" />
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="uploadModal" full-width>
      <q-card>
        <q-card-section class="row items-center">
          <q-file
            filled
            bottom-slots
            v-model="imgToUpload"
            label="Adjuntar Imagen"
            counter
          >
            <template v-slot:prepend>
              <q-icon name="cloud_upload" @click.stop />
            </template>
            <template v-slot:append>
              <q-icon
                name="close"
                @click.stop="imgToUpload = null"
                class="cursor-pointer"
              />
            </template>
            <template v-slot:hint> Ajuntar Imagen </template>
          </q-file>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat color="primary" label="Subir" @click="uploadImage()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
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
import CardItems from "src/components/CardItems";
import VueDragResize from "vue-drag-resize";
export default {
  name: "Customize",
  components: { CardItems, VueDragResize },
  props: {},
  data() {
    return {
      width: 0,
      height: 0,
      top: 0,
      left: 0,
      tab: "productos",
      splitterModel: 10,
      data: [],
      productos: false,
      uploadModal: false,
      position: "front",
      imgToUpload: null,
      imgUploaded: null,
    };
  },
  async created() {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        await this.$store.dispatch("getUserIdAction", user.uid);
        await this.getUserData();
        this.session = true;
      } else {
        this.session = false;
      }
    });
    await this.getData("clothes");
    console.log(this.data);
  },
  methods: {
    async print() {
      const el = this.$refs.printMe;
      // add option type to get the image version
      // if not provided the promise will return
      // the canvas.
      const options = {
        type: "dataURL",
        useCORS: true,
        scale: 0.8,
        allowTaint: false,
      };
      this.output = await this.$html2canvas(el, options);
    },
    async saveImage() {
      await this.print();
      const imgRef = imageRef.child("image/" + "prueba");
      const metadata = { contentType: "img/png" };
      const imgToSave = this.output.replace(/^data:image\/[a-z]+;base64,/, "");
      await imgRef
        .putString(imgToSave, "base64", metadata)
        .then(async (res) => {
          console.log(res);
          await imageRef
            .child("image/" + "prueba")
            .getDownloadURL()
            .then(async (url) => {
              console.log(url);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    uploadImage() {
      this.imgUploaded = URL.createObjectURL(this.imgToUpload);
      this.closeModal();
    },
    resize(newRect) {
      this.width = newRect.width;
      this.height = newRect.height;
      this.top = newRect.top;
      this.left = newRect.left;
    },
    closeModal() {
      this.productos = false;
      this.uploadModal = false;
    },
    openModal(option) {
      switch (option) {
        case "productos":
          this.productos = true;
          break;
        case "upload":
          this.uploadModal = true;
          break;
      }
    },
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
</style>