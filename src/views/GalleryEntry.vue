<template>
  <div>
    <component :is="galleryEntryComponent" :item="item" />
  </div>
</template>

<script>
export default {
  name: 'EntryDetail',
  props: ['item'],
  computed: {
    galleryEntryComponent () {
      switch (this.item.entry_type) {
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
