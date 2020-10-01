<template>
  <div>
    <component :is="galleryEntryComponent" :entry="entry" />
  </div>
</template>

<script>
export default {
  name: 'EntryDetail',
  props: ['entry'],
  computed: {
    galleryEntryComponent () {
      switch (this.entry.entry_type) {
        case 'etsy':
          return () => import('@/components/gallery-entries/etsy/EtsyFull.vue')
        case 'music':
          return () => import('@/components/gallery-entries/music/MusicFull.vue')
        case 'podcast':
          return () => import('@/components/gallery-entries/podcast/PodcastFull.vue')
        case 'youtube':
          return () => import('@/components/gallery-entries/youtube/YouTubeFull.vue')
        default: return '<template><div>unknown</div></template>'
      }
    }
  }
}
</script>
