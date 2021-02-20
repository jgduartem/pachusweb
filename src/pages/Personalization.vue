<template>
  <div>
    <div class="row justify-center" ref="printMe">
      <q-img
        src="../../public/franelablanca.jpg"
        width="600px"
        height="600px"
      />
      <VueDragResize
        :isActive="false"
        :w="200"
        :h="200"
        v-on:resizing="resize"
        v-on:dragging="resize"
      >
        <q-img src="../../public/pachuslogo.png" />
      </VueDragResize>
    </div>
    <q-btn color="primary" icon="check" label="OK" @click="saveImage()" />
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
    };
  },

  methods: {
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