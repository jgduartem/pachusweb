<template>
  <div class="">
    <q-toolbar class="pachuAzul">
      <div class="row col-12 justify-center">
        <q-btn class="q-ma-xs" size="md" outline rounded label="Nosotros"  text-color="grey-3" />
        <q-btn class="q-ma-xs" size="md" outline rounded label="Productos" to="/ProductSelection"  text-color="grey-3" />
        <q-btn class="q-ma-xs" size="md" outline rounded label="Contactanos"  text-color="grey-3" />
      </div>
    </q-toolbar>
  </div>
  
</template>

<script>
export default {
  name: 'Navigation'
}
</script>

<style>
.pachuAzul{
  background-color: #33CDD1;
}
</style>