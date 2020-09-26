<template>
  <div v-if="nowPlaying" class="bg-hi shadow-primary2-top z2">
    <div class="progress-bar" :style="{ width: `${progress}%`}"></div>
    <div class="flex-row align-center">
      <div class="flex-one noscroll p1">
        <p class="font-1 lines1">{{nowPlayingTitle}}</p>
        <p class="time-label">{{progressTime}} / {{nowPlayingDuration}}</p>
      </div>
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
import { mapGetters } from 'vuex'
import musickit from '@/js/musickit'

const formatTime = seconds => new Date(1000 * seconds)
  .toISOString()
  .substr(11, 8)
  .replace(/(00:00|00:0|00:)/, '')

export default {
  name: 'AudioPlayer',
  data () {
    return {
      nowPlaying: null,
      nowPlayingDuration: null,
      progress: 0,
      progressTime: '0:00',
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
    resume () {
      if (this.audio) {
        this.audio.play()
      }
    },
    pause () {
      // const { item, type } = this.nowPlaying

      // save progress
      // metrics for provider compensation
      if (this.audio) {
        this.audio.pause()
      }
    },
    beginPlaying (audioItem) {
      this.nowPlaying = null
      this.nowPlaying = audioItem
      const { item, type } = this.nowPlaying

      if (type === 'podcast') {
        this.playUrl(item.link.url)
      }
      if (type === 'music') {
        if (item.services.apple) {
          musickit.playNow(item)
            .then(_ => {
              musickit.addEventListener('playbackDurationDidChange', event => (this.nowPlayingDuration = formatTime(event.duration)))
              musickit.addEventListener('playbackTimeDidChange', event => (this.progressTime = formatTime(event.currentPlaybackTime)))
            })
        }
      }
    },
    playUrl (url) {
      this.audio = new Audio(url)

      this.audio.addEventListener('durationchange', e => {
        this.nowPlayingDuration = formatTime(this.audio.duration)
      })
      this.audio.addEventListener('play', e => { this.isPlaying = true })
      this.audio.addEventListener('pause', e => { this.isPlaying = false })
      this.audio.addEventListener('timeupdate', e => {
        const progress = this.audio.currentTime / this.audio.duration
        this.progress = Math.round(progress * 1000) / 10
        this.progressTime = formatTime(this.audio.currentTime)
      })
      this.audio.play()
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
