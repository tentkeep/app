<template>
  <div class="v-fill flex-column">
    <div class="titlebar">
      <button class="p2-h v-fill button-clear muted2" @click="$router.back()">
        <i class="fas fa-chevron-left"></i>
      </button>
      <div v-if="!isSearching" class="flex-one"></div>
      <transition name="fade-in">
        <div v-if="isSearching" class="search flex-one flex-row">
          <input name="query" class="search-input" type="text" v-model="filter" placeholder="search" />
          <button class="search-close" @click="clearSearch"><i class="fas fa-times" /></button>
        </div>
      </transition>
      <button class="p2-h v-fill button-clear muted2" @click="toggleSearching">
        <i class="fas fa-search"></i>
      </button>
    </div>

    <div class="flex-row m1-bottom">
      <div>
        <img :src="podcast.image" class="podcast-image" />
      </div>
      <div class="flex-one m1-left p1-right p1-top">
        <h3 class="primary">{{ podcast.title }}</h3>
        <p class="font-2" :class="{ lines2: !showMoreDescription }">{{ podcast.description }}</p>
        <a class="pull-right primary2 font-2" @click="toggleMoreDescription">{{ showMoreDescription ? 'less' : 'more' }}</a>
      </div>
    </div>

    <p class="muted-color p1-left m1-bottom uppercase font-2">Episodes</p>
    <div class="flex-one p1-left p1-right p2-bottom scrolly">
      <podcast-row v-for="episode in items" :key="episode.pubDate" :episode="episode" />
    </div>
  </div>
</template>

<script>
import PodcastRow from '@/components/gallery-items/podcast/PodcastRow'

export default {
  name: 'PodcastFull',
  props: ['item'],
  components: { PodcastRow },
  data () {
    return {
      filter: null,
      isSearching: false,
      showMoreDescription: false
    }
  },
  computed: {
    podcast () {
      return this.item.details
    },
    items () {
      if (this.filter) {
        const l = s => s.toLowerCase()
        const filter = l(this.filter)
        return this.podcast.items
          .filter(i => l(i.title).includes(filter) || l(i.description).includes(filter))
      }
      return this.podcast.items
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
    toggleMoreDescription () {
      this.showMoreDescription = !this.showMoreDescription
    },
    clearSearch () {
      this.query = null
      this.$el.querySelector('input[name=query]').focus()
    }
  }
}
</script>

<style lang="scss" scoped>
.podcast-image {
  @extend .square;
  @extend .border-muted2;
  width: 80px;
}
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
