<template>
      <div>
        <div style="height: 90vh">
          <div class="q-mb-md flex flex-center" >
            <q-img class="q-my-md" width="50%" height="50%" src="pachuslogo.png"/>
          </div>
          <Navigation/>
          <Card-items :data='data'/>       
        </div>
 
      </div>
</template>

<script>
import {auth, tshirtsRef, hatsRef, cupsRef, othersRef, imageRef} from 'src/firebase/firebaseConfig';
import Navigation from 'src/components/Navigation.vue';
import CardItems from 'src/components/CardItems'
export default {
  components: { Navigation, CardItems },
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

</style>