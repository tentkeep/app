<template>
  <div v-show="!hide">
    <div class="flex-row align-center m1-bottom" @click="showGalleryEntryDetail(entry)">
      <div>
        <img :src="entry.image" class="shop-image" />
      </div>
      <div class="flex-one m1-left">
        <h3 class="primary">{{ entry.title }}</h3>
        <p class="muted2 font-2">Etsy</p>
      </div>
      <div class="p1 muted3"><i class="fas fa-chevron-right"></i></div>
    </div>

    <div class="flex-row flex-wrap flex-center">
      <div v-for="listing in items" :key="listing.id" class="listing" @click="openWebPage(listing.url)">
        <div class="flex-column align-center"><img class="listing-img" :src="listing.image" /></div>
        <!-- <div class="listing-image h-fill" :style="{ 'background-image': `url(${listing.image})`}"></div> -->
        <p class="listing-title">{{ htmlDecode(listing.title) }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EtsyMedium',
  props: ['entry', 'filter'],
  computed: {
    items () {
      if (this.filter) {
        const l = s => s.toLowerCase()
        const filter = l(this.filter)
        return this.entry.items
          .filter(i => l(i.title).includes(filter) || l(i.description).includes(filter))
          .slice(0, 4)
      }
      return this.entry.items.slice(0, 4)
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
    }
  }
}
</script>

<style lang="scss" scoped>
.shop-image {
  @extend .border-muted2;
  height: 60px;
}
.listing {
  @extend .bg-hi;
  @extend .m2-bottom;
  @extend .shadow-primary3;
  border-radius: 4px;
  max-width: 45%;
  margin: 0 4px 8px 4px;
  padding: 4px;
}
.listing-img {
  @extend .shadow-primary3;
  margin-bottom: 4px;
  height: 120px;
}
.listing-image {
  @extend .square;
  @extend .shadow-primary3;
  border-radius: 2px;
  background-size: cover;
  background-position: center;
}
.listing-title {
  @extend .primary;
  @extend .p1-left;
  @extend .font-1;
  @extend .text-center;
  @extend .lines2;
}
</style>
