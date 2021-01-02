<template>
  <div>
    <div>
      <q-table
        grid
        class="q-ma-md"
        title="Inventario"
        :data="data"
        :columns="columns"
        row-key="id"
        selection="single"
        :selected.sync="selected"
      >
      <template v-slot:top>
        <div class="row col-12 justify-end">
          <q-btn color="primary" label="Agregar Articulo" :disable='selected.length==1' @click="addModal = true" />
          <q-btn class="q-ml-sm" color="primary" :disable='selected.length==0'  label="Eliminar Articulo" @click="deleteItem(selected[0].id, selected[0].item)" />
          <q-btn class="q-ml-sm" color="primary" :disable='selected.length==0'  label="Editar Articulo" @click="editModal(selected[0])" />
        </div>
        <q-space />
      </template>

      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
          >
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>
      <template v-slot:body="props">
        <q-tr>
          <q-td v-for="i in columns" :key='i.name'>
            <div v-if='i.name=="select"'>
              <q-checkbox v-model='props.selected'/>
            </div>
            {{ props.row[i.name] }}
          </q-td>
        </q-tr>
      </template>

      </q-table>
    </div>

    <q-dialog v-model="addModal">
      <q-card>
        <q-bar class="bg-primary">
          <q-space />
          <q-btn dense flat icon="close" color="grey-3" v-close-popup>
            <q-tooltip>Close</q-tooltip>
          </q-btn>
        </q-bar>
        <q-card-section>
          <q-form>
            <q-select v-model="category" :options="options" label="Categoria" required />
            <q-input v-if="category == 'Otros'" label="Nombre" v-model="newItem.name" />
            <q-input label="Color" v-model="newItem.color" />
            <q-input v-if="category == 'Franelas'" label="Talla" v-model="newItem.talla" />  
            <q-input label="Descripcion" v-model="newItem.descripcion" />        
            <q-input label="Cantidad" v-model="newItem.cantidad" />
            <q-input label="Precio" v-model="newItem.precio" />
            <q-file  label="Adjuntar Archivo" v-model="image">
              <template v-slot:prepend>
                <q-icon name="attach_file" />
              </template>
            </q-file>
            <q-btn label="Guardar Imagen" @click="uploadImage()" :disabled="image==null" />
            <q-btn label="Guardar" @click="addItem(newItem, category)" :disabled="saveButton==false" />
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="modalEdit">
      <q-card>
        <q-bar class="bg-primary">
          <q-space />
          <q-btn dense flat icon="close" color="grey-3" v-close-popup>
            <q-tooltip>Close</q-tooltip>
          </q-btn>
        </q-bar>
        <q-card-section>
          <q-form>
            <q-select filled v-model="category" :options="options" label="Categoria" disable />
            <q-input v-if="category == 'Otros'" label="Nombre" v-model="newItem.name" />
            <q-input label="Color" v-model="newItem.color" />
            <q-input v-if="category == 'Franelas'" label="Talla" v-model="newItem.talla" />  
            <q-input label="Descripcion" v-model="newItem.descripcion" />        
            <q-input label="Cantidad" v-model="newItem.cantidad" />
            <q-input label="Precio" v-model="newItem.precio" />
            <q-btn label="Actualizar" @click="editItem(selected[0], category)" />
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

  </div>
</template>

<script>
import {auth, db, storage, tshirtsRef, hatsRef, cupsRef, othersRef, imageRef} from '../firebase/firebaseConfig';

