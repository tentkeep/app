<template>
  <div v-show="!hide">
    <div class="flex-row align-center m1-bottom">
      <div class="m1-left">
        <h3 class="primary">{{ site.title }}</h3>
      </div>
    </div>

    <div v-for="post in items" :key="post.date" class="listing-row" @click="show(post)">
      <div class="v-fill"><img :src="post.image" class="v-fill"></div>
      <p class="listing-title">{{ htmlDecode(post.title) }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'YouTube',
  props: ['item', 'filter'],
  computed: {
    site () {
      return this.item.details
    },
    items () {
      if (this.filter) {
        const l = s => s.toLowerCase()
        const filter = l(this.filter)
        return this.site.items
          .filter(i => l(i.title).includes(filter) || l(i.description).includes(filter) || l(i.categories).includes(filter) || l(i.author).includes(filter))
          .slice(0, 3)
      }
      return this.site.items.slice(0, 3)
    },
    hide () {
      return this.filter && this.items.length === 0
    }
  },
  methods: {
    htmlDecode (text) {
      const div = document.createElement('div')
      div.innerHTML = text
      return div.textContent
    },
    show (post) {
      window.open(post.url)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/app";

.site-image {
  @extend .border-muted2;
  height: 60px;
}
.listing-row {
  $row-height: 45px;
  @extend .flex-row;
  @extend .align-center;
  @extend .border-bottom-muted3;
  position: relative;
  height: $row-height;
  padding-top: 4px;
  padding-bottom: 4px;
  overflow: hidden;
  &:last-child {
    border-bottom: none;
  }
  &::after {
    content: 'hello';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 5px;
    background: linear-gradient(0deg, var(--hi), transparent);
  }
  .listing-title {
    @extend .p1-left;
    @extend .font-1;
  }
}
</style>
