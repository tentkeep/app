<template>
  <div class="item-row flush-left youtube-row" @click="play">
    <div class="v-fill"><img :src="item.image" class="v-fill"></div>
    <div class="flex-one p1-left">
      <p class="lines2">{{ item.title }}</p>
      <p class="uppercase muted2 font-3">{{date}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PodcastRow',
  props: ['item', 'identifier'],
  computed: {
    date () {
      return new Date(this.item.date)
        .toLocaleDateString('en-US', { month: 'short', year: 'numeric', day: 'numeric' })
    }
  },
  methods: {
    play () {
      this.playVideo(this.item, 'youtube', this.identifier)
    }
  }
}
</script>

<style lang="scss" scoped>
.youtube-row {
  height: 66px !important;
}
.video-title {
  @extend .lines2;
}
</style>
