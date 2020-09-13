<template>
  <div class="mine">
    <div class="flex-row p2">
      <router-link to="/" class="font-2 muted-color uppercase"><i class="fas fa-chevron-left"></i></router-link>
    </div>
    <div class="p2">
      <div class="flex-row m2-bottom">
        <h3 class="p2-right m2-right border-right-muted2">My Galleries</h3>
        <button class="button-alt" @click="$router.push('/gallery/create')">Create a Gallery</button>
      </div>
      <gallery-grid :galleries="galleries" />
    </div>
  </div>
</template>

<script>
import GalleryGrid from '@/components/GalleryGrid'
import { mapActions } from 'vuex'

export default {
  name: 'Mine',
  data () {
    return {
      galleries: null
    }
  },
  components: { GalleryGrid },
  methods: {
    ...mapActions(['getGalleriesForUser'])
  },
  mounted () {
    this.getGalleriesForUser()
      .then(r => { this.galleries = r })
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/app";

</style>
