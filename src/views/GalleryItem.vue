<template>
  <div>
    <component :is="galleryItemComponent" :item="item" />
  </div>
</template>

<script>
export default {
  name: 'ItemDetail',
  props: ['item'],
  computed: {
    galleryItemComponent () {
      switch (this.item.item_type) {
        case 'podcast':
          return () => import('@/components/gallery-items/podcast/PodcastFull.vue')
        case 'youtube':
          return () => import('@/components/gallery-items/youtube/YouTubeFull.vue')
        default: return '<template><div>unknown</div></template>'
      }
    }
  }
}
</script>
