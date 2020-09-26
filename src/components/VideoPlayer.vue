<template>
<transition name="scale">
  <div v-if="nowPlaying" class="video-player-container">
    <div class="video-control-bar">
      <div class="flex-one"></div>
      <button @click="nowPlaying = null"><i class="fas fa-times font1"></i></button>
    </div>

    <div class="video-player">
      <div v-if="youtubeVideoId" class="flex-column align-center">
        <iframe
          class="youtube-frame"
          :src="`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&rel=0&playsinline=1`"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen>
        </iframe>
      </div>
    </div>
  </div>
</transition>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'VideoPlayer',
  data () {
    return {
      nowPlaying: null,
      youtubeVideoId: null,

      player: null,
      nowPlayingDuration: null,
      nowPlayingRemaining: null,
      progress: 0,
      progressTime: '0:00',
      isPlaying: false
    }
  },
  computed: {
    ...mapGetters(['currentVideo'])
  },
  watch: {
    currentVideo () {
      this.pause()
      this.beginPlaying(this.currentVideo)
    }
  },
  methods: {
    resume () {
      if (this.player) {
        this.player.play()
      }
    },
    pause () {
      // const { item, type } = this.nowPlaying

      // save progress
      // metrics for provider compensation
      if (this.player) {
        this.player.pause()
      }
    },
    beginPlaying (videoItem) {
      this.nowPlaying = videoItem
      const { item, type } = this.nowPlaying

      console.log(item)
      if (type === 'youtube') {
        this.playYoutube(item.videoId)
      }
    },
    playYoutube (videoId) {
      this.youtubeVideoId = videoId
    }
  }
}
</script>

<style lang="scss">
.scale-enter-active, .scale-leave-active { transition: transform .3s }
.scale-leave-active { transform: scale(0); }
.scale-enter, .scale-leave-to { transform: scale(0); }
</style>
<style lang="scss" scoped>
@import "../assets/app";

.video-player-container {
  @extend .z2;
}
.video-control-bar {
  @extend .flex-row;
  background-color: #111919;
  padding: 0 16px;
  button {
    padding: 8px;
    border: none;
    color: #cfcfcf;
    background: none;
  }
}
.video-player {
  @extend .shadow-primary2-top;
  background-color: black;
}
.youtube-frame {
  // width: 100%;
  height: 25vh;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}
</style>
