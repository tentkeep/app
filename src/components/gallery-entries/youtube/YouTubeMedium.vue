<template>
  <div v-show="!hide">
    <div class="flex-row align-center m1-bottom" @click="showGalleryEntryDetail(entry)">
      <div>
        <img :src="entry.image" class="video-image" />
      </div>
      <div class="flex-one m1-left">
        <h3 class="primary">{{ entry.title }}</h3>
        <p class="muted2 font-2">YouTube</p>
      </div>
      <div class="p1 muted3"><i class="fas fa-chevron-right"></i></div>
    </div>

    <you-tube-row v-for="video in items" :key="video.id" :item="video" :identifier="identifier" />
  </div>
</template>

<script>
import YouTubeRow from '@/components/gallery-entries/youtube/YouTubeRow'
import galleryEntryMixin from '@/components/gallery-entries/gallery-entry-mixin'

export default {
  name: 'YouTube',
  props: ['entry', 'filter'],
  components: { YouTubeRow },
  mixins: [galleryEntryMixin],
  computed: {
    items () {
      if (this.filter) {
        const l = s => s.toLowerCase()
        const filter = l(this.filter)
        return this.entry.items
          .filter(i => l(i.title).includes(filter) || l(i.description).includes(filter))
          .slice(0, 3)
      }
      return this.entry.items.slice(0, 3)
    },
    hide () {
      return this.filter && this.items.length === 0
    }
  }
}
</script>

<style lang="scss" scoped>
.video-image {
  @extend .border-muted2;
  height: 60px;
}
</style>
