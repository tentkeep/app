<template>
  <div>
    <entry-titlebar @search="search" />

    <div class="p1 m2-bottom">
      <div class="flex-row align-center">
        <h2 class="flex-one primary bold"><i class="fas fa-rss music-icon" /> {{ entry.title }}</h2>
      </div>
      <div class="p1-top m3-h border-bottom-muted3"></div>
    </div>

    <div v-for="album in items" :key="album.id" class="album-row p1">
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
        <div v-for="track in album.detail.tracks" :key="track.id" class="item-row" @click="playAudio(track, 'music', identifier)">
          <div class="m1-right"><i class="far fa-play-circle primary3 opacity60"></i></div>
          <p>{{ track.title }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EntryTitlebar from '@/components/gallery-entries/EntryTitlebar'
import galleryEntryMixin from '@/components/gallery-entries/gallery-entry-mixin'

export default {
  name: 'MusicFull',
  props: ['entry'],
  data () {
    return {
      filter: null
    }
  },
  mixins: [galleryEntryMixin],
  components: { EntryTitlebar },
  computed: {
    items () {
      if (this.filter) {
        const l = s => s.toLowerCase()
        const filter = l(this.filter)
        return this.entry.items
          .filter(i => l(i.title).includes(filter))
          .slice(0, 3)
      }
      return this.entry.items.slice(0, 3)
    },
    hide () {
      return this.filter && this.items.length === 0
    }
  },
  methods: {
    search (query) {
      this.filter = query
    },
    albumType (album) {
      return album.detail.isSingle ? 'Single' : 'Album'
    },
    albumRelease (album) {
      return new Date(album.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    }
  }
}
</script>

<style lang="scss" scoped>
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
</style>
