<template>
  <div class="home v-fill flex-column">
    <div class="flex-one scrolly">
      <div id="titlebar" class="p2 p0-bottom flex-row align-center m2-bottom">
        <h1 class="flex-one primary">Home</h1>
        <p v-if="isSignedIn" @click="$router.push('/mine')"><i class="far fa-user"></i></p>
        <button v-if="!isSignedIn" @click="$router.push({ name: 'SignIn' })" class="button-alt">Sign in</button>
      </div>

      <div v-if="recentGalleries.length" class="continue p2">
        <h3 class="m1-bottom">Jump back in</h3>
        <div class="home-continue-grid">
          <div v-for="item in recentGalleries" :key="item.id" class="item">
            <div class="home-continue-image" :style="{'background-image': `url(${item.image})`}" />
            <div class="label">
              {{item.title}}
            </div>
          </div>
        </div>
      </div>

      <div class="explore m2-top p1">
        <h3 class="m1-bottom">Explore</h3>
        <gallery-grid :galleries="exploreGalleries" />
      </div>
    </div>

    <div class="filter-menu">
      <div v-for="f in filters"
        :key="f"
        :class="{ active: f === filter }"
        @click="setFilter(f)">
        <i :class="`fas fa-${f}`"></i>
      </div>
    </div>
  </div>
</template>

<script>
import GalleryGrid from '@/components/GalleryGrid'
import { mapGetters } from 'vuex'
import api from '@/js/api'

export default {
  name: 'Home',
  data () {
    return {
      recentGalleries: [],
      exploreGalleries: [],
      filters: ['music', 'video', 'podcast', 'book', 'shopping-cart', 'palette'],
      filter: null
    }
  },
  computed: {
    ...mapGetters(['isSignedIn'])
  },
  components: { GalleryGrid },
  methods: {
    galleryImageUrl (galleryId) {
      return api.getGalleryImageUrl(galleryId)
    },
    setFilter (filter) {
      this.filter = this.filter === filter ? null : filter
    }
  },
  mounted () {
    api.getGalleries()
      .then(galleries => { this.exploreGalleries = galleries })
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
    transition: background, color .3s;
    &.active {
      @extend .hi;
      @extend .bg-muted2;
    }
    &:not(:last-child) {
      @extend .border-right-muted2;
    }
  }
}
</style>
