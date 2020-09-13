<template>
  <div class="connect-options">
    <div class="flex-column align-center" @click="$emit('input', 'podcast')">
      <div class="option-icon">
        <div class="cover absolute flex-column flex-center text-center"><p class="hi font3">P</p></div>
      </div>
      <p class="font-1">Podcast</p>
    </div>
    <div class="flex-column align-center" @click="$emit('input', 'youtube')">
      <div class="option-icon">
        <div class="cover absolute flex-column flex-center text-center"><p class="hi font3">YT</p></div>
      </div>
      <p class="font-1">YouTube</p>
    </div>
    <!-- <div class="flex-column align-center">
      <div class="option-icon">
      </div>
      <p class="font-1">Spotify</p>
    </div>
    <div class="flex-column align-center">
      <div class="option-icon">
      </div>
      <p class="font-1">Etsy</p>
    </div> -->
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
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 4px;
  .option-icon {
    @extend .square;
    @extend .rounded;
    @extend .bg-primary;
    // @extend .border-primary;
    width: 60px;
  }
}
</style>
