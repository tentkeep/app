<template>
  <div class="gallery-titlebar">
    <div class="flex-row p1">
      <div class="button-space"></div>
      <p class="flex-one text-center primary bold font2">{{ title }}</p>

      <div class="button-space flex-bottom">
        <button v-if="!isSearching" class="button-icon" @click="startSearch"><i class="fas fa-search" /></button>
      </div>
    </div>
    <transition name="fade-in">
      <div v-if="isSearching" class="search flex-row">
        <input name="query" class="search-input" type="text" v-model="query" placeholder="search" autocomplete="off" />
        <button class="search-close" @click="clearSearch"><i class="fas fa-times" /></button>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'GalleryTitlebar',
  props: ['title'],
  data () {
    return {
      isSearching: false,
      query: null
    }
  },
  watch: {
    query () {
      this.$emit('input', this.query)
    }
  },
  methods: {
    startSearch () {
      this.isSearching = true
      this.$nextTick(() => {
        this.$el.querySelector('input[name=query]').focus()
      })
    },
    clearSearch () {
      this.query = null
      this.$el.querySelector('input[name=query]').focus()
    }
  }
}
</script>

<style lang="scss" scoped>
.gallery-titlebar {
  @extend .bg-hi;
  @extend .m2-bottom;
  @extend .shadow-primary3;
  .button-space {
    @extend .flex-row;
    width: 60px;
  }
}
.search {
  @extend .p2-left;
  @extend .p2-right;
  @extend .p1-bottom;
  .search-input {
    @extend .input;
    @extend .z1;
    padding-top: 10px;
    padding-bottom: 10px;
    border-radius: 20px;
  }
  .search-close {
    @extend .bg-muted3;
    @extend .hi;
    @extend .border-muted;
    outline: none;
    text-shadow: 0 0 5px var(--muted);
    padding-left: 50px;
    padding-right: 10px;
    margin-left: -40px;
    border-top-right-radius: 50px;
    border-bottom-right-radius: 50px;
  }
}
</style>
