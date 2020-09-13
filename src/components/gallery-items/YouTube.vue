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

    <div v-for="video in items" :key="video.id" class="video-row" @click="play(video)">
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
      console.log('Play', video)
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
.video-row {
  $row-height: 45px;
  @extend .flex-row;
  @extend .align-center;
  @extend .border-bottom-muted3;
  position: relative;
  height: $row-height;
  padding-top: 4px;
  padding-bottom: 4px;
  overflow: hidden;
  &:last-child {
    border-bottom: none;
  }
  &::after {
    content: 'hello';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 5px;
    background: linear-gradient(0deg, var(--hi), transparent);
  }
  .video-title {
    @extend .p1-left;
    @extend .font-1;
  }
}
</style>
