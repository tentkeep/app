<template>
  <div class="home v-fill flex-column">
    <div class="flex-one scrolly">
      <div id="titlebar" class="p2 p0-bottom flex-row align-center m1-bottom">
        <h2 class="flex-one primary">Explore</h2>
        <p v-if="isSignedIn" @click="$router.push('/mine')"><i class="far fa-user"></i></p>
        <button v-if="!isSignedIn" @click="$router.push({ name: 'SignIn' })" class="button-alt">Sign in</button>
      </div>

      <div class="explore p1">
        <gallery-grid :galleries="exploreGalleries" />
      </div>

      <div class="p1-left p1-top">
        <h3 class="primary m1-bottom">Trending</h3>
      </div>
      <div class="flex-row flex-wrap flex-center p1 p0-top">
        <p v-for="word in ['COVID', 'love', 'masks', 'theology', 'justice', 'racism', 'hate', 'gospel', 'fear', 'anxiety']"
        :key="word"
        class="bg-secondary hi p1 rounded m1-right m1-bottom shadow-primary2"
        @click="alert('Not implemented. This should trigger a search of content using the word: ' + word)">
          {{word}}
        </p>
      </div>

      <div class="recently-added m1-top p1">
        <h3 class="primary m1-bottom">New</h3>
        <recently-added />
      </div>
    </div>

    <!-- <div class="filter-menu">
      <div v-for="f in filters"
        :key="f"
        :class="{ active: f === filter }"
        @click="setFilter(f)">
        <i :class="`fas fa-${f}`"></i>
      </div>
    </div> -->
  </div>
</template>

<script>
import GalleryGrid from '@/components/GalleryGrid'
import RecentlyAdded from '@/components/RecentlyAdded'
import { mapGetters } from 'vuex'
import api from '@/js/api'

export default {
  name: 'Home',
  data () {
    return {
      lastFetch: null,
      exploreGalleries: [],
      filters: ['music', 'video', 'podcast', 'book', 'shopping-cart', 'palette'],
      filter: null
    }
  },
  computed: {
    ...mapGetters(['isSignedIn'])
  },
  components: { GalleryGrid, RecentlyAdded },
  methods: {
    async fetchGalleries () {
      const threshold = 15 * 60 * 1000
      if (!this.lastFetch || new Date().getTime() - this.lastFetch.getTime() > threshold) {
        this.exploreGalleries = await api.getGalleries()
        this.lastFetch = new Date()
      }
    },
    galleryImageUrl (galleryId) {
      return api.getGalleryImageUrl(galleryId)
    },
    setFilter (filter) {
      this.filter = this.filter === filter ? null : filter
    }
  },
  mounted () {
    this.fetchGalleries()
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/app";

.continue {
  .home-continue-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 4px;
    & > * {
      height: 50px;
    }
    .item {
      @extend .flex-row;
      @extend .align-center;
      @extend .bg-hi;
      @extend .border-primary;
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
    }
    .home-continue-image {
      height: 50px;
      width: 50px;
      background-position: center;
      background-size: cover;
    }
    .label {
      @extend .flex-one;
      @extend .font-3;
      padding: 5px;;
    }
  }
}

.filter-menu {
  @extend .flex-row;
  @extend .z1;
  box-shadow: 1px -2px 5px var(--primary3);
  div {
    @extend .flex-one;
    @extend .text-center;
    @extend .font5;
    @extend .primary2;
    @extend .p2-top;
    @extend .p2-bottom;
    transition: background, color, transform .2s;
    &.active {
      @extend .hi;
      @extend .bg-muted2;
      i {
        transform: scale(1.4);
      }
    }
    &:not(:last-child) {
      @extend .border-right-muted2;
    }
  }
}
</style>
