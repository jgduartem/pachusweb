<template>
      <div class="q-pa-sm">
        <div style="height: 90vh">
          <div style="height: 50vh">
            <q-img src="public/pachuslogo.png"/>
          </div>
          <div v-for='item in data' :key='item.id'>
            <q-card class="q-ma-xs q-mb-lg q-pa-sm">
              <q-card-section class="row col-12">
                <div class="col-6">
                  <div class="text-h4 q-mt-sm q-mb-xs">{{item.item}}</div>
                  <div class="text-overline text-primary">{{item.color}}</div>
                  <div class="text-caption text-grey">{{item.descripcion}}</div>
                  <div class="text-h5">$ {{item.precio}}</div>
                </div>
                <div class="row col-5 q-mr-md">
                  <q-img :src="item.url"/>
                </div>
              </q-card-section>
              <q-card-actions class="row justify-end">
                <q-btn label="Ver" />
                <q-btn label="Agregar al carrito" @click="addItem(item)" />
              </q-card-actions>
            </q-card>
            <q-space/>
          </div>
        </div>
 
      </div>
</template>

<script>
import {auth, tshirtsRef, hatsRef, cupsRef, othersRef, imageRef} from 'src/firebase/firebaseConfig';
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
      data: [],
      sumaprueba: 0
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
    });
    this.getData();
  },
  methods:{
    addItem(item){
      this.$store.dispatch('addItemAction', item)
      console.log(this.$store.state.items)
    },
    async getData(){
      let datos = [];
      tshirtsRef.once('value')
      .then((snapshot) => {
        snapshot.forEach((childSnapshot) => {
          let item = {
            item: childSnapshot.child('item').val(),
            cantidad: childSnapshot.child('cantidad').val(),
            color: childSnapshot.child('color').val(),
            descripcion: childSnapshot.child('descripcion').val(),
            talla: childSnapshot.child('talla').val(),
            precio: childSnapshot.child('precio').val(),
            imgName: childSnapshot.child('imgName').val(),
            url: childSnapshot.child('url').val(),
            id: childSnapshot.key
          }
          datos.push(item);
        })
      })
      hatsRef.once('value')
      .then((snapshot) => {
        snapshot.forEach((childSnapshot) => {
          let item = {
            item: childSnapshot.child('item').val(),
            cantidad: childSnapshot.child('cantidad').val(),
            color: childSnapshot.child('color').val(),
            descripcion: childSnapshot.child('descripcion').val(),
            url: childSnapshot.child('url').val(),
            precio: childSnapshot.child('precio').val(),
            id: childSnapshot.key
          }
          datos.push(item);
        })
      })
      cupsRef.once('value')
      .then((snapshot) => {
        snapshot.forEach((childSnapshot) => {
          let item = {
            item: childSnapshot.child('item').val(),
            cantidad: childSnapshot.child('cantidad').val(),
            color: childSnapshot.child('color').val(),
            descripcion: childSnapshot.child('descripcion').val(),
            url: childSnapshot.child('url').val(),
            precio: childSnapshot.child('precio').val(),
            id: childSnapshot.key
          }
          datos.push(item);
        })
      })
      othersRef.once('value')
      .then((snapshot) => {
        snapshot.forEach((childSnapshot) => {
          let item = {
            item: childSnapshot.child('item').val(),
            color: childSnapshot.child('color').val(),
            cantidad: childSnapshot.child('cantidad').val(),
            descripcion: childSnapshot.child('descripcion').val(),
            url: childSnapshot.child('url').val(),
            precio: childSnapshot.child('precio').val(),
            id: childSnapshot.key
          }
          datos.push(item);
        })
      })
      this.data = await datos;
      console.log(this.data)
    },
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