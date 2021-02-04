<template>
  <div>
    <div class="q-pa-md">
      <q-card class="my-card row justify-center">
        <q-card-section>
          <div class="text-subtitle2">Hola {{this.$store.state.actualUser.name}},
            </br>
            </br>
            <div class="text-subtitle2">
              Desde el escritorio de tu cuenta puedes ver tus pedidos recientes, 
              gestionar tus direcciones de envío y facturación y editar tu contraseña y 
              los detalles de tu cuenta.
            </div>
          </div>
        </q-card-section>
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
    return {};
  },
  methods: {
  },
};
</script>

<style>
</style>