export default {
  name: 'AdminPage',
  firebase: {
    tshirts: tshirtsRef,
    cups: cupsRef,
    hats: hatsRef,
    others: othersRef
  },
  data() {
    return {
      image: null,
      saveButton: false,
      urlImage: '',
      user: '',
      addModal: false,
      modalEdit: false,
      selected: [],
      data: [],
      newItem: {
        item: '',
        name: '',
        cantidad: '',
        color: '',
        talla: '',
        descripcion: '',
        url: '',
        precio: '',
        imgName: '',
      },
      options: ['Franela', 'Gorra', 'Taza', 'Otro'],
      category: '',
      columns: [
        {
          name: 'select',
          label: '',
          field: 'select',
          align: 'left'
        },
        {
          name: 'item',
          label: 'Item',
          field: 'item',
          align: 'left'
        },
        {
          name: 'cantidad',
          label: 'Cantidad',
          field: 'cantidad',
          align: 'left'
        },
        {
          name:'descripcion',
          label: 'Descripcion',
          field: 'descripcion',
          align: 'left'
        },
        {
          name:'talla',
          label: 'Talla',
          field: 'talla',
          align: 'left'
        },
        {
          name: 'color',
          label: 'Color',
          field: 'color',
          align: 'left'
        },
        {
          name: 'precio',
          label: 'Precio',
          field: 'precio',
          align: 'left'
        }
      ]
    }
  },
  created() {
    auth.onAuthStateChanged((user) => {
      if(user){
        this.user = auth.currentUser.email;
      }
      else{
        console.log('no user')
      }
    })
    this.getData();
  },
  methods: {
    addItem(newItem, category){
      switch(category){
        case 'Franela':
          tshirtsRef.push({
            item: category,
            cantidad: newItem.cantidad,
            color: newItem.color,
            talla: newItem.talla,
            descripcion: newItem.descripcion,
            url: this.urlImage,
            precio: newItem.precio,
            imgName: this.image.name
          });
          this.cleanModal();
          this.getData();
          break;

        case 'Gorras':
          hatsRef.push({
            item: category,
            cantidad: newItem.cantidad,
            color: newItem.color,
            descripcion: newItem.descripcion,
            url: newItem.url,
            precio: newItem.precio
          })
          this.cleanModal();
          this.getData();
          break;
        
        case 'Taza':
          cupsRef.push({
            item: category,
            cantidad: newItem.cantidad,
            color: newItem.color,
            descripcion: newItem.descripcion,
            url: newItem.url,
            precio: newItem.precio
          })
          this.cleanModal();
          this.getData();
          break;
        
        case 'Otro':
          othersRef.push({
            item: category,
            name: newItem.name,
            cantidad: newItem.cantidad,
            descripcion: newItem.descripcion,
            url: newItem.url,
            precio: newItem.precio
          })
          this.cleanModal();
          this.getData();
      }
    },
    cleanModal(){
      this.newItem.cantidad = '';
      this.newItem.item = '';
      this.newItem.color = '';
      this.newItem.talla = '';
      this.newItem.descripcion = '';
      this.newItem.url = '';
      this.newItem.precio = '';
      this.category = '';
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
    deleteItem(id ,category){
      console.log(category.toLowerCase())
      switch (category.toLowerCase()){
        case 'franela': 
          console.log(id)
          tshirtsRef.child(id).remove();
          this.selected = [];
          this.getData();
        break;

        case 'gorra':
          console.log(id)
          hatsRef.child(id).remove();
          this.selected = [];
          this.getData();
        break;

        case 'taza':
          console.log(id)
          cupsRef.child(id).remove();
          this.selected = [];
          this.getData();
        break;

        default:
          console.log(id)
          othersRef.child(id).remove();
          this.selected = [];
          this.getData();
        break;
      }
    },
    editItem(item, category){
      let id = item.id
      let change = {};
      switch(category.toLowerCase()){
        case 'franela':
          let updateShirtInfo = {
            item: this.category,
            cantidad: this.newItem.cantidad,
            color: this.newItem.color,
            descripcion: this.newItem.descripcion,
            talla: this.newItem.talla,
            url: this.newItem.url,
            precio: this.newItem.precio
          }
          change[id] = updateShirtInfo;
          tshirtsRef.update(change)
          this.cleanModal();
          this.getData();
          this.modalEdit = false;
          break;
        
        case 'gorra':
          let updateHatInfo = {
            item: this.category,
            cantidad: this.newItem.cantidad,
            color: this.newItem.color,
            descripcion: this.newItem.descripcion,
            url: this.newItem.url,
            precio: this.newItem.precio
          }
          change[id] = updateHatInfo;
          hatsRef.update(change)
          this.cleanModal();
          this.getData();
          this.modalEdit = false;
          break;

        case 'taza':
          let updateCupsInfo = {
            item: this.category,
            cantidad: this.newItem.cantidad,
            color: this.newItem.color,
            descripcion: this.newItem.descripcion,
            url: this.newItem.url,
            precio: this.newItem.precio
          }
          change[id] = updateCupsInfo;
          cupsRef.update(change)
          this.cleanModal();
          this.getData();
          this.modalEdit = false;
          break;
        
        default:
          let updateOthersInfo = {
            item: this.category,
            cantidad: this.newItem.cantidad,
            color: this.newItem.color,
            descripcion: this.newItem.descripcion,
            url: this.newItem.url,
            precio: this.newItem.precio
          }
          change[id] = updateOthersInfo;
          othersRef.update(change)
          this.cleanModal();
          this.getData();
          this.modalEdit = false;
          break;
          
      }
    },
    editModal(item){
      console.log(item)
      this.modalEdit = true;
      this.category = item.item
      this.newItem.item = item.item;
      this.newItem.cantidad = item.cantidad;
      this.newItem.color = item.color;
      this.newItem.talla = item.talla;
      this.newItem.descripcion = item.descripcion;
      this.newItem.url = item.url;
      this.newItem.precio = item.precio;
    },
    uploadImage(){
      console.log(this.image.name)
      const imgRef = imageRef.child('image/' + this.image.name);
      const metaData = {contentType: 'img/png'};
      imgRef.put(this.image, metaData)
      .then(async (data) => {
        await console.log(data)
        imageRef.child('image/' + this.image.name).getDownloadURL()
        .then(async(url) => {
          await console.log(url)
          this.urlImage = url;

        })
        this.saveButton = true;
      })
      .catch((err) => {
        console.log(err)
      })
    },
  },
}
</script>
