<template>
  <div>
    <Titulo />
    <router-view />
  </div>
</template>

<script>
import Titulo from "./components/layout/Titulo.vue";

export default {
  components: {
    Titulo
  },
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background: rgb(227, 226, 226);
}
</style>
