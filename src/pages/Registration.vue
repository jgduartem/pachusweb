<template>
  <q-dialog v-model="registro" persistent @hide="hide()">
    <q-card>
      <q-bar>
        <q-space />
        <q-btn dense flat icon="close" color="grey-3" v-close-popup>
          <q-tooltip>Cerrar</q-tooltip>
        </q-btn>
      </q-bar>
      <q-card-section>
        <q-stepper v-model="step" ref="stepper" color="primary" animated>
          <q-step
            :name="1"
            title="Introduce tu Email y Contraseña"
            icon="settings"
            :done="step > 1"
          >
            <q-input
              class="q-ma-sm"
              type="text"
              v-model="email"
              label="Email"
            />
            <q-input
              class="q-ma-sm"
              :type="isPwd ? 'password' : 'text'"
              label="Contraseña"
              v-model="pass"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
            <q-input
              class="q-ma-sm"
              :type="isPwd2 ? 'password' : 'text'"
              label="Contraseña"
              v-model="passConfirm"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd2 ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd2 = !isPwd2"
                />
              </template>
            </q-input>
            <q-stepper-navigation class="row col-12 justify-end">
              <q-btn
                class="q-ma-sm"
                label="Continuar"
                @click="register(email, pass)"
                :disable="email == '' || pass == '' || passConfirm == ''"
              />
            </q-stepper-navigation>
          </q-step>

          <q-step
            :disable="newUser == false"
            :name="2"
            title="Introduce tu nombre y numero telefonico"
            icon="create_new_folder"
            :done="step > 2"
          >
            <q-input
              class="q-ma-sm"
              type="text"
              label="Nombre"
              v-model="name"
              required
            />
            <q-input
              class="q-ma-sm"
              type="phone"
              label="Telefono"
              v-model="phone"
              required
            />
            <q-stepper-navigation class="row col-12 justify-end">
              <q-btn
                class="q-ma-sm"
                label="Continuar"
                @click="updateUser()"
                :disable="name == ''"
              />
            </q-stepper-navigation>
          </q-step>

          <q-step :name="3" title="Finalizado" icon="assignment">
            Completado.
            <q-stepper-navigation class="row col-12 justify-end">
              <q-btn
                class="q-ma-sm"
                label="Finalizar"
                @click="registro = false"
              />
            </q-stepper-navigation>
          </q-step>
        </q-stepper>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { auth, db } from "src/firebase/firebaseConfig";
import router from 'src/router';
const userRef = db.ref("users");
export default {
  name: "Registration",
  data() {
    return {
      registro: true,
      step: 1,
      email: "",
      pass: "",
      phone: "",
      isPwd: true,
      isPwd2: true,
      passConfirm: "",
      name: "",
      newUser: false,
    };
  },
  methods: {
    hide(){
      this.step = 1;
      this.$router.push('/');
    },
    register(mail, password) {
      if (this.pass == this.passConfirm) {
        auth
          .createUserWithEmailAndPassword(mail, password)
          .then(() => {
            console.log("creado");
            this.step += 1;
            this.newUser = true;
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        console.log("no coincide");
      }
    },
    async updateUser() {
      let user = auth.currentUser;
      user
        .updateProfile({
          displayName: this.name,
        })
        .then(() => {
          this.step += 1;
          console.log(user);
          console.log("correcto");
        })
        .catch((error) => {
          console.log(error);
        });
        await userRef.child(user.uid).update({
          name: this.name,
          phone: this.phone,
          email: this.email,
          shopingCart: []
        })

    },
  },
};
</script>

<style>
</style>