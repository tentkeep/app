<template>
  <div class="gallery" @scroll="onScroll">
    <router-link to="/" class="uppercase primary font-3">
      <div class="close-button">
        <i class="fas fa-chevron-left" />
      </div>
    </router-link>

    <div class="banner-wrapper">
      <div class="banner-image p1 bg-hi shadow-primary2" :style="bannerImageStyles">
        <gallery-image :galleryId="gallery.id" size="60vw" maxSize="300px" class="shadow-primary2" />
      </div>
    </div>

    <div class="relative z1 p2-bottom">
      <div class="gallery-titlebar">
        <div class="flex-row p1">
          <div class="button-space"></div>
          <p class="flex-one text-center primary bold font2">{{ gallery.title }}</p>

          <div class="button-space flex-bottom">
            <button v-if="!isSearching" class="button-icon" @click="startSearch"><i class="fas fa-search" /></button>
          </div>
        </div>
        <transition name="fade-in">
          <div v-if="isSearching" class="search flex-row">
            <input name="query" class="search-input" type="text" v-model="query" placeholder="search" />
            <button class="search-close" @click="clearSearch"><i class="fas fa-times" /></button>
          </div>
        </transition>
      </div>

      <div v-if="!hasItems" class="flex-column align-center">
        <p class="text-center p2 rounded primary">
          There is no content
          <br />in this gallery.
        </p>
      </div>

      <div v-for="item in items" :key="item.created_at" class="gallery-item">
        <etsy v-if="item.item_type === 'etsy'" :item="item" :filter="query" />
        <music v-if="item.item_type === 'music'" :item="item" :filter="query" />
        <podcast v-if="item.item_type === 'podcast'" :item="item" :filter="query" />
        <wordpress v-if="item.item_type === 'wordpress'" :item="item" :filter="query" />
        <you-tube v-if="item.item_type === 'youtube'" :item="item" :filter="query" />
        <!-- <component :is="componentForItem(item)" :galleryItem="item" /> -->
      </div>

      <!-- curator / owner section -->
      <div v-if="canAddContent" class="flex-column align-center m2 p2-top border-top-primary">
        <button class="button" @click="addingContent = true">Add content</button>
      </div>
    </div>

    <modal v-model="addingContent">
      <gallery-item-add :gallery="gallery" @done="galleryItemAddDone" />
    </modal>
  </div>
</template>

<script>
import GalleryImage from '@/components/GalleryImage'
import Modal from '@/components/Modal'
import GalleryItemAdd from '@/views/GalleryItemAdd'
import Etsy from '@/components/gallery-items/Etsy'
import Music from '@/components/gallery-items/Music'
import Podcast from '@/components/gallery-items/Podcast'
import Wordpress from '@/components/gallery-items/Wordpress'
import YouTube from '@/components/gallery-items/YouTube'
import { mapActions } from 'vuex'
import api from '@/js/api'

export default {
  name: 'Gallery',
  props: ['gallery'],
  data () {
    return {
      items: [],
      query: null,
      userRole: null,
      isSearching: false,
      scrollRatio: 0,
      addingContent: false
    }
  },
  components: { GalleryImage, Modal, GalleryItemAdd, Etsy, Music, Podcast, Wordpress, YouTube },
  computed: {
    hasItems () {
      return this.items && this.items.length > 0
    },
    bannerImageStyles () {
      return {
        transform: `scale(${1 + this.scrollRatio})`,
        opacity: 1 - this.scrollRatio
        // filter: `blur(${10 * this.scrollRatio}px)`
      }
    },
    isOwner () {
      return this.userRole === 'owner'
    },
    canAddContent () {
      return ['curator', 'owner'].includes(this.userRole)
    }
  },
  methods: {
    ...mapActions(['getGalleryUserRole']),
    getItems () {
      api.getGalleryItems(this.gallery.id).then((items) => {
        this.items = items
      })
    },
    componentForItem (item) {
      console.log('ITEM', item.item_type)
      switch (item.item_type) {
        case 'podcast':
          return () => import('@/components/gallery-items/Podcast')
        default:
          throw new Error('should be exhaustive')
      }
    },
    startSearch () {
      this.isSearching = true
      this.$nextTick(() => {
        this.$el.querySelector('input[name=query]').focus()
      })
    },
    clearSearch () {
      this.query = null
      this.$el.querySelector('input[name=query]').focus()
    },
    onScroll (event) {
      const image = this.$el.querySelector('.banner-image')
      const scrollTop = event.target.scrollTop
      const ratio = scrollTop / image.offsetHeight
      this.scrollRatio = ratio
    },
    galleryItemAddDone (item) {
      this.addingContent = false
      if (item) {
        this.getItems()
      }
    }
  },
  mounted () {
    this.getGalleryUserRole(this.gallery.id).then((userRole) => {
      if (userRole.is_owner) {
        this.userRole = 'owner'
      } else if (userRole.is_member) {
        this.userRole = 'member'
      }
    })
    this.getItems()
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/app";

.gallery {
  overflow-x: hidden;
  .close-button {
    @extend .absolute;
    @extend .z2;
    @extend .border-primary3;
    @extend .shadow-primary3;
    @extend .flex-column;
    @extend .align-center;
    @extend .flex-center;
    @extend .bg-muted3;
    @extend .opacity80;
    top: 16px;
    left: 16px;
    width: 33px;
    height: 33px;
    border-radius: 50%;
  }
  .banner-wrapper {
    @extend .flex-column;
    @extend .align-center;
    @extend .relative;
    @extend .m2-top;
    @extend .m4-bottom;
  }
  .gallery-titlebar {
    @extend .bg-hi;
    @extend .m2-bottom;
    @extend .shadow-primary3;
    .button-space {
      @extend .flex-row;
      width: 60px;
    }
  }
  .image-backing {
    @extend .absolute;
    @extend .shadow-primary2;
    // transform: rotateZ(45deg);
    top: -10px;
    margin-left: -10px;
    width: 170px;
    height: 170px;
    background: white;
  }
  .gallery-item {
    // @extend .bg-hi;
  --hi80: rgb(var(--base-colorR), var(--base-colorG), var(--base-colorB), 0.8);
    background-color: var(--hi80);
    // @extend .border-primary3;
    @extend .shadow-primary3;
    @extend .p1;
    @extend .rounded;
    @extend .m1;
    @extend .noscroll;
  }
}
.search {
  @extend .p2-left;
  @extend .p2-right;
  @extend .p1-bottom;
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
