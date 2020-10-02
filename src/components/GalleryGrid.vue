<template>
  <div class="gallery-grid">
    <div v-for="gallery in galleries"
    :key="gallery.id"
    class="item"
    @click="goToGallery(gallery)">
      <gallery-image :galleryId="gallery.id" size="100%" class="gallery-image" />
      <div class="description">
        <p class="">{{gallery.title}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import GalleryImage from '@/components/GalleryImage'

export default {
  name: 'GalleryGrid',
  props: ['galleries'],
  components: { GalleryImage },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
@import "../assets/app";

.gallery-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 8px;
  max-width: 600px;
  .item {
    @extend .shadow-primary2;
    @extend .bg-hi;
    @extend .rounded;
    @extend .flex-column;
    .gallery-image {
      border-radius: 3px;
      @extend .shadow-primary3;
    }
    .description {
      @extend .flex-one;
      @extend .flex-column;
      @extend .align-center;
      @extend .flex-center;
      @extend .text-center;
      @extend .font-2;
      padding: 2px;
    }
  }
}
</style>
