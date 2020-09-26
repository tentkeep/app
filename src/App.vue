<template>
  <div id="app" class="v-fill flex-column">
    <video-player />
    <router-view class="flex-one scrolly"/>
    <audio-player />
  </div>
</template>

<script>
import AudioPlayer from '@/components/AudioPlayer'
import VideoPlayer from '@/components/VideoPlayer'

export default {
  name: 'App',
  components: { AudioPlayer, VideoPlayer }
}
</script>

<style>
@import "assets/variables.css";
</style>

<style  lang="scss">
@import "./assets/app";
@import "../node_modules/@fortawesome/fontawesome-free/css/all.css";
</style>
