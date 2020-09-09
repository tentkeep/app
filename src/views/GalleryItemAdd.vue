<template>
  <div class="gallery-item-add v-fill flex-column">
    <p class="p2">Add content to {{ gallery.title }}</p>
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
    addItemComponent () {
      switch (this.addItemType) {
        case 'saving':
          return () => import('@/views/gallery-item-add/Saving')
        case 'podcast':
          return () => import('@/views/gallery-item-add/Podcast')
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
