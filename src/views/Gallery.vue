<template>
  <div class="gallery">
    <div class="bg-hi shadow-primary3">
      <div class="p1">
        <router-link to="/" class="uppercase muted2 font-3"><i class="fas fa-chevron-left" /> Home</router-link>
      </div>
      <div class="flex-row align-center border-top-primary3">
        <gallery-image :galleryId="gallery.id" size="50px" class="border-right-primary3" />
        <p class="p1-h">{{ gallery.title }}</p>
      </div>
    </div>

    <div class="flex-column align-center relative m2-top">
      <div class="m4-bottom">
        <div class="image-backing"></div>
        <gallery-image :galleryId="gallery.id" size="150px" class="shadow-primary2" />
      </div>
    </div>
    <div>
      <p class="text-center">
        <span class="bg-hi p1 shadow-primary2">{{ gallery.title }}</span>
      </p>
    </div>
  </div>
</template>

<script>
import GalleryImage from '@/components/GalleryImage'

export default {
  name: 'Gallery',
  props: ['gallery'],
  components: { GalleryImage }
}
</script>

<style lang="scss" scoped>
@import "../assets/app";

.gallery {
  .image-backing {
    @extend .absolute;
    @extend .shadow-primary2;
    // transform: rotateZ(45deg);
    top: -10px;
    margin-left: -10px;
    width: 170px;
    height: 170px;
    background: white;
  }
}
</style>
