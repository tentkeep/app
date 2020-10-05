<template>
  <div class="create-gallery">
    <loading v-if="loading" class="cover fixed z3" />

    <div class="flex-one flex-column">
      <div class="flex-row h-fill">
        <div class="flex-one"></div>
        <router-link to="/mine" class="p2 primary2 font-1">cancel</router-link>
      </div>

      <div class="flex-one"></div>
      <div class="flex-row">
        <div class="flex-one"></div>
        <div class="image-add" :class="{opacity0: !galleryTitle}" @click="pickImage">
          <div class="cover absolute flex-column p1 hi text-center">
            <div class="flex-one"></div>
            <div>
              <p v-if="!galleryImage">Tap to choose a Gallery image</p>
              <div v-if="galleryImage" class="cover absolute z0 border-primary">
                <img :src="galleryImage" class="h-fill v-fill" />
              </div>
            </div>
            <div v-if="!galleryImage" class="flex-one flex-column font-3 z1">
              <div class="flex-one"></div>
              <p v-if="!galleryImageError" class="muted3">square image<br>at least 600 x 600</p>
              <p v-if="galleryImageError" class="bg-hi secondary rounded">{{galleryImageError}}</p>
            </div>
          </div>
          <input id="image-input" type="file" accept="image/*" @change="galleryImageSelected" name="gallery-image" style="display: none;" />
        </div>
        <div class="flex-one"></div>
      </div>
      <div class="flex-one"></div>
    </div>

    <div class="name">
      <div class="flex-row">
        <label for="galleryTitle" class="gallery-name-label">Gallery name</label>
        <div class="flex-one"></div>
      </div>
      <input v-model="galleryTitle" type="text" name="galleryTitle" accept="image/*" class="input m3-bottom" />
      <div class="flex-row">
        <div class="flex-one"></div>
        <button class="button" :disabled="!galleryTitle || !galleryImage" @click="createGallery">Next</button>
      </div>
    </div>

    <div class="flex-one"></div>
  </div>
</template>

<script>
import Loading from '@/components/Loading'
import { mapActions } from 'vuex'

const validImageSize = image => {
  return image.width >= 600 && image.height >= 600
}

export default {
  name: 'CreateGallery',
  data () {
    return {
      loading: false,
      galleryTitle: null,
      galleryImageFile: null,
      galleryImage: null,
      galleryImageWidth: null,
      galleryImageHeight: null,
      galleryImageError: null
    }
  },
  components: { Loading },
  methods: {
    ...mapActions(['saveGallery']),
    createGallery () {
      this.loading = true
      this.saveGallery({ title: this.galleryTitle, image: this.galleryImageFile })
        .then(gallery => {
          this.loading = false
          this.$router.push({ name: 'gallery', params: { gallery } })
        })
        .catch(e => {
          this.loading = false
          console.error(e)
          this.alert(e.message)
        })
    },
    pickImage () {
      this.$el.querySelector('#image-input').click()
    },
    galleryImageSelected () {
      const file = this.$el.querySelector('#image-input').files[0]

      const twoMegs = 2 * 1000 * 1000
      if (file.size > twoMegs) {
        this.galleryImageError = 'This file is too large. Choose an image less than 2 MB.'
        return
      }

      const _URL = window.URL || window.webkitURL
      const img = new Image()
      img.src = _URL.createObjectURL(file)
      img.onload = event => {
        const image = event.target
        if (!validImageSize(image)) {
          this.galleryImageError = `This image is too small (${image.width} x ${image.height}). Choose an image at least 600 x 600.`
        } else if (image.width !== image.height) {
          this.galleryImageError = 'Please choose a square image'
        } else {
          this.galleryImageError = null
          this.galleryImageFile = file
          this.galleryImage = image.src
          this.galleryImageWidth = image.width
          this.galleryImageHeight = image.height
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/app";

.create-gallery {
  @extend .v-fill;
  @extend .flex-column;
  .name {
    @extend .flex-column;
    @extend .flex-center;
    margin: auto;
    width: 320px;
    max-width: 90%;
  }
  .gallery-name-label {
    @extend .muted-color;
    @extend .bg-hi;
    @extend .p1-h;
    margin-bottom: 1px;
    border-top-left-radius: 2px;
    border-top-right-radius: 2px;
  }
  .image-add {
    @extend .square;
    @extend .m3-bottom;
    @extend .bg-muted;
    @extend .shadow-inset;
    width: 300px;
    max-width: 28vh;
    max-height: 100%;
    transition: opacity .3s ease-in-out;
  }
}
</style>
