<template>
  <transition name="fade-in">
    <div v-if="value" class="modal">
      <div class="modal-back" @click="dismiss"></div>
      <div class="modal-wrapper">
        <div class="modal-container">
          <slot />
        </div>
        <div class="z1 m2-bottom">
          <button class="h-fill border-primary3 bg-primary3 p1 hi uppercase" @click="dismiss">Close</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Modal',
  props: ['value'],
  methods: {
    dismiss () {
      this.$emit('input', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.modal {
  @extend .cover;
  @extend .fixed;
  @extend .z4;
  @extend .shadow-inset;
  .modal-back {
    @extend .cover;
    @extend .absolute;
    @extend .v-fill;
    background: var(--bg-gradient-primary);
    @extend .opacity90;
  }
  .modal-wrapper {
    @extend .v-fill;
    @extend .flex-column;
    @extend .flex-center;
    @extend .p2-h;
    @extend .z1;
    @extend .center;
    max-width: 600px;
    .modal-container {
      @extend .bg-hi;
      @extend .h-fill;
      @extend .z1;
      @extend .shadow-primary;
      @extend .border-primary;
      @extend .m2-top;
      @extend .m2-bottom;
      max-height: 80%;
      overflow: hidden;
    }
  }
  .shadow-primary-long {
    box-shadow: 0 0 25px var(--primary);
  }
  .shadow-primary2-long {
    box-shadow: 0 0 25px var(--primary);
  }
}
</style>
