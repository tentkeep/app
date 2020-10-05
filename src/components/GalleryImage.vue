<template>
  <div
    class="gallery-image"
    :style="{ 'background-image': `url(${imageUrl})`, width: size || '80px', 'max-width': maxSize }" />
</template>

<script>
import api from '@/js/api'

export default {
  name: 'GalleryImage',
  props: ['galleryId', 'tinyImage', 'size', 'maxSize'],
  data () {
    return {
      fullImageUrl: null
    }
  },
  computed: {
    imageUrl () {
      return this.fullImageUrl || this.tinyImage
    }
  },
  async mounted () {
    var image = new Image()
    image.onload = () => {
      this.fullImageUrl = image.src
    }
    image.src = await api.getGalleryImageUrl(this.galleryId)
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/app";

.gallery-image {
  @extend .square;
  background-position: center;
  background-size: cover;
}
</style>
