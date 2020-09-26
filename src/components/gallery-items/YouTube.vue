<template>
  <div v-show="!hide">
    <div class="flex-row align-center m1-bottom">
      <div>
        <img :src="channel.thumbnail.url" class="video-image" />
      </div>
      <div class="m1-left">
        <h3 class="primary">{{ channel.title }}</h3>
        <p class="muted2 font-2">YouTube</p>
      </div>
    </div>

    <div v-for="video in items" :key="video.id" class="item-row flush-left" @click="play(video)">
      <div class="v-fill"><img :src="video.thumbnail" class="v-fill"></div>
      <p class="video-title">{{ video.title }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'YouTube',
  props: ['item', 'filter'],
  computed: {
    channel () {
      return this.item.details
    },
    items () {
      if (this.filter) {
        const l = s => s.toLowerCase()
        const filter = l(this.filter)
        return this.channel.uploads.items
          .filter(i => l(i.title).includes(filter) || l(i.description).includes(filter))
          .slice(0, 3)
      }
      return this.channel.uploads.items.slice(0, 3)
    },
    hide () {
      return this.filter && this.items.length === 0
    }
  },
  methods: {
    play (video) {
      this.playVideo(video, 'youtube')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/app";

.video-image {
  @extend .border-muted2;
  height: 60px;
}
.video-title {
  @extend .p1-left;
  @extend .lines2;
}
</style>
