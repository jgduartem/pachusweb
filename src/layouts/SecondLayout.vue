<template>
  <div>
    <q-layout view="hHh Lpr lff" style="height: 100vh; width: 100vw">
      <q-header elevated class="pachuRosa">
        <q-toolbar>
          <q-avatar @click="home()">
            <q-img src="ISO.jpg"/>
          </q-avatar>
          <q-space/>
          <div>
            <q-btn class="q-ma-xs" size="md" outline rounded label="Ingresar" to="/Login" v-if="activeUser != true" text-color="grey-3" />
            <q-btn class="q-ma-xs" size="md" outline rounded label="Registrate" to="/Register" v-if="activeUser != true" text-color="grey-3" />
            <q-btn class="q-ma-xs" size="md" outline rounded label="Mi Cuenta" v-if="activeUser != false" text-color="grey-3" />
            <q-btn class="q-ma-xs" size="md" outline rounded label="Salir" @click="logout()" to='/' v-if="activeUser != false" text-color="grey-3" />
            <q-btn class="q-ma-xs" size="md" flat @click="drawer = !drawer" round dense icon="shopping_cart" v-if="activeUser != false" />
          </div>
        </q-toolbar>
      </q-header>

      <q-drawer
        v-if="activeUser != false"
        side="right"
        v-model="drawer"
        :width="200"
        :breakpoint="500"
      >
        <q-scroll-area class="fit">
          <q-list padding class="menu-list">
            <shopping-list/>
          </q-list>
        </q-scroll-area>
      </q-drawer>

      <q-page-container>
        <q-page>
         <router-view></router-view>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import {auth} from 'src/firebase/firebaseConfig';
import ShoppingList from 'src/pages/ShoppingList';
import router from 'src/router';
export default {
  name: 'SecondLayout',
  components:{ShoppingList},
  data(){
      return{
      drawer: false,
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
    home(){
      this.$router.push('/')
    },
    logout(){
      auth.signOut()
      .then(() => {
        console.log('logOut');
        this.activeUser = false
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
</style>