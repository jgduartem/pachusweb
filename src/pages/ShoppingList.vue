<template>
  <div style="width: 200px">
    <div v-for="(item, index) in $store.state.items" :key='index'>
      <q-card class="q-my-sm q-py-sm">
        <q-card-section>
          <div class="text-h4 q-mt-sm q-mb-xs">{{item.name}}</div>
          <div class="text-overline text-primary">{{item.color}}</div>
          <div class="text-caption text-grey">{{item.descripcion}}</div>
          <div class="text-h5">$ {{item.precio}}</div></q-card-section>
        <q-card-actions>
          <q-btn flat label="Eliminar" @click="deleteItem(item)" />
        </q-card-actions>
      </q-card>
    </div>
    <div class="text-h4 q-my-sm" v-if="$store.state.itemPrice != 0">
      Total: ${{$store.state.actualUser.cartPrice}}
    </div>
  </div>
</template>

<script>
import { usersRef } from "src/firebase/firebaseConfig";
export default {
    name: 'ShoppingList',
    data(){
      return{
        
      }
    },
    methods:{
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
      deleteItem(item){
        this.$store.dispatch('deleteItemAction', item)
        this.getUserData()
      }
    },
}
</script>

<style>

</style>