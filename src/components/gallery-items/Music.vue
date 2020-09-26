<template>
  <div v-show="!hide">
    <div class="p1-bottom m2-bottom">
      <h2 class="primary bold"><i class="fas fa-rss music-icon" /> {{ artist.title }}</h2>
      <div class="p1-top m3-h border-bottom-muted3"></div>
    </div>
    <div v-for="album in items" :key="album.id" class="album-row">
      <div class="flex-row m1-bottom">
        <div>
          <img :src="album.image" class="album-image" />
        </div>
        <div class="flex-one p1-left">
          <p class="primary bold">{{ album.title }}</p>
          <p class="muted-color font-3">{{ albumType(album) }} • {{ albumRelease(album) }}</p>
          <p class="p1-top m2-right m1-left opacity50 border-bottom-muted3"></p>
        </div>
      </div>
      <div class="track-region">
        <div v-for="track in album.tracks" :key="track.id" class="item-row" @click="playAudio(track, 'music')">
          <div class="m1-right"><i class="far fa-play-circle primary3 opacity60"></i></div>
          <p>{{ track.title }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Music',
  props: ['item', 'filter'],
  computed: {
    artist () {
      return this.item.details
    },
    items () {
      if (this.filter) {
        const l = s => s.toLowerCase()
        const filter = l(this.filter)
        return this.artist.albums
          .filter(i => l(i.title).includes(filter))
          .slice(0, 3)
      }
      return this.artist.albums.slice(0, 3)
    },
    hide () {
      return this.filter && this.items.length === 0
    }
  },
  methods: {
    albumType (album) {
      return album.isSingle ? 'Single' : 'Album'
    },
    albumRelease (album) {
      return new Date(album.releaseDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/app";

.soft-gradient {
  background: radial-gradient(circle at top, var(--hi), var(--muted3), transparent),
  radial-gradient(ellipse at bottom, var(--hi), var(--hi), var(--muted3), transparent);
}
.music-icon {
  @extend .muted2;
  transform: rotateZ(45deg) scale(0.7);
  margin-right: -5px;
}
.artist-image {
  @extend .square;
  @extend .border-muted2;
  width: 50px;
}
.album-row {
  padding-top: 4px;
  padding-bottom: 4px;
  margin-bottom: 16px;
  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
  }
  .album-image {
    @extend .square;
    @extend .border-muted2;
    width: 40px;
  }
}
.track-region {
  @extend .scrolly;
  max-height: 195px;
}
</style>
