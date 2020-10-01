<template>
  <div class="connect-options">
    <h3 class="primary m1-bottom p1-bottom border-bottom-muted3">Upload <span class="muted2 font-4">coming soon!</span></h3>
    <div class="grid m2-bottom">
      <div class="flex-column align-center" @click="alert('This feature is coming soon!')">
        <div class="option-icon">
          <div class="cover absolute flex-column flex-center text-center"><div class="upload-music-icon" /></div>
        </div>
        <p class="font-2">Music</p>
      </div>

      <div class="flex-column align-center" @click="alert('This feature is coming soon!')">
        <div class="option-icon">
          <div class="cover absolute flex-column flex-center text-center"><div class="upload-video-icon" /></div>
        </div>
        <p class="font-2">Video</p>
      </div>

      <div class="flex-column align-center" @click="alert('This feature is coming soon!')">
        <div class="option-icon">
          <div class="cover absolute flex-column flex-center text-center"><div class="upload-images-icon" /></div>
        </div>
        <p class="font-2">Artwork</p>
      </div>
    </div>

    <h3 class="primary m1-bottom p1-bottom border-bottom-muted3">Connect</h3>
    <div class="grid">
      <div class="flex-column align-center" @click="$emit('input', 'podcast')">
        <div class="option-icon">
          <div class="cover absolute flex-column flex-center text-center"><div class="podcasts-icon" /></div>
        </div>
        <p class="font-2">Podcast</p>
      </div>

      <div class="flex-column align-center" @click="$emit('input', 'youtube')">
        <div class="option-icon">
          <div class="cover absolute flex-column flex-center text-center"><div class="youtube-icon" /></div>
        </div>
        <p class="font-2">YouTube</p>
      </div>

      <div class="flex-column align-center" @click="$emit('input', 'wordpress')">
        <div class="option-icon">
          <div class="cover absolute flex-column flex-center text-center"><div class="wordpress-icon" /></div>
        </div>
        <p class="font-2">Wordpress</p>
      </div>

      <div class="flex-column align-center" @click="$emit('input', 'etsy')">
        <div class="option-icon">
          <div class="cover absolute flex-column flex-center text-center"><div class="etsy-icon" /></div>
        </div>
        <p class="font-2">Etsy</p>
      </div>

      <div class="flex-column align-center" @click="$emit('input', 'music')">
        <div class="option-icon">
          <div class="cover absolute flex-column flex-center text-center"><div class="music-icon" /></div>
        </div>
        <p class="font-2">Music</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContentOptions',
  props: ['value']
}
</script>

<style lang="scss" scoped>
@import "../../assets/app";

.connect-options {
  @extend .flex-one;
  @extend .scrolly;
  @extend .p2;
}
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 16px 4px;
  .option-icon {
    @extend .square;
    @extend .rounded;
    // @extend .bg-primary;
    width: 60px;
  }
}
.icon {
  @extend .v-fill;
  background-size: cover;
  background-position: center;
}
.etsy-icon {
  @extend .icon;
  background-image: url('../../assets/icons/etsy-icon.png');
}
.music-icon {
  @extend .icon;
  background-image: url('../../assets/icons/music-icon.png');
}
.podcasts-icon {
  @extend .icon;
  background-image: url('../../assets/icons/podcasts-icon.jpeg');
}
.wordpress-icon {
  @extend .icon;
  background-image: url('../../assets/icons/wordpress-icon.png');
}
.youtube-icon {
  @extend .icon;
  background-image: url('../../assets/icons/youtube-icon.png');
}
.upload-music-icon {
  @extend .icon;
  background-image: url('../../assets/icons/upload-music-icon.png');
}
.upload-video-icon {
  @extend .icon;
  background-image: url('../../assets/icons/upload-video-icon.png');
}
.upload-images-icon {
  @extend .icon;
  background-image: url('../../assets/icons/upload-images-icon.png');
}
</style>
