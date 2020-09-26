<template>
  <div v-show="!hide">
    <div class="flex-row align-center m1-bottom">
      <div>
        <img :src="podcast.image" class="podcast-image" />
      </div>
      <h3 class="primary m1-left">{{ podcast.title }}</h3>
    </div>

    <div v-for="episode in items" :key="episode.pubDate" class="item-row" @click="play(episode)">
      <div class="m1-right"><i class="far fa-play-circle primary3 opacity60"></i></div>
      <div class="flex-one p1-right lines1">
        <p class="lines1">{{ episode.title }}</p>
        <p class="muted2 font-2">{{ date(episode) }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Podcast',
  props: ['item', 'filter'],
  computed: {
    podcast () {
      return this.item.details
    },
    items () {
      if (this.filter) {
        const l = s => s.toLowerCase()
        const filter = l(this.filter)
        return this.podcast.items
          .filter(i => l(i.title).includes(filter) || l(i.description).includes(filter))
          .slice(0, 3)
      }
      return this.podcast.items.slice(0, 3)
    },
    hide () {
      return this.filter && this.items.length === 0
    }
  },
  methods: {
    date (episode) {
      return new Date(episode.pubDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric', day: 'numeric' })
    },
    play (episode) {
      this.playAudio(episode, 'podcast')
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
