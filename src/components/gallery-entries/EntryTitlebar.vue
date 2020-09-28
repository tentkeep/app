<template>
  <div class="titlebar">
    <button class="p2-h v-fill button-clear muted2" @click="$router.back()">
      <i class="fas fa-chevron-left"></i>
    </button>
    <p v-if="!isSearching" class="flex-one"></p>
    <transition name="fade-in">
      <div v-if="isSearching" class="search flex-one flex-row">
        <input name="query" class="search-input" type="text" v-model="query" @input="emitSearch" placeholder="search" />
        <button class="search-close" @click="clearSearch"><i class="fas fa-times" /></button>
      </div>
    </transition>
    <button class="p2-h v-fill button-clear muted2" @click="toggleSearching">
      <i class="fas fa-search"></i>
    </button>
  </div>
</template>

<script>
export default {
  name: 'EntryTitlebar',
  data () {
    return {
      isSearching: false,
      query: null
    }
  },
  methods: {
    toggleSearching () {
      this.isSearching = !this.isSearching
      if (this.isSearching) {
        this.$nextTick(() => {
          this.$el.querySelector('input[name=query]').focus()
        })
      }
    },
    clearSearch () {
      this.query = null
      this.$el.querySelector('input[name=query]').focus()
    },
    emitSearch () {
      this.$emit('search', this.query)
    }
  }
}
</script>

<style lang="scss" scoped>
.search {
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
