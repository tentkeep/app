<template>
  <div class="gallery-item-add v-fill flex-column">
    <div class="p2">
      <p v-if="!addItemType">Add content to <span class="primary">{{ gallery.title }}</span></p>
      <p v-else><a @click="addItemType = null" class="muted2 p2-right"><i class="fas fa-chevron-left" /></a> {{ contentTypeHeader }} : <span class="primary">{{ gallery.title }}</span></p>
    </div>
    <hr style="margin: 0 8px 0 8px;">

    <component :is="addItemComponent" v-model="addItemType" class="flex-one scrolly" @submit="saveItem" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'GalleryItemAdd',
  props: ['gallery'],
  data () {
    return {
      addItemType: null
    }
  },
  computed: {
    contentTypeHeader () {
      switch (this.addItemType) {
        case 'etsy':
          return 'Etsy'
        case 'music':
          return 'Music'
        case 'podcast':
          return 'Podcast'
        case 'wordpress':
          return 'Wordpress'
        case 'youtube':
          return 'YouTube'
        default:
          return ''
      }
    },
    addItemComponent () {
      switch (this.addItemType) {
        case 'saving':
          return () => import('@/views/gallery-item-add/Saving')
        case 'etsy':
          return () => import('@/views/gallery-item-add/Etsy')
        case 'music':
          return () => import('@/views/gallery-item-add/Music')
        case 'podcast':
          return () => import('@/views/gallery-item-add/Podcast')
        case 'wordpress':
          return () => import('@/views/gallery-item-add/Wordpress')
        case 'youtube':
          return () => import('@/views/gallery-item-add/YouTube')
        default:
          return () => import('@/views/gallery-item-add/ContentOptions')
      }
    }
  },
  methods: {
    ...mapActions(['saveGalleryItem']),
    saveItem (item) {
      this.addItemType = 'saving'
      this.saveGalleryItem({
        galleryId: this.gallery.id,
        ...item
      })
        .then(savedItem => {
          this.addItemType = null
          this.$emit('done', savedItem)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
