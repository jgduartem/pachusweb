<template>
  <div>
    <div v-if="user == true">
      <q-table
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
            <q-btn
              color="primary"
              label="Agregar Articulo"
              :disable="selected.length == 1"
              @click="addModal = true"
            />
            <q-btn
              class="q-ml-sm"
              color="primary"
              :disable="selected.length == 0"
              label="Eliminar Articulo"
              @click="
                deleteItem(
                  selected[0].id,
                  selected[0].item,
                  selected[0].imgName
                )
              "
            />
            <q-btn
              class="q-ml-sm"
              color="primary"
              :disable="selected.length == 0"
              label="Editar Articulo"
              @click="editModal(selected[0])"
            />
          </div>
          <q-space />
        </template>

        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th v-for="col in props.cols" :key="col.name" :props="props">
              {{ col.label }}
            </q-th>
          </q-tr>
        </template>
        <template v-slot:body="props">
          <q-tr>
            <q-td v-for="i in columns" :key="i.name">
              <div v-if="i.name == 'select'">
                <q-checkbox v-model="props.selected" />
              </div>
              <div v-else-if="i.name == 'talla'">
                <div v-for="(j, index) in props.row[i.name]" :key="index">
                  Talla: {{ props.row[i.name][index].talla }} Cantidad:
                  {{ props.row[i.name][index].cantidad }}
                </div>
              </div>
              <div v-else>
                {{ props.row[i.name] }}
              </div>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>

    <q-dialog v-model="addModal" full-width>
      <q-card>
        <q-bar class="bg-primary">
          <q-space />
          <q-btn dense flat icon="close" color="grey-3" v-close-popup>
            <q-tooltip>Close</q-tooltip>
          </q-btn>
        </q-bar>
        <q-card-section>
          <q-form class="row">
            <q-select
              v-model="category"
              :options="options"
              label="Categoria"
              required
              class="q-pa-md col-xs-12 col-sm-6 col-md-6 col-lg-6"
            />
            <q-input
              class="q-pa-md col-xs-12 col-sm-6 col-md-6 col-lg-6"
              label="Nombre"
              v-model="newItem.name"
            />
            <q-input
              class="q-pa-md col-xs-12 col-sm-6 col-md-6 col-lg-6"
              label="Color"
              v-model="newItem.color"
            />
            <q-input
              class="q-pa-md col-xs-12 col-sm-6 col-md-6 col-lg-6"
              label="Descripcion"
              v-model="newItem.descripcion"
            />
            <q-input
              class="q-pa-md col-xs-12 col-sm-6 col-md-6 col-lg-6"
              type="number"
              label="Cantidad"
              v-model="newItem.cantidad"
              v-if="category != 'Ropa'"
            />
            <div v-if="category == 'Ropa'" class="row col-12">
              <q-input
                class="q-pa-md col-xs-12 col-sm-6 col-md-6 col-lg-6"
                v-model="size.size"
                type="text"
                label="Talla"
              />
              <q-input
                class="q-pa-md col-xs-12 col-sm-6 col-md-6 col-lg-6"
                v-model="size.quantity"
                type="text"
                label="Cantidad"
              />
              <div class="row col-12 justify-end">
                <q-btn
                  class="q-ma-sm"
                  color="primary"
                  label="Agregar talla"
                  icon="add"
                  @click="addSize()"
                  :disable="size.size == '' || size.quantity == ''"
                />
              </div>
            </div>
            <div
              v-if="category == 'Ropa' && newItem.talla.length > 0"
              class="row col-12 justify-center"
            >
              <div v-for="(i, index) in newItem.talla" :key="index">
                <q-item class="row col-12">
                  <q-item-section class="row col-10">
                    Talla: {{ newItem.talla[index].talla }} Cantidad :{{
                      newItem.talla[index].cantidad
                    }}
                  </q-item-section>
                  <q-item-section class="row col-2">
                    <q-btn
                      color="red"
                      size="xs"
                      icon="delete"
                      @click="removeSize(index)"
                    />
                  </q-item-section>
                </q-item>
              </div>
            </div>
            <q-input
              class="col-xs-12 col-sm-12 col-md-12 col-lg-12"
              type="number"
              label="Precio"
              v-model="newItem.precio"
            />
            <q-file
              class="q-pa-sm"
              label="Adjuntar Imagen Frontal"
              v-model="imageFront"
            >
              <template v-slot:prepend>
                <q-icon name="attach_file" />
              </template>
            </q-file>
            <q-file
              class="q-pa-sm"
              label="Adjuntar Imagen Posterior"
              v-model="imageBack"
            >
              <template v-slot:prepend>
                <q-icon name="attach_file" />
              </template>
            </q-file>
            <q-file
              class="q-pa-sm"
              label="Adjuntar Imagen Izquierda"
              v-model="imageLeft"
            >
              <template v-slot:prepend>
                <q-icon name="attach_file" />
              </template>
            </q-file>
            <q-file
              class="q-pa-sm"
              label="Adjuntar Imagen Derecha"
              v-model="imageRight"
            >
              <template v-slot:prepend>
                <q-icon name="attach_file" />
              </template>
            </q-file>
            <div class="row col-12 justify-end">
              <q-btn
                class="q-ma-sm"
                label="Guardar Imagen"
                @click="uploadImage()"
              />
              <q-btn
                class="q-ma-sm"
                label="Guardar"
                @click="addItem(newItem, category)"
                :disabled="saveButton == false"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="modalEdit" full-width>
      <q-card>
        <q-bar class="bg-primary">
          <q-space />
          <q-btn dense flat icon="close" color="grey-3" v-close-popup>
            <q-tooltip>Close</q-tooltip>
          </q-btn>
        </q-bar>
        <q-card-section>
          <q-form>
            <q-select
              filled
              v-model="category"
              :options="options"
              label="Categoria"
              disable
            />
            <q-input label="Nombre" v-model="newItem.name" />
            <q-input label="Color" v-model="newItem.color" />
            <q-input label="Descripcion" v-model="newItem.descripcion" />
            <q-input
              type="number"
              label="Cantidad"
              v-model="newItem.cantidad"
              v-if="category != 'Ropa'"
            />
            <q-input type="number" label="Precio" v-model="newItem.precio" />
            <div v-if="category == 'Ropa'">
              <q-input v-model="size.size" type="text" label="Talla" />
              <q-input v-model="size.quantity" type="text" label="Cantidad" />
              <q-btn
                class="q-ma-sm"
                color="primary"
                icon="add"
                label="Agregar talla"
                @click="addSize()"
                :disable="size.size == '' || size.quantity == ''"
              />
            </div>
            <div v-if="category == 'Ropa' && newItem.talla.length > 0">
              <div v-for="(i, index) in newItem.talla" :key="index">
                <q-item class="row col-12">
                  <q-item-section class="row col-10">
                    Talla: {{ newItem.talla[index].talla }} Cantidad :{{
                      newItem.talla[index].cantidad
                    }}
                  </q-item-section>
                  <q-item-section class="row col-2">
                    <q-btn
                      color="red"
                      size="xs"
                      icon="delete"
                      @click="removeSize(index)"
                    />
                  </q-item-section>
                </q-item>
              </div>
            </div>
            <q-btn
              label="Actualizar"
              @click="editItem(selected[0], category)"
            />
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import {
  auth,
  db,
  storage,
  clothesRef,
  hatsRef,
  cupsRef,
  othersRef,
  imageRef,
} from "../firebase/firebaseConfig";

