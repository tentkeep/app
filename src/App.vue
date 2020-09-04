<template>
  <div id="app" class="v-fill flex-column">
    <router-view class="flex-one scrolly"/>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {}
}
</script>

<style>
@import "assets/variables.css";
</style>

<style  lang="scss">
@import "./assets/app";
@import "../node_modules/@fortawesome/fontawesome-free/css/all.css";
</style>
