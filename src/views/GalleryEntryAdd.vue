<template>
  <div class="gallery-entry-add v-fill flex-column">
    <div class="p2">
      <p v-if="!addEntryType">Add content to <span class="primary">{{ gallery.title }}</span></p>
      <p v-else><a @click="addEntryType = null" class="muted2 p2-right"><i class="fas fa-chevron-left" /></a> {{ contentTypeHeader }} : <span class="primary">{{ gallery.title }}</span></p>
    </div>
    <hr style="margin: 0 8px 0 8px;">

    <component :is="addEntryComponent" v-model="addEntryType" class="flex-one scrolly" @submit="saveEntry" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'GalleryEntryAdd',
  props: ['gallery'],
  data () {
    return {
      addEntryType: null
    }
  },
  computed: {
    contentTypeHeader () {
      switch (this.addEntryType) {
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
    addEntryComponent () {
      switch (this.addEntryType) {
        case 'saving':
          return () => import('@/views/gallery-entry-add/Saving')
        case 'etsy':
          return () => import('@/views/gallery-entry-add/Etsy')
        case 'music':
          return () => import('@/views/gallery-entry-add/Music')
        case 'podcast':
          return () => import('@/views/gallery-entry-add/Podcast')
        case 'wordpress':
          return () => import('@/views/gallery-entry-add/Wordpress')
        case 'youtube':
          return () => import('@/views/gallery-entry-add/YouTube')
        default:
          return () => import('@/views/gallery-entry-add/ContentOptions')
      }
    }
  },
  methods: {
    ...mapActions(['saveGalleryEntry']),
    saveEntry (entry) {
      this.addEntryType = 'saving'
      this.saveGalleryEntry({
        galleryId: this.gallery.id,
        ...entry
      })
        .then(savedEntry => {
          this.addEntryType = null
          this.$emit('done', savedEntry)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
