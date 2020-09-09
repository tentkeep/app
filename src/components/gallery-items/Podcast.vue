<template>
  <div>
    <div class="flex-row align-center m1-bottom">
      <div>
        <img :src="podcast.image" class="podcast-image" />
      </div>
      <h3 class="primary m1-left">{{ podcast.title }}</h3>
    </div>

    <div v-for="episode in podcast.items" :key="episode.pubDate" class="episode-row" @click="play(episode)">
      <div><i class="far fa-play-circle primary2"></i></div>
      <p class="p1-left font-1">{{ episode.title }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Podcast',
  props: ['item'],
  computed: {
    podcast () {
      return this.item.details
    }
  },
  methods: {
    play (episode) {
      new Audio(episode.link.url).play()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/app";

.podcast-image {
  @extend .square;
  @extend .border-muted2;
  width: 60px;
}
.episode-row {
  @extend .flex-row;
  @extend .align-center;
  @extend .border-bottom-muted3;
  padding-top: 4px;
  padding-bottom: 4px;
  &:last-child {
    border-bottom: none;
  }
}
</style>
