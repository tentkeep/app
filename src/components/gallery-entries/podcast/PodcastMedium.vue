<template>
  <div v-show="!hide">
    <div class="flex-row align-center m1-bottom" @click="showGalleryEntryDetail(entry)">
      <div>
        <img :src="entry.image" class="podcast-image" />
      </div>
      <h3 class="flex-one primary m1-left">{{ entry.title }}</h3>
      <div class="p1 muted3"><i class="fas fa-chevron-right"></i></div>
    </div>

    <podcast-row v-for="episode in items" :key="episode.id" :item="episode" :identifier="identifier" />
  </div>
</template>

<script>
import PodcastRow from '@/components/gallery-entries/podcast/PodcastRow'
import galleryEntryMixin from '@/components/gallery-entries/gallery-entry-mixin'

export default {
  name: 'PodcastMedium',
  props: ['entry', 'filter'],
  components: { PodcastRow },
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
.podcast-image {
  @extend .square;
  @extend .border-muted2;
  width: 60px;
}
</style>
