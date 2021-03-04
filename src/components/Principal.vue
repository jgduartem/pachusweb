<template>
  <div class="row col-12 bg-grey-2" style="height: 60vh">
        <div class="row col-7 justify-center text-center">
          <div class="row col-12 justify-center bg-grey-2 items-center">
            <div>
              <div class="text-h2 text-weight-medium">DISEÑA</div>
              <p class="text-h6">Materializa tus ideas en linea</p>
              <q-btn color="info" label="Crear ahora" to="/Customize" />
            </div>
          </div>
        </div>
        <div class="row col-5 bg-grey-2">
          <q-img
            src="model1.jpg"
            :ratio="16 / 9"
            spinner-color="primary"
            spinner-size="82px"
          />
        </div>
      </div>
</template>

<script>
export default {
  name: "Principal",
  data(){
    return{
      
    }
  }
}
</script>

<style>

</style>