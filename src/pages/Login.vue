<template>
  <div class="q-pa-sm waveBg" style="height: 90vh">
    <div class="flex flex-center align-center" style="height: 90vh">
      <q-card class="" style="width: 60vh">
        <q-card-section>
          <q-input  class="q-ma-sm" type="text" rounded outlined label="Email" v-model="email" />
          <q-input  class="q-ma-sm" :type='isPwd ? "password" : "text"' rounded outlined label="Contraseña" v-model="pass">
            <template v-slot:append>
              <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click='isPwd = !isPwd' />
            </template>
          </q-input>
          <div class="row justify-end q-ma-sm">
            <q-btn class="q-ma-sm" label="Entrar" @click="login(email, pass)" />
            <q-btn class="q-ma-sm" label="Reestablecer Clave" @click="reset=true" />
          </div>
        </q-card-section>
      </q-card>
    </div>
    <q-dialog v-model='reset'>
      <q-card>
        <q-bar>
          <q-space/>
          <q-btn dense flat icon="close" color='grey-3' v-close-popup>
            <q-tooltip>Cerrar</q-tooltip>
          </q-btn>
        </q-bar>
        <q-card-section class="row col-12">
          <q-item class="row col-12">
            <q-item-section>
              <q-item-label>Ingresa Correo para reestablecer contraseña</q-item-label>
              <q-input class="q-ma-sm" label="Correo" type="text" v-model="resetEmail"/>
              <q-btn class="q-ma-sm " label="Enviar" @click="restartPass(resetEmail)" :disable="resetEmail == ''"/>
            </q-item-section>
          </q-item>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import {auth} from '../firebase/firebaseConfig';
export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      pass: '',
      isPwd: true,
      reset: false,
      resetEmail: '',
    }
  },
  created(){

  },
  methods: {
    login(email, pass){
      auth.signInWithEmailAndPassword(email, pass).then(() =>{
        console.log('autenticado')
        this.$router.replace("/Admin");
      })
      .catch((error) => {
        console.log(error);
      })
    },
    logout(email, pass){
      auth.signOut()
      .then(() => {
        console.log('logout');
      })
      .catch((error) => {
        console.log(error)
      })
    },
    restartPass(email){
      if(email != ''){
        auth.sendPasswordResetEmail(email)
        .then(() => {
          console.log('correo enviado');
        })
        .catch((error) => {
          console.log(error);
        })
      }
    }
  },
}
</script>

<style>
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

.pachuAzul{
  background-color: #33CDD1;
}
.pachuRosa{
  background-color: #F64965;
}
</style>