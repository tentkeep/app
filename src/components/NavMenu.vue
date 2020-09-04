<template>
  <div class="nav-menu tab-bar">
    <div v-for="tab in tabs" :key="tab" class="tab" :class="{ active: tab === activeTab }" @click="tabSelected(tab)">{{ tab }}</div>
  </div>
</template>

<script>
export default {
  name: 'NavMenu',
  data () {
    return {
      activeTab: 'Explore'
    }
  },
  computed: {
    tabs () {
      return ['home', 'Categories', 'Mine']
    }
  },
  methods: {
    tabSelected (tab) {
      this.activeTab = tab
      this.$router.push(`/${tab.toLowerCase()}`)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/app";
.nav-menu {
  &.tab-bar {
    @extend .flex-row;
    // @extend .shadow;
    .tab {
      @extend .flex-one;
      @extend .p2;
      @extend .text-center;
      @extend .font-2;
      @extend .uppercase;
      @extend .pointer;
      @extend .primary3;
      &.active {
        text-decoration: underline;
        @extend .secondary3;
      }
      &:not(:last-child) {
        @extend .border-right-primary;
      }
    }
  }
}
</style>
