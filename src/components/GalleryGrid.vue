<template>
  <div class="gallery-grid">
    <div v-for="gallery in galleries"
    :key="gallery.id"
    class="item"
    @click="goToGallery(gallery)">
      <gallery-image :galleryId="gallery.id" size="29vw" maxSize="250px" :tinyImage="gallery.tiny_image" class="gallery-image" />
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
  data () {
    return {
      galleriesPerRow: 3,
      currentScrollOffset: 0,
      rowWidth: 200
    }
  },
  components: { GalleryImage },
  watch: {
    galleries () {
      this.$nextTick(() => {
        this.rowWidth = this.$el.querySelectorAll('.item')[1].offsetLeft
      })
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.gallery-grid {
  @extend .flex-row;
  @extend .scrollx;
  @extend .p1-top;
  @extend .p1-bottom;
  .item {
    @extend .shadow-primary2;
    @extend .bg-hi;
    @extend .rounded;
    @extend .flex-column;
    @extend .m1-right;
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
