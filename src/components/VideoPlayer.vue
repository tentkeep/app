<template>
<transition name="scale">
  <div v-if="nowPlaying" class="video-player-container">
    <div class="video-control-bar">
      <div class="flex-one"></div>
      <button @click="nowPlaying = null"><i class="fas fa-times font1"></i></button>
    </div>

    <div class="video-player">
      <div v-if="youtubeVideoId" id="youtube-player" class="flex-column align-center">
        <!-- <iframe
          class="youtube-frame"
          :src="`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&rel=0&playsinline=1`"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen>
        </iframe> -->
      </div>
    </div>
  </div>
</transition>
</template>

<script>
import youtube from '@/js/youtube-player'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'VideoPlayer',
  data () {
    return {
      nowPlaying: null,
      youtubeVideoId: null,

      player: null,
      youtubePlayer: null,
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
    ...mapActions(['saveUserItemActivity']),
    resume () {
      if (this.player) {
        this.player.play()
      }
    },
    pause () {
      if (this.player) {
        this.player.pause()
      }
    },
    didPause () {
      // const { item, type } = this.nowPlaying

      // save progress
      console.log('pause time', this.youtubePlayer.getCurrentTime())
      if (this.youtubePlayer) {
        const { item, type, identifier } = this.nowPlaying
        const { galleryId, galleryEntryId } = identifier
        const currentTime = this.youtubePlayer.getCurrentTime()
        const timeRemaining = this.youtubePlayer.getDuration() - currentTime
        this.saveUserItemActivity({
          galleryId,
          galleryEntryId,
          galleryEntryType: type,
          galleryEntryItemId: item.id,
          activity: { currentTime, isComplete: timeRemaining < 10 }
        })
      }
    },
    beginPlaying (videoItem) {
      this.nowPlaying = videoItem
      const { item, type } = this.nowPlaying

      if (type === 'youtube') {
        this.playYoutube(item.detail.videoId)
      }
    },
    async playYoutube (videoId) {
      this.youtubeVideoId = videoId
      if (!this.youtubePlayer) {
        this.youtubePlayer = await youtube.getYouTubePlayer('youtube-player', videoId, { onPause: this.didPause })
      } else {
        const startTime = 0
        this.youtubePlayer.loadVideoById(videoId, startTime, 'large')
      }
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
