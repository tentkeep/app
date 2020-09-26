<template>
  <div id="app" class="v-fill flex-column">
    <router-view class="flex-one scrolly"/>
    <audio-player />
  </div>
</template>

<script>
import AudioPlayer from '@/components/AudioPlayer'

export default {
  name: 'App',
  components: { AudioPlayer }
}
</script>

<style>
@import "assets/variables.css";
</style>

<style  lang="scss">
@import "./assets/app";
@import "../node_modules/@fortawesome/fontawesome-free/css/all.css";
</style>
