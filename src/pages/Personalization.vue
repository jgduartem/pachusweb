<template>
  <div class="row col-12 justify-center">
    <div
      class="row col-12 justify-center"
      ref="printMe"
      style="width: 360px; height: 640px"
    >
      <q-img
        :src="$store.state.itemToCustomize"
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
    <div >
        <q-btn color="primary" icon="check" label="OK" @click="saveImage()" />
        <q-file filled bottom-slots v-model="imgToUpload" label="Label" counter>
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
          <template v-slot:hint> Field hint </template>
        </q-file>
        <q-btn
          color="primary"
          icon="check"
          label="Subir"
          @click="uploadImage()"
        />
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