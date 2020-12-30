<template>
  <q-layout view="lHh lpr lFf" container style="height: 100vh">
      <q-header class="row justify-between bg-dark">
        <q-toolbar>
          <q-toolbar-title>Pachus</q-toolbar-title>
          <div>
            <q-btn class="q-ma-xs" outline rounded label="Ingresar" text-color="grey-3" />
            <q-btn class="q-ma-xs" outline rounded label="Nosotros" text-color="grey-3"/>
            <q-btn class="q-ma-xs" outline rounded label="Contacto" text-color="grey-3"/>
          </div>
        </q-toolbar>
      </q-header>

      <q-page-container>
        <q-page class="row col-12 waveBg">
          <div class="q-pa-lg col-xs-12 col-sm-5 col-md-5 col-lg-5">
            <q-card class="q-pa-md justify-between row col-12 shadow-2 bg-grey-2" bordered style="height: 100%">
              <q-card class="q-ml-sm q-mb-sm col-5 shadow-2 " style="height: 50%">

              </q-card>
               <q-card class="q-mr-sm col-5 shadow-2 q-mb-sm " style="height: 50%">

              </q-card>
              <q-card class="q-ml-sm col-5 shadow-2 " style="height: 50%">

              </q-card>
               <q-card class="q-mr-sm col-5 shadow-2 " style="height: 50%">

              </q-card>
            </q-card>
          </div>
          
          <div class="q-pa-md col-xs-12 col-sm-7 col-md-7 col-lg-7 justify-center">
            <div class="flex flex-center" style="height: 100%">
              <q-img src="shopping.png" style="max-width: 100%; heigth: auto" />
               <q-btn rounded class="pachuAzul q-ma-xs" text-color="white" size="lg" label="Registrate" />
            </div>
           
          </div>
        </q-page>
      </q-page-container>
    </q-layout>
</template>

<script>
export default {

}
</script>

<style>
.pachuAzul{
  background-color: #33CDD1;
}
.pachuRosa{
  background-color: #F64965;
}
.waveBg { 
  position: relative; 
  background-color: #3bb78f; 
  background-image: linear-gradient(315deg,  #33CDD1 0%, #F64965 74%); 
} 
  
.waveBg:before { 
  content: ""; 
  position: absolute; 
  bottom: 0; 
  left: 0; 
  width: 100%; 
  height: 250px; 
  background: url('https://media.geeksforgeeks.org/wp-content/uploads/20200326181026/wave3.png'); 
  background-size: cover; 
  background-repeat: no-repeat; 
} 

</style>