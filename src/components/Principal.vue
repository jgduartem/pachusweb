<template>
  <div class="row col-12 bg-img2" style="height: 100vh">
        <div class="row col-xs-12 col-sm-12 col-md-4 col-lg-4 justify-center text-center">
          <div class="row col-12 justify-center items-center">
            <div class="q-ml-sm q-mr-sm q-pa-lg row col-12 justify-center bg-custom1">
              <div class="col-12 text-h2 text-weight-bold text-white">DISEÑA</div>
              <p class="col-12 text-h6 text-white">Materializa tus ideas en linea</p>
              <q-btn color="info" label="Crear ahora" to="/Customize" />
            </div>
          </div>
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
.bg-img2{
  background-image: url('../../public/model3.jpg');
  background-size: cover;
  background-attachment: fixed;
  background-position: center;
}
.bg-custom1{
  background-color: rgba(58, 58, 58, 0.7);
}
</style>