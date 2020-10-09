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
        <gallery-titlebar :title="Gallery.title" v-model="query" />

        <div v-if="!isLoadingGalleryEntries && !hasEntries" class="flex-column align-center">
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
          <hr class="h-fill opacity30">
          <button class="button bg-warning" @click="confirmDeletion"><i class="fas fa-trash-alt" /> Delete</button>
        </div>
      </div>

      <modal v-model="addingContent">
        <gallery-entry-add :gallery="Gallery" @done="galleryEntryAddDone" />
      </modal>

      <modal v-model="showDeleteConfirmation">
        <div class="bg-hi p3 rounded">
          <h2 class="bold text-center warning">Caution!</h2>
          <p class="text-center line180">
            Are you sure you want to delete <br> the <span class="bold primary">{{ Gallery.title }}</span> gallery <br> and all of it's content?
          </p>
          <div class="flex-row flex-center m4-top">
            <button class="button bg-warning m2-right" @click="deleteGalleryConfirmed">Delete</button>
            <button class="button" @click="showDeleteConfirmation = false">Cancel</button>
          </div>
        </div>
      </modal>
    </div>
  </div>
</template>

<script>
import GalleryImage from '@/components/GalleryImage'
import GalleryTitlebar from '@/components/galleries/GalleryTitlebar'
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
      scrollRatio: 0,
      addingContent: false,
      showDeleteConfirmation: false
    }
  },
  components: { GalleryImage, GalleryTitlebar, Modal, GalleryEntryAdd },
  computed: {
    hasEntries () {
      return this.entries && this.entries.length > 0
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
    ...mapActions(['getGalleryUserRole', 'deleteGallery']),
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
    confirmDeletion () {
      this.showDeleteConfirmation = true
    },
    deleteGalleryConfirmed () {
      this.deleteGallery(this.Gallery.id)
        .then(_ => {
          this.$router.replace({ name: 'Home' })
        })
        .catch(e => { this.alert(e.message) })
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
</style>
