<template>
  <div class="gallery">
    <div class="close-button">
      <router-link to="/" class="uppercase primary font-3"><i class="fas fa-times" /></router-link>
    </div>

    <div class="flex-column align-center relative m2-top m4-bottom">
      <div class="p1 bg-hi shadow-primary2">
        <gallery-image :galleryId="gallery.id" size="60vw" maxSize="300px" class="shadow-primary2" />
      </div>
    </div>

    <div class="bg-hi p1 m2-bottom">
      <p class="text-center primary bold font2">{{ gallery.title }}</p>
    </div>

    <div v-if="!hasItems" class="flex-column align-center">
      <p class="text-center p2 rounded primary">There is no content<br>in this gallery.</p>
    </div>

    <div v-if="hasItems" class="p2-h">
      <input class="search-input" type="text" v-model="query" placeholder="search">
    </div>

    <div v-for="item in items" :key="item.created_at" class="gallery-item">
      <etsy v-if="item.item_type === 'etsy'" :item="item" :filter="query" />
      <podcast v-if="item.item_type === 'podcast'" :item="item" :filter="query" />
      <you-tube v-if="item.item_type === 'youtube'" :item="item" :filter="query" />
      <!-- <component :is="componentForItem(item)" :galleryItem="item" /> -->
    </div>

    <!-- curator / owner section -->
    <div v-if="canAddContent" class="flex-column align-center m2 p2-top border-top-primary">
      <button class="button" @click="addingContent = true">Add content</button>
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
import Podcast from '@/components/gallery-items/Podcast'
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
      addingContent: false
    }
  },
  components: { GalleryImage, Modal, GalleryItemAdd, Etsy, Podcast, YouTube },
  computed: {
    hasItems () {
      return this.items && this.items.length > 0
    },
    canAddContent () {
      return ['curator', 'owner'].includes(this.userRole)
    }
  },
  methods: {
    ...mapActions(['getGalleryUserRole']),
    getItems () {
      api.getGalleryItems(this.gallery.id)
        .then(items => { this.items = items })
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
    galleryItemAddDone (item) {
      this.addingContent = false
      if (item) {
        this.getItems()
      }
    }
  },
  mounted () {
    this.getGalleryUserRole(this.gallery.id)
      .then(userRole => {
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
  .close-button {
    @extend .absolute;
    @extend .z1;
    @extend .shadow-primary3;
    @extend .border-primary3;
    @extend .flex-column;
    @extend .align-center;
    @extend .flex-center;
    top: 16px;
    left: 16px;
    width: 33px;
    height: 33px;
    background: var(--muted3);
    border-radius: 50%;
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
    @extend .bg-hi;
    @extend .border-primary;
    @extend .p1;
    @extend .rounded;
    @extend .m1;
    @extend .noscroll;
  }
}
.search-input {
  @extend .input;
  @extend .m1-bottom;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 20px;
}
</style>
