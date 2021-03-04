<template>
  <div class="q-pa-md">
    <q-dialog v-model="dialog" :position="position" full-height @hide='closeModal()'>
      <q-card style="width: 250px">
        <q-linear-progress :value="0.6" color="pink" />
        <div class="q-pa-lg text-center text-h6">
          Total: ${{$store.state.actualUser.cartPrice}}
        </div>
        <Checkout/>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import Checkout from "src/pages/Checkout";
export default {
  name: "ShopingCart",
  components:{
    Checkout
  },
  props:{
    Checkout

  },
  data() {
    return {
      dialog: true,
      position: 'right'
    };
  },
  methods: {
    closeModal(){
      this.dialog = false;
      this.$emit('closeModal');
    },
  },
};
</script>

<style>
</style>