<template>
  <div v-if="nowPlaying" class="bg-hi shadow-primary2-top z2">
    <div class="progress-bar" :style="{ width: `${progress}%`}"></div>
    <div class="flex-row align-center">
      <div class="flex-one noscroll p1">
        <p class="font-1 lines1">{{nowPlayingTitle}}</p>
      </div>
      <p class="time-label">{{nowPlayingRemaining}}</p>
      <div v-if="isPlaying" class="font5 p1 muted-color" @click="pause">
        <i class="far fa-pause-circle" />
      </div>
      <div v-if="!isPlaying" class="font5 p1 muted-color" @click="resume">
        <i class="far fa-play-circle" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import musickit from '@/js/musickit'

const formatTime = seconds => new Date(1000 * seconds)
  .toISOString()
  .substr(11, 8)
  .replace(/(00:0|00:)/, '')

export default {
  name: 'AudioPlayer',
  data () {
    return {
      player: null,
      nowPlaying: null,
      nowPlayingDuration: null,
      nowPlayingRemainingDuration: null,
      nowPlayingRemaining: null,
      currentTime: null,
      progress: 0,
      audio: null,
      isPlaying: false
    }
  },
  computed: {
    ...mapGetters(['currentAudio']),
    nowPlayingTitle () {
      return this.nowPlaying ? this.nowPlaying.item.title : ''
    }
  },
  watch: {
    currentAudio () {
      this.pause()
      this.beginPlaying(this.currentAudio)
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
      if (this.nowPlaying) {
        const { item, type, identifier } = this.nowPlaying
        const { galleryId, galleryEntryId } = identifier
        this.saveUserItemActivity({
          galleryId,
          galleryEntryId,
          galleryEntryType: type,
          galleryEntryItemId: item.id,
          activity: { currentTime: this.currentTime, isComplete: this.nowPlayingRemainingDuration < 5 }
        })
      }

      if (this.player) {
        this.player.pause()
      }
    },
    beginPlaying (audioItem) {
      this.nowPlaying = null
      this.nowPlaying = audioItem
      const { item, type } = this.nowPlaying

      if (type === 'podcast') {
        this.playUrl(item.url)
      }
      if (type === 'music') {
        if (item.services.apple) {
          this.playMusickit(item)
        }
      }
    },
    updateProgress (currentTime, duration) {
      this.currentTime = currentTime
      const progress = currentTime / duration
      this.progress = Math.round(progress * 1000) / 10
      this.nowPlayingRemaining = `-${formatTime(duration - currentTime)}`
      this.nowPlayingRemainingDuration = duration - currentTime
    },
    playUrl (url) {
      this.audio = new Audio(url)
      this.player = this.audio

      this.audio.addEventListener('durationchange', e => {
        this.nowPlayingDuration = formatTime(this.audio.duration)
      })
      this.audio.addEventListener('play', e => { this.isPlaying = true })
      this.audio.addEventListener('pause', e => { this.isPlaying = false })
      this.audio.addEventListener('timeupdate', e => {
        this.updateProgress(this.audio.currentTime, this.audio.duration)
      })
      this.audio.play()
    },
    playMusickit (item) {
      this.player = musickit
      musickit.playNow(item)
      musickit.addEventListener('playbackDurationDidChange', event => (this.nowPlayingDuration = formatTime(event.duration)))
      musickit.addEventListener('playbackTimeDidChange', event => {
        this.updateProgress(event.currentPlaybackTime, event.currentPlaybackDuration)
      })
      musickit.addEventListener('playbackStateDidChange', e => {
        this.isPlaying = e.state === 2
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/app";

.progress-bar {
  @extend .bg-primary2;
  height: 5px;
}
.time-label {
  @extend .font-3;
  @extend .muted2;
  @extend .text-right;
  padding-top: 4px;
}
</style>
