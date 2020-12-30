<template>
  <div>
    <div>
      <q-input label="Email" v-model="email" />
      <q-input label="Contrase;a" v-model="pass" />
      <q-btn label="LogIn" @click="login(email, pass)" />
      <q-btn label="LogOut" @click="logout()" />
    </div>
  </div>
</template>

<script>
import {auth} from '../firebase/firebaseConfig';
export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      pass: ''
    }
  },
  created(){
    auth.onAuthStateChanged((user) =>{
      if(user){
        console.log('hay sesion')
      }
      else{
        console.log('no hay sesion')
      }
    })
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
  },
}
</script>

<style>

</style>