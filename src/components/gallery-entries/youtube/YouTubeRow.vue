<template>
  <div class="item-row flush-left" @click="play(item)">
    <div class="v-fill"><img :src="item.thumbnail" class="v-fill"></div>
    <p class="video-title">{{ item.title }}</p>
  </div>
</template>

<script>
export default {
  name: 'PodcastRow',
  props: ['item', 'identifier'],
  methods: {
    play (video) {
      this.playVideo(video, 'youtube', this.identifier)
    },
    date (item) {
      return new Date(item.pubDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric', day: 'numeric' })
    }
  }
}
</script>

<style lang="scss" scoped>
.video-title {
  @extend .p1-left;
  @extend .lines2;
}
</style>
