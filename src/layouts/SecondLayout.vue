<template>
  <div>
    <q-layout view="hHh Lpr lff" style="height: 100vh">
      <q-header class="row no-wrap bg-dark">
        <q-toolbar>
          <q-avatar @click="home()">
            <q-img src="ISO.jpg"/>
          </q-avatar>
          <q-space/>
          <q-btn-group>
            <q-btn class="q-ma-xs" size="md" outline rounded label="Ingresar" to="/Login" v-if="activeUser != true" text-color="grey-3" />
            <q-btn class="q-ma-xs" size="md" outline rounded label="Registrate" to="/Register" v-if="activeUser != true" text-color="grey-3" />
            <q-btn class="q-ma-xs" size="md" outline rounded label="Mi Cuenta" v-if="activeUser != false" text-color="grey-3" to="/MyAccount" />
            <q-btn class="q-ma-xs" size="md" outline rounded label="Salir" @click="logout()" to='/' v-if="activeUser != false" text-color="grey-3" />
            <q-btn class="q-ma-xs" size="md" flat @click="openModal()" round dense icon="shopping_cart" v-if="activeUser != false" />
          </q-btn-group>
        </q-toolbar>
      </q-header>

      <q-page-container>
        <q-page>
         <router-view></router-view>
          <q-page-sticky v-if="$route.path != '/Customize'" position="bottom-right" :offset="[18, 18]">
            <q-btn fab icon="fab fa-whatsapp" color="green" @click="openWhatsapp()" />
          </q-page-sticky>
          <ShoppingCart v-if="dialog==true" @closeModal='closeModal()' />
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import {auth} from 'src/firebase/firebaseConfig';
import ShoppingList from 'src/pages/ShoppingList';
import ShoppingCart from "src/components/ShoppingCart";
import router from 'src/router';
export default {
  name: 'SecondLayout',
  components:{ShoppingList, ShoppingCart},
  data(){
      return{
      dialog: false,
      activeUser: false,
    }
  },
  created(){
    auth.onAuthStateChanged((user) => {
      if(user){
        this.activeUser = true;
        console.log(user)
      }else{
        this.activeUser = false;
      }
    })
  },
  methods: {
    openModal(){
      this.dialog = true;
    },
    closeModal(){
      this.dialog = false;
    },
    openWhatsapp(){
      window.open('https://api.whatsapp.com/send?phone=584248994407&text=Hola!')
    },
    home(){
      this.$router.push('/')
    },
    logout(){
      auth.signOut()
      .then(() => {
        console.log('logOut');
        this.activeUser = false
        this.$store.dispatch('cleanUserDataAction')
      })
      .catch((error) => {
        console.log(error);
      })
    },
    addToList(item){
    console.log(item)
  }
  },
}
</script>

<style>
.pachuRosa{
  background-color: #F64965;
}
.pachuAzul {
  background-color: #33cdd1;
}
</style>