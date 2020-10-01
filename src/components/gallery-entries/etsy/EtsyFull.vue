<template>
  <div v-show="!hide">
    <entry-titlebar @search="search" />

    <div class="flex-row align-center m1-bottom">
      <div>
        <img :src="entry.image" class="shop-image" />
      </div>
      <div class="m1-left">
        <h3 class="primary">{{ entry.title }}</h3>
        <p class="muted2 font-2">Etsy</p>
      </div>
    </div>

    <div class="flex-row flex-wrap flex-center">
      <div v-for="listing in items" :key="listing.id" class="listing" @click="goTo(listing)">
        <div class="image-wrap"><div class="flex-column align-center shadow-primary3 rounded noscroll">
          <img class="listing-img" :src="listing.image" />
        </div></div>
        <!-- <div class="listing-image h-fill" :style="{ 'background-image': `url(${listing.image})`}"></div> -->
        <p class="listing-title">{{ htmlDecode(listing.title) }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import EntryTitlebar from '@/components/gallery-entries/EntryTitlebar'
import galleryEntryMixin from '@/components/gallery-entries/gallery-entry-mixin'

export default {
  name: 'EtsyMedium',
  data () {
    return {
      filter: null
    }
  },
  props: ['entry'],
  components: { EntryTitlebar },
  mixins: [galleryEntryMixin],
  computed: {
    items () {
      if (this.filter) {
        const l = s => s.toLowerCase()
        const filter = l(this.filter)
        return this.entry.items
          .filter(i => l(i.title).includes(filter) || l(i.description).includes(filter))
      }
      return this.entry.items
    },
    hide () {
      return this.filter && this.items.length === 0
    }
  },
  methods: {
    search (query) {
      this.filter = query
    },
    htmlDecode (text) {
      const div = document.createElement('div')
      div.innerHTML = text
      return div.textContent
    },
    goTo (listing) {
      window.open(listing.url)
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
  height: 120px;
}
.image-wrap {
  @extend .p1;
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
