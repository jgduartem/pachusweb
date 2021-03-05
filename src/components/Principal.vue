<template>
  <div class="row col-12 bg-img2" style="height: 100vh">
        <div class="row col-xs-12 col-sm-12 col-md-6 col-lg-6 justify-center text-center">
          <div class="row col-12 justify-center items-center">
            <div>
              <div class="text-h2 text-weight-bold text-white">DISEÑA</div>
              <p class="text-h6 text-white">Materializa tus ideas en linea</p>
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
  background-image: url('../../public/model2.jpg');
  background-size: cover;
  background-attachment: fixed;
  background-position: center;
}
</style>