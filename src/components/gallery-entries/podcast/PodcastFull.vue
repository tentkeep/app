<template>
  <div class="v-fill flex-column">
    <entry-titlebar @search="search" />

    <div class="flex-row m1-bottom">
      <div>
        <img :src="podcast.image" class="podcast-image" />
      </div>
      <div class="flex-one m1-left p1-right p1-top">
        <h3 class="primary">{{ podcast.title }}</h3>
        <p class="font-2" :class="{ lines2: !showMoreDescription }">{{ podcast.description }}</p>
        <a class="pull-right primary2 font-2" @click="toggleMoreDescription">{{ showMoreDescription ? 'less' : 'more' }}</a>
      </div>
    </div>

    <p class="muted-color p1-left m1-bottom uppercase font-2">Episodes</p>
    <div class="flex-one p1-left p1-right p2-bottom scrolly">
      <podcast-row v-for="item in items" :key="item.id" :item="item" :identifier="identifier" />
    </div>
  </div>
</template>

<script>
import EntryTitlebar from '@/components/gallery-entries/EntryTitlebar'
import galleryEntryMixin from '@/components/gallery-entries/gallery-entry-mixin'
import PodcastRow from '@/components/gallery-entries/podcast/PodcastRow'

export default {
  name: 'PodcastFull',
  props: ['entry'],
  components: { EntryTitlebar, PodcastRow },
  mixins: [galleryEntryMixin],
  data () {
    return {
      filter: null,
      showMoreDescription: false
    }
  },
  computed: {
    podcast () {
      return this.entry.details
    },
    items () {
      if (this.filter) {
        const l = s => s.toLowerCase()
        const filter = l(this.filter)
        return this.podcast.items
          .filter(i => l(i.title).includes(filter) || l(i.description).includes(filter))
      }
      return this.podcast.items
    }
  },
  methods: {
    search (query) {
      this.filter = query
    },
    toggleMoreDescription () {
      this.showMoreDescription = !this.showMoreDescription
    }
  }
}
</script>

<style lang="scss" scoped>
.podcast-image {
  @extend .square;
  @extend .border-muted2;
  width: 80px;
}
</style>
