<template>
  <div>
    <!-- SOURCE -->
    <div ref="printMe" style="padding: 10px; background: #f5da55">
      <h1 style="color: #000; ">Print me!</h1>
    </div>
    <!-- OUTPUT -->
    <img v-if="output != null" :src="output">
  </div>
</template>

<script>
import {imageRef } from '../firebase/firebaseConfig'
export default {
  components: {
  },
  data() {
    return {
      output: null,
    }
  },
  methods: {
    async print() {
      const el = this.$refs.printMe;
      // add option type to get the image version
      // if not provided the promise will return 
      // the canvas.
      const options = {
        type: 'dataURL'
      }
      this.output = await this.$html2canvas(el, options)
    },
    async saveImage(){
      const imgRef = imageRef.child('image/' + 'prueba')
      const metadata = {contentType: 'img/png'}
      const imgToSave = this.output.replace(/^data:image\/[a-z]+;base64,/, "")
      await imgRef.putString(imgToSave, 'base64' , metadata)
        .then(async (res) => {
          console.log(res)
          await imageRef.child('image/' + 'prueba')
          .getDownloadURL()
          .then(async (url) => {
            console.log(url)
          })
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  async mounted() {
    await this.print()
    await this.saveImage()
  }
}
</script>