<template>
      <div>
        <div class="row col-12 waveBg" style="height: 90vh">
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
               <q-btn v-if="session == false" rounded class="pachuAzul q-ma-xs" text-color="white" size="lg" label="Registrate" @click="registro = true" />
            </div>       
          </div>
        </div>
        <q-dialog v-model="registro" persistent full-width @hide='step=1'>
          <q-card>
            <q-bar>
              <q-space/>
              <q-btn dense flat icon="close" color="grey-3" v-close-popup>
                <q-tooltip>Cerrar</q-tooltip>
              </q-btn>
            </q-bar>
            <q-card-section>
              <q-stepper
                v-model="step"
                ref="stepper"
                color="primary"
                animated
              >
                <q-step
                  :name="1"
                  title="Introduce tu Email y Contraseña"
                  icon="settings"
                  :done="step > 1"
                >
                <q-input class="q-ma-sm" type="text" v-model="email" label="Email"/>
                <q-input  class="q-ma-sm" :type='isPwd ? "password" : "text"' label="Contraseña" v-model="pass">
                  <template v-slot:append>
                    <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click='isPwd = !isPwd' />
                  </template>
                </q-input>
                <q-input  class="q-ma-sm" :type='isPwd2 ? "password" : "text"' label="Contraseña" v-model="passConfirm">
                  <template v-slot:append>
                    <q-icon :name="isPwd2 ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click='isPwd2 = !isPwd2' />
                  </template>
                </q-input>
                <q-stepper-navigation class="row col-12 justify-end">
                  <q-btn class="q-ma-sm" label="Continuar" @click="register(email, pass)"/>
                </q-stepper-navigation>
                </q-step>

                <q-step
                  :disable='newUser==false'
                  :name="2"
                  title="Introduce tu nombre y numero telefonico"
                  icon="create_new_folder"
                  :done="step > 2"
                >
                <q-input class="q-ma-sm" type="text" label="Nombre" v-model="name" required/>
                  <q-stepper-navigation class="row col-12 justify-end">
                    <q-btn class="q-ma-sm" label="Continuar" @click="updateUser()" :disable="name == ''"/>
                  </q-stepper-navigation>
                </q-step>

                <q-step
                  :name="3"
                  title="Finalizado"
                  icon="assignment"
                >
                  Completado.
                  <q-stepper-navigation class="row col-12 justify-end">
                    <q-btn class="q-ma-sm" label="Finalizar" @click="registro=false"/>
                  </q-stepper-navigation>
                </q-step>
              </q-stepper>
            </q-card-section>
          </q-card>
        </q-dialog>
      </div>
</template>

<script>
import {auth} from 'src/firebase/firebaseConfig';
export default {
  name: 'Index',
  data(){
    return{
      name: '',
      newUser: false,
      isPwd: true,
      isPwd2: true,
      session: false,
      email: '',
      pass: '',
      passConfirm: '',
      registro: false,
      step: 1,
    }
  },
  created(){
    auth.onAuthStateChanged((user)=>{
      if(user){
        console.log(user)
        this.session=true;
      }else{
        this.session=false;
      }
    })
  },
  methods:{
    register(mail, password){
      if(this.pass == this.passConfirm){
        auth.createUserWithEmailAndPassword(mail, password)
        .then(() => {
          console.log('creado');
          this.step +=1;
          this.newUser = true;
        })
        .catch((error) => {
          console.log(error);
        })
      }else{
        console.log('no coincide');
      }
    },
    updateUser(){
      let user = auth.currentUser;
      user.updateProfile({
        displayName: this.name,
      }).then(() => {
        this.step +=1;
        console.log(user);
        console.log('correcto');
      })
      .catch((error) =>{
        console.log(error);
      })
    }
  }
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
  background-color: #33CDD1; 
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