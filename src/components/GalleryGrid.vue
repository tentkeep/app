<template>
  <div class="gallery-grid">
    <div v-for="gallery in galleries"
    :key="gallery.id"
    class="item"
    @click="goToGallery(gallery)">
      <gallery-image :galleryId="gallery.id" size="100%" class="shadow-primary2 rounded" />
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
  gap: 4px;
  .item {
    @extend .shadow-primary2;
    @extend .bg-hi;
    @extend .rounded;
    padding: 5px;
    margin-bottom: 5px;
    .description {
      @extend .flex-one;
      @extend .font-2;
      @extend .text-center;
      padding: 2px;
    }
  }
}
</style>
