<template>
  <div class="gallery" @scroll="onScroll">
    <router-link to="/" class="fixed z3 uppercase primary font-3">
      <div class="close-button">
        <i class="fas fa-chevron-left" />
      </div>
    </router-link>

    <div v-if="!isLoadingGallery">
      <div class="banner-wrapper">
        <div class="banner-image p1 bg-hi shadow-primary2" :style="bannerImageStyles">
          <gallery-image :galleryId="Gallery.id" size="60vw" maxSize="300px" class="shadow-primary2" />
        </div>
      </div>

      <div class="relative z1 p2-bottom">
        <div class="gallery-titlebar">
          <div class="flex-row p1">
            <div class="button-space"></div>
            <p class="flex-one text-center primary bold font2">{{ Gallery.title }}</p>

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

        <div v-if="!hasEntries" class="flex-column align-center">
          <p class="text-center p2 rounded primary">
            There is no content
            <br />in this gallery.
          </p>
        </div>

        <div v-for="entry in entries" :key="entry.created_at" class="gallery-entry">
          <component :is="componentForEntry(entry)" :entry="entry" :filter="query" />
        </div>

        <!-- curator / owner section -->
        <div v-if="canAddContent" class="flex-column align-center m2 p2-top border-top-primary">
          <button class="button" @click="addingContent = true">Add content</button>
        </div>
      </div>

      <modal v-model="addingContent">
        <gallery-entry-add :gallery="Gallery" @done="galleryEntryAddDone" />
      </modal>
    </div>
  </div>
</template>

<script>
import GalleryImage from '@/components/GalleryImage'
import Modal from '@/components/Modal'
import GalleryEntryAdd from '@/views/GalleryEntryAdd'
import EtsyMedium from '@/components/gallery-entries/etsy/EtsyMedium.vue'
import MusicMedium from '@/components/gallery-entries/music/MusicMedium.vue'
import PodcastMedium from '@/components/gallery-entries/podcast/PodcastMedium.vue'
import WordpressMedium from '@/components/gallery-entries/wordpress/WordpressMedium.vue'
import YouTubeMedium from '@/components/gallery-entries/youtube/YouTubeMedium.vue'

import { mapActions } from 'vuex'
import api from '@/js/api'

export default {
  name: 'Gallery',
  props: ['gallery'],
  data () {
    return {
      Gallery: null,
      isLoadingGallery: true,
      isLoadingGalleryEntries: true,
      entries: [],
      query: null,
      userRole: null,
      isSearching: false,
      scrollRatio: 0,
      addingContent: false
    }
  },
  components: { GalleryImage, Modal, GalleryEntryAdd },
  computed: {
    hasEntries () {
      return !this.isLoadingGalleryEntries && this.entries && this.entries.length > 0
    },
    bannerImageStyles () {
      return {
        transform: `scale(${1 + this.scrollRatio})`,
        opacity: 1 - this.scrollRatio
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
    getEntries () {
      api.getGalleryEntries(this.Gallery.id).then((entries) => {
        this.isLoadingGalleryEntries = false
        this.entries = entries
      })
    },
    componentForEntry (entry) {
      switch (entry.entry_type) {
        case 'etsy': return EtsyMedium
        case 'music': return MusicMedium
        case 'podcast': return PodcastMedium
        case 'wordpress': return WordpressMedium
        case 'youtube': return YouTubeMedium
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
    galleryEntryAddDone (entry) {
      this.addingContent = false
      if (entry) {
        this.getEntries()
      }
    },
    async ensureGalleryFetched () {
      if (typeof this.Gallery === 'string') {
        this.isLoadingGallery = true
        this.Gallery = await api.getGallery(this.Gallery)
      }
      this.isLoadingGallery = false
    }
  },
  async mounted () {
    this.Gallery = this.gallery // can't mutate props
    await this.ensureGalleryFetched()
    this.getEntries()
    this.getGalleryUserRole(this.Gallery.id).then((userRole) => {
      if (userRole.is_owner) {
        this.userRole = 'owner'
      } else if (userRole.is_member) {
        this.userRole = 'member'
      }
    })
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/app";

.gallery {
  @extend .relative;
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
  .gallery-entry {
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
