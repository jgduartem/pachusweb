<template>
  <div>
    <div class="q-pa-md">
      <q-card class="my-card row justify-center">
        <q-card-section>
          <div class="text-subtitle2">Hola {{this.$store.state.actualUser.name}},
            </br>
            </br>
            <div class="text-subtitle2">
              Desde el escritorio de tu cuenta puedes ver tu carrito y editar tu contraseña
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
    <div class="q-pa-md">
      <q-card class="my-card">
        <q-card-section class="row col-12 q-ma-sm">
          <q-field class="q-pa-md col-xs-12 col-sm-6 col-md-6 col-lg-6"  label="Nombre" stack-label>
            <template v-slot:control>
              <div class="self-center full-width no-outline" style='word-break: break-all; word-wrap: break-word;' tabindex="0">{{$store.state.actualUser.name}}</div>
            </template>
           </q-field>
           <q-field class="q-pa-md col-xs-12 col-sm-6 col-md-6 col-lg-6"  label="Teléfono" stack-label>
            <template v-slot:control>
              <div class="self-center full-width no-outline" style='word-break: break-all; word-wrap: break-word;' tabindex="0">{{$store.state.actualUser.phone}}</div>
            </template>
           </q-field>
           <q-field class="q-pa-md col-xs-12 col-sm-12 col-md-12 col-lg-12"  label="Email" stack-label>
            <template v-slot:control>
              <div class="self-center full-width no-outline" style='word-break: break-all; word-wrap: break-word;' tabindex="0">{{$store.state.actualUser.email}}</div>
            </template>
           </q-field>
           <span class="q-pa-md text-subtitle2 text-center col-12">Cambiar Contraseña</span>
           <q-input class="q-pa-md col-xs-12 col-sm-6 col-md-6 col-lg-6"  v-model="pass1" :type='isPwd == true ? "password" : "text" ' label="Contraseña" >
             <template v-slot:append>
              <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click='isPwd = !isPwd' />
            </template>
           </q-input>
           <q-input class="q-pa-md col-xs-12 col-sm-6 col-md-6 col-lg-6"  v-model="pass2" :type='isPwd == true ? "password" : "text" ' label="Confirmar Constraseña" >
             <template v-slot:append>
              <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click='isPwd = !isPwd' />
            </template>
           </q-input>
        </q-card-section>
        <q-card-actions  align="right">
          <q-btn color="info" class="q-pa-md" flat label="Guardar Cambios" @click="changePass()" />
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<script>
import { auth } from "src/firebase/firebaseConfig";
export default {
  name: "AccountData",
  props: {},
  data() {
    return {
      pass1: "",
      pass2: "",
      isPwd: true,
    };
  },
  methods: {
    changePass() {
      let user = auth.currentUser;
      if (this.pass1 != "" && this.pass1 == this.pass2) {
        this.$q
          .dialog({
            title: "Cambiar contraseña",
            message: "¿Realmente deseas cambiar la contraseña?",
            cancel: true,
            persistent: true,
          })
          .onOk(() => {
            user
              .updatePassword(this.pass1)
              .then(() => {
                this.$q
                  .dialog({
                    title: "Alerta",
                    message: "Contraseña cambiada correctamente",
                  })
                  .onOk(() => {
                    // console.log('OK')
                  })
                  .onCancel(() => {
                    // console.log('Cancel')
                  })
                  .onDismiss(() => {
                    // console.log('I am triggered on both OK and Cancel')
                  });
              })
              .catch((err) => {
                console.log(err);
                this.$q
                  .dialog({
                    title: "Alerta",
                    message: "Para cambiar la contraseña debe haber un inicio de sesión reciente, por favor cierre sesión, reingrese e intente nuevamente",
                  })
                  .onOk(() => {
                    // console.log('OK')
                  })
                  .onCancel(() => {
                    // console.log('Cancel')
                  })
                  .onDismiss(() => {
                    // console.log('I am triggered on both OK and Cancel')
                  });
              });
          })
          .onCancel(() => {
            // console.log('>>>> Cancel')
          })
          .onDismiss(() => {
            // console.log('I am triggered on both OK and Cancel')
          });
      } else {
        this.$q
          .dialog({
            title: "Alerta",
            message: "La contraseña y la confirmación no coinciden",
          })
          .onOk(() => {
            // console.log('OK')
          })
          .onCancel(() => {
            // console.log('Cancel')
          })
          .onDismiss(() => {
            // console.log('I am triggered on both OK and Cancel')
          });
      }
    },
  },
};
</script>

<style>
</style>