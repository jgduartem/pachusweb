<template>
  <div class="q-px-lg q-pb-md">
    <q-timeline :layout="layout" color="info">
      <q-timeline-entry heading>
        ¿Eres creativo?
        <br />
      </q-timeline-entry>

      <q-timeline-entry
        title="Diseña"
        subtitle="Deja volar tu imaginación"
        side="left"
        icon="lightbulb"
      >
        <div>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum
          <q-img src="disena.jpg" />
        </div>
      </q-timeline-entry>

      <q-timeline-entry
        title="Crea"
        subtitle="Dale vida con nuestro editor"
        side="right"
        icon="add"
      >
        <div>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum
          <q-img src="crea.jpg" />
        </div>
      </q-timeline-entry>

      <q-timeline-entry
        title="Recibe"
        subtitle="Busca tu creación por nuestra tienda o recibelo con delivery"
        side="left"
        icon="inventory_2"
      >
        <div>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum
          <q-img src="recibe.jpg" />
        </div>
      </q-timeline-entry>
    </q-timeline>
  </div>
</template>

<script>
export default {
  name: "Timeline",
  data() {
    return {};
  },
  computed: {
    layout() {
      return this.$q.screen.lt.sm
        ? "dense"
        : this.$q.screen.lt.md
        ? "comfortable"
        : "loose";
    },
  },
};
</script>

<style>
</style>