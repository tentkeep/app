<template>
  <div class="v-fill flex-column">
    <entry-titlebar @search="search" />

    <div class="flex-row m1-bottom">
      <div>
        <img :src="entry.image" class="video-image" />
      </div>
      <div class="flex-one m1-left p1-right p1-top">
        <h3 class="primary">{{ entry.title }}</h3>
        <p class="font-2" :class="{ lines2: !showMoreDescription }">{{ entry.description }}</p>
        <a class="pull-right primary2 font-2" @click="toggleMoreDescription">{{ showMoreDescription ? 'less' : 'more' }}</a>
      </div>
    </div>

    <p class="muted-color p1-left m1-bottom uppercase font-2">Videos ({{items.length}})</p>
    <div class="flex-one p1-left p1-right p2-bottom scrolly">
      <you-tube-row v-for="item in items" :key="item.id" :item="item" :identifier="identifier" />
    </div>
  </div>
</template>

<script>
import EntryTitlebar from '@/components/gallery-entries/EntryTitlebar'
import galleryEntryMixin from '@/components/gallery-entries/gallery-entry-mixin'
import YouTubeRow from '@/components/gallery-entries/youtube/YouTubeRow'

export default {
  name: 'YouTubeFull',
  props: ['entry'],
  components: { EntryTitlebar, YouTubeRow },
  mixins: [galleryEntryMixin],
  data () {
    return {
      filter: null,
      showMoreDescription: false
    }
  },
  computed: {
    items () {
      if (this.filter) {
        const l = s => s.toLowerCase()
        const filter = l(this.filter)
        return this.entry.items
          .filter(i => l(i.title).includes(filter))
          .slice(0, 1000)
      }
      return this.entry.items
        .slice(0, 1000)
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
.video-image {
  @extend .square;
  @extend .border-muted2;
  width: 80px;
}
</style>
