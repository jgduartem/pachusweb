<template>
  <div style="width: 200px">
    <div v-for="(item, index) in $store.state.items" :key='index'>
      <q-card class="q-my-sm q-py-sm">
        <q-card-section>
          <div class="text-h4 q-mt-sm q-mb-xs">{{item.item}}</div>
          <div class="text-overline text-primary">{{item.color}}</div>
          <div class="text-caption text-grey">{{item.descripcion}}</div>
          <div class="text-h5">$ {{item.precio}}</div></q-card-section>
        <q-card-actions>
          <q-btn flat label="Eliminar" @click="deleteItem(item)" />
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<script>

export default {
    name: 'ShoppingList',
    data(){
      return{
        
      }
    },
    methods:{
      deleteItem(id){
        this.$store.dispatch('deleteItemAction', id)
      }
    },
}
</script>

<style>

</style>