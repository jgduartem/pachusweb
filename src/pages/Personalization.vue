<template>
  <div class="row col-12 justify-center">
    <div
      class="row col-12 justify-center"
      ref="printMe"
      style="width: 360px; height: 640px"
    >
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
    <div class="row col-12 justify-between">
      <q-btn flat class="q-pa-sm" label="Frente" @click="position = 'front'" />
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
      <q-btn flat class="q-pa-sm" label="Derecha" @click="position = 'right'" />
    </div>
    <div class="row col-12">
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
      <div class="row col-12 justify-end">
        <q-btn flat color="primary" label="OK" @click="saveImage()" />
        <q-btn flat color="primary" label="Subir" @click="uploadImage()" />
      </div>
    </div>
  </div>
</template>
 
<script>
import { imageRef } from "../firebase/firebaseConfig";
import VueDragResize from "vue-drag-resize";
export default {
  name: "Customization",
  components: {
    VueDragResize,
  },
  data() {
    return {
      width: 0,
      height: 0,
      top: 0,
      left: 0,
      output: null,
      imgToUpload: null,
      imgUploaded: null,
      position: null,
    };
  },
  created() {
    console.log(this.$store.state.itemToCustomize);
  },
  methods: {
    uploadImage() {
      this.imgUploaded = URL.createObjectURL(this.imgToUpload);
    },
    resize(newRect) {
      this.width = newRect.width;
      this.height = newRect.height;
      this.top = newRect.top;
      this.left = newRect.left;
    },
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
  },
};
</script>