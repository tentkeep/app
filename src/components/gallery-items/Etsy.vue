<template>
  <div v-show="!hide">
    <div class="flex-row align-center m1-bottom">
      <div>
        <img :src="shop.shopImage" class="shop-image" />
      </div>
      <div class="m1-left">
        <h3 class="primary">{{ shop.title }}</h3>
        <p class="muted2 font-2">Etsy</p>
      </div>
    </div>

    <div v-for="listing in items" :key="listing.id" class="listing-row" @click="goTo(listing)">
      <div class="v-fill"><img :src="listing.images[0].url_170x135" class="v-fill"></div>
      <p class="listing-title">{{ htmlDecode(listing.title) }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'YouTube',
  props: ['item', 'filter'],
  computed: {
    shop () {
      return this.item.details
    },
    items () {
      if (this.filter) {
        const l = s => s.toLowerCase()
        const filter = l(this.filter)
        return this.shop.listings
          .filter(i => l(i.title).includes(filter) || l(i.description).includes(filter))
          .slice(0, 3)
      }
      return this.shop.listings.slice(0, 3)
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
    goTo (listing) {
      console.log('GoTo', listing)
      window.open(listing.url)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/app";

.shop-image {
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
