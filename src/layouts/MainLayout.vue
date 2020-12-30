<template>
  <q-layout view="lHh lpr lFf" container style="height: 100vh">
      <q-header class="row justify-between bg-dark">
        <q-toolbar>
          <q-toolbar-title>Pachus</q-toolbar-title>
          <div>
            <q-btn class="q-ma-xs" outline rounded label="Ingresar" to="/Login" v-if="activeUser != true" text-color="grey-3" />
            <q-btn class="q-ma-xs" outline rounded label="Salir" @click="logout()" to='/' v-if="activeUser != false" text-color="grey-3" />
            <q-btn class="q-ma-xs" outline rounded label="Nosotros" text-color="grey-3"/>
            <q-btn class="q-ma-xs" outline rounded label="Contacto" text-color="grey-3"/>
          </div>
        </q-toolbar>
      </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import {auth} from 'src/firebase/firebaseConfig';
export default {
  name: 'MainLayout',
  data () {
    return {
      activeUser: false,
    }
  },
  created(){
    auth.onAuthStateChanged((user) => {
      if(user){
        this.activeUser=true;
      }
      else{
        this.activeUser=false;
      }
    })
  },
  methods: {
    logout(){
      auth.signOut()
      .then(() => {
        console.log('logOut')
      })
      .catch((error) => {
        console.log(error);
      })
    }
  },
}
</script>
