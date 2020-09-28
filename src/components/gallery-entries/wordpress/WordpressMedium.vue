<template>
  <div v-show="!hide">
    <div class="flex-row align-center m1-bottom" @click="showGalleryEntryDetail(item)">
      <div class="flex-one m1-left">
        <h3 class="primary"><span class="muted2 uppercase font-2 border-right-muted3 p1-right m1-right">Posts</span>{{ site.title }}</h3>
      </div>
      <div class="p1 muted3"><i class="fas fa-chevron-right"></i></div>
    </div>

    <div v-for="post in items" :key="post.date" class="item-row" @click="show(post)">
      <div class="v-fill m1-right"><img :src="post.image" class="v-fill"></div>
      <div v-if="!post.image" class="m1-right"><i class="fab fa-readme primary3 opacity60"></i></div>
      <div class="flex-one p1-right lines1">
        <p class="lines1">{{ htmlDecode(post.title) }}</p>
        <p class="muted2 font-2">{{ date(post) }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Wordpress',
  props: ['entry', 'filter'],
  computed: {
    site () {
      return this.entry.details
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
    date (post) {
      return new Date(post.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric', day: 'numeric' })
    },
    show (post) {
      window.open(post.url)
    }
  }
}
</script>

<style lang="scss" scoped>
.site-image {
  @extend .border-muted2;
  height: 60px;
}
</style>