export default {
  name: "AdminPage",
  firebase: {
    tshirts: clothesRef,
    cups: cupsRef,
    hats: hatsRef,
    others: othersRef,
  },
  data() {
    return {
      size: {
        size: "",
        quantity: "",
      },
      imageFront: null,
      imageBack: null,
      imageLeft: null,
      imageRight: null,
      saveButton: false,
      urlImage: "",
      user: false,
      addModal: false,
      modalEdit: false,
      selected: [],
      data: [],
      newItem: {
        item: "",
        name: "",
        cantidad: "",
        color: "",
        talla: [],
        descripcion: "",
        url: {},
        precio: "",
        imgName: "",
      },
      options: ["Ropa", "Gorra", "Taza", "Otro"],
      category: "",
      columns: [
        {
          name: "select",
          label: "",
          field: "select",
          align: "left",
        },
        {
          name: "item",
          label: "Item",
          field: "item",
          align: "left",
        },
        {
          name: "name",
          label: "Nombre",
          field: "name",
          align: "left",
        },
        {
          name: "cantidad",
          label: "Cantidad",
          field: "cantidad",
          align: "left",
        },
        {
          name: "descripcion",
          label: "Descripcion",
          field: "descripcion",
          align: "left",
        },
        {
          name: "talla",
          label: "Talla",
          field: "talla",
          align: "left",
        },
        {
          name: "color",
          label: "Color",
          field: "color",
          align: "left",
        },
        {
          name: "precio",
          label: "Precio",
          field: "precio",
          align: "left",
        },
      ],
    };
  },
  created() {
    auth.onAuthStateChanged((user) => {
      if (
        user != undefined &&
        (user.email == process.env.ADMIN_USER1 ||
          user.email == process.env.ADMIN_USER2)
      ) {
        this.user = true;
        this.getData();
      } else {
        this.user = false;
        this.$router.push("/");
      }
    });
  },
  methods: {
    addSize() {
      let sizeToAdd = {};
      sizeToAdd = {
        talla: this.size.size,
        cantidad: this.size.quantity,
      };
      this.newItem.talla.push(sizeToAdd);
      console.log(this.newItem.talla);
    },
    removeSize(index) {
      this.newItem.talla.splice(index, 1);
    },
    addItem(newItem, category) {
      switch (category) {
        case "Ropa":
          clothesRef.push({
            name: newItem.name,
            item: category,
            color: newItem.color,
            talla: newItem.talla,
            descripcion: newItem.descripcion,
            url: newItem.url,
            precio: newItem.precio,
            imgName: {
              frontName: this.imageFront.name,
              backName: this.imageBack.name,
              leftName: this.imageLeft.name,
              rightName: this.imageRight.name,
            },
          });
          this.cleanModal();
          this.getData();
          break;

        case "Gorra":
          hatsRef.push({
            name: newItem.name,
            item: category,
            cantidad: newItem.cantidad,
            color: newItem.color,
            descripcion: newItem.descripcion,
            url: newItem.url,
            precio: newItem.precio,
          });
          this.cleanModal();
          this.getData();
          break;

        case "Taza":
          cupsRef.push({
            item: category,
            name: newItem.name,
            cantidad: newItem.cantidad,
            color: newItem.color,
            descripcion: newItem.descripcion,
            url: newItem.url,
            precio: newItem.precio,
          });
          this.cleanModal();
          this.getData();
          break;

        case "Otro":
          othersRef.push({
            item: category,
            name: newItem.name,
            cantidad: newItem.cantidad,
            descripcion: newItem.descripcion,
            url: newItem.url,
            precio: newItem.precio,
          });
          this.cleanModal();
          this.getData();
      }
    },
    cleanModal() {
      this.newItem.cantidad = "";
      this.newItem.item = "";
      this.newItem.color = "";
      this.newItem.talla = [];
      this.newItem.descripcion = "";
      this.newItem.url = "";
      this.newItem.precio = "";
      this.category = "";
      this.image = null;
      this.saveButton = 0;
    },
    async getData() {
      let datos = [];
      clothesRef.once("value").then((snapshot) => {
        snapshot.forEach((childSnapshot) => {
          let item = {
            item: childSnapshot.child("item").val(),
            name: childSnapshot.child("name").val(),
            cantidad: childSnapshot.child("cantidad").val(),
            color: childSnapshot.child("color").val(),
            descripcion: childSnapshot.child("descripcion").val(),
            talla: childSnapshot.child("talla").val(),
            precio: childSnapshot.child("precio").val(),
            imgName: childSnapshot.child("imgName").val(),
            url: childSnapshot.child("url").val(),
            id: childSnapshot.key,
          };
          datos.push(item);
        });
      });
      hatsRef.once("value").then((snapshot) => {
        snapshot.forEach((childSnapshot) => {
          let item = {
            item: childSnapshot.child("item").val(),
            name: childSnapshot.child("name").val(),
            cantidad: childSnapshot.child("cantidad").val(),
            color: childSnapshot.child("color").val(),
            descripcion: childSnapshot.child("descripcion").val(),
            imgName: childSnapshot.child("imgName").val(),
            url: childSnapshot.child("url").val(),
            precio: childSnapshot.child("precio").val(),
            id: childSnapshot.key,
          };
          datos.push(item);
        });
      });
      cupsRef.once("value").then((snapshot) => {
        snapshot.forEach((childSnapshot) => {
          let item = {
            item: childSnapshot.child("item").val(),
            name: childSnapshot.child("name").val(),
            cantidad: childSnapshot.child("cantidad").val(),
            color: childSnapshot.child("color").val(),
            descripcion: childSnapshot.child("descripcion").val(),
            imgName: childSnapshot.child("imgName").val(),
            url: childSnapshot.child("url").val(),
            precio: childSnapshot.child("precio").val(),
            id: childSnapshot.key,
          };
          datos.push(item);
        });
      });
      othersRef.once("value").then((snapshot) => {
        snapshot.forEach((childSnapshot) => {
          let item = {
            item: childSnapshot.child("item").val(),
            name: childSnapshot.child("name").val(),
            color: childSnapshot.child("color").val(),
            cantidad: childSnapshot.child("cantidad").val(),
            descripcion: childSnapshot.child("descripcion").val(),
            imgName: childSnapshot.child("imgName").val(),
            url: childSnapshot.child("url").val(),
            precio: childSnapshot.child("precio").val(),
            id: childSnapshot.key,
          };
          datos.push(item);
        });
      });
      this.data = await datos;
      console.log(this.data);
    },
    async deleteItem(id, category, imgName) {
      const imgFrontRef = imageRef.child("image/" + imgName.frontName);
      const imgBackRef = imageRef.child("image/" + imgName.backName);
      const imgLeftRef = imageRef.child("image/" + imgName.leftName);
      const imgRightRef = imageRef.child("image/" + imgName.rightName);
      console.log(category.toLowerCase());
      switch (category.toLowerCase()) {
        case "ropa":
          console.log(id);
          this.$q.loading.show({
            delay: 100,
            message: "Eliminado Articulo",
          });
          await clothesRef.child(id).remove();
          await imgFrontRef.delete();
          await imgBackRef.delete();
          await imgLeftRef.delete();
          await imgRightRef.delete();
          this.selected = [];
          await this.getData();
          this.$q.loading.hide();
          break;

        case "gorra":
          console.log(id);
          await hatsRef.child(id).remove();
          await imgFrontRef.delete();
          await imgBackRef.delete();
          await imgLeftRef.delete();
          await imgRightRef.delete();
          this.selected = [];
          await this.getData();
          break;

        case "taza":
          console.log(id);
          await cupsRef.child(id).remove();
          await imgFrontRef.delete();
          await imgBackRef.delete();
          await imgLeftRef.delete();
          await imgRightRef.delete();
          this.selected = [];
          await this.getData();
          break;

        default:
          console.log(id);
          othersRef.child(id).remove();
          await imgFrontRef.delete();
          await imgBackRef.delete();
          await imgLeftRef.delete();
          await imgRightRef.delete();
          this.selected = [];
          this.getData();
          break;
      }
    },
    editItem(item, category) {
      let id = item.id;
      let change = {};
      switch (category.toLowerCase()) {
        case "ropa":
          let updateShirtInfo = {
            item: this.category,
            name: this.newItem.name,
            cantidad: this.newItem.cantidad,
            color: this.newItem.color,
            descripcion: this.newItem.descripcion,
            talla: this.newItem.talla,
            url: this.newItem.url,
            precio: this.newItem.precio,
          };
          change[id] = updateShirtInfo;
          clothesRef.update(change);
          this.cleanModal();
          this.getData();
          this.modalEdit = false;
          break;

        case "gorra":
          let updateHatInfo = {
            item: this.category,
            name: this.newItem.name,
            cantidad: this.newItem.cantidad,
            color: this.newItem.color,
            descripcion: this.newItem.descripcion,
            url: this.newItem.url,
            precio: this.newItem.precio,
          };
          change[id] = updateHatInfo;
          hatsRef.update(change);
          this.cleanModal();
          this.getData();
          this.modalEdit = false;
          break;

        case "taza":
          let updateCupsInfo = {
            item: this.category,
            name: this.newItem.name,
            cantidad: this.newItem.cantidad,
            color: this.newItem.color,
            descripcion: this.newItem.descripcion,
            url: this.newItem.url,
            precio: this.newItem.precio,
          };
          change[id] = updateCupsInfo;
          cupsRef.update(change);
          this.cleanModal();
          this.getData();
          this.modalEdit = false;
          break;

        default:
          let updateOthersInfo = {
            item: this.category,
            name: this.newItem.name,
            cantidad: this.newItem.cantidad,
            color: this.newItem.color,
            descripcion: this.newItem.descripcion,
            url: this.newItem.url,
            precio: this.newItem.precio,
          };
          change[id] = updateOthersInfo;
          othersRef.update(change);
          this.cleanModal();
          this.getData();
          this.modalEdit = false;
          break;
      }
    },
    editModal(item) {
      console.log(item);
      this.modalEdit = true;
      this.category = item.item;
      this.newItem.item = item.item;
      this.newItem.name = item.name;
      this.newItem.cantidad = item.cantidad;
      this.newItem.color = item.color;
      this.newItem.talla = item.talla;
      this.newItem.descripcion = item.descripcion;
      this.newItem.url = item.url;
      this.newItem.precio = item.precio;
    },
    async uploadImage() {
      console.log(this.imageFront.name);
      const imgFrontRef = imageRef.child("image/" + this.imageFront.name);
      const imgBackRef = imageRef.child("image/" + this.imageBack.name);
      const imgLeftRef = imageRef.child("image/" + this.imageLeft.name);
      const imgRightRef = imageRef.child("image/" + this.imageRight.name);
      const metaData = { contentType: "img/png" };
      this.$q.loading.show({
        delay: 100,
        message: "Cargando Imagen 1/4",
      });
      await imgFrontRef
        .put(this.imageFront, metaData)
        .then(async (data) => {
          console.log(data);
          await imgFrontRef.getDownloadURL().then(async (urlFront) => {
            console.log(urlFront);
            this.newItem.url.urlFront = await urlFront;
          });
          this.saveButton += 1;
          this.$q.loading.hide();
        })
        .catch((err) => {
          console.log(err);
          this.$q.loading.hide();
        });
      this.$q.loading.show({
        delay: 100,
        message: "Cargando Imagen 2/4",
      });
      await imgBackRef
        .put(this.imageBack, metaData)
        .then(async (data) => {
          console.log(data);
          await imgBackRef.getDownloadURL().then(async (urlBack) => {
            console.log(urlBack);
            this.newItem.url.urlBack = await urlBack;
          });
          this.saveButton += 1;
          this.$q.loading.hide();
        })
        .catch((err) => {
          console.log(err);
          this.$q.loading.hide();
        });
      this.$q.loading.show({
        delay: 100,
        message: "Cargando Imagen 3/4",
      });
      await imgLeftRef
        .put(this.imageLeft, metaData)
        .then(async (data) => {
          console.log(data);
          await imgLeftRef.getDownloadURL().then(async (urlLeft) => {
            console.log(urlLeft);
            this.newItem.url.urlLeft = await urlLeft;
          });
          this.saveButton += 1;
          this.$q.loading.hide();
        })
        .catch((err) => {
          console.log(err);
          this.$q.loading.hide();
        });
      this.$q.loading.show({
        delay: 100,
        message: "Cargando Imagen 4/4",
      });
      await imgRightRef
        .put(this.imageRight, metaData)
        .then(async (data) => {
          console.log(data);
          await imgRightRef.getDownloadURL().then(async (urlRight) => {
            console.log(urlRight);
            this.newItem.url.urlRight = await urlRight;
          });
          this.saveButton += 1;
          this.$q.loading.hide();
        })
        .catch((err) => {
          console.log(err);
          this.$q.loading.hide();
        });
    },
  },
};
</script>
