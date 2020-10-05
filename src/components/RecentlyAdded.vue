<template>
  <div class="recently-added h-fill scrollx">
    <div class="recently-added-flow">
      <div v-for="item in items" :key="item.id" class="recently-added-item-wrapper" @click="activate(item)">
        <div class="recently-added-item v-fill">
          <div class="item-image" :style="{ 'background-image': `url(${item.image || item.gallery_entry_image})` }" />
          <div class="flex-one p1 noscroll">
            <p class="item-info"><i :class="typeLabel(item)" /> {{ item.gallery_entry_title }}</p>
            <p class="item-title">{{ htmlDecode(item.title) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from '@/js/api'

export default {
  name: 'RecentlyAdded',
  data () {
    return {
      items: []
    }
  },
  methods: {
    typeLabel (item) {
      switch (item.entry_type) {
        case 'etsy': return ['fas', 'fa-shopping-cart']
        case 'music': return ['fas', 'fa-music']
        case 'podcast': return ['fas', 'fa-podcast']
        case 'wordpress': return ['fas', 'fa-book']
        case 'youtube': return ['fas', 'fa-video']
        default:
          throw new Error('should be exhaustive')
      }
    },
    activate (item) {
      switch (item.entry_type) {
        case 'etsy': return this.openWebPage(item.url)
        case 'music': return this.playAudio(item, item.entry_type, { galleryId: item.gallery_id, galleryEntryId: item.gallery_entry_id })
        case 'podcast': return this.playAudio(item, item.entry_type, { galleryId: item.gallery_id, galleryEntryId: item.gallery_entry_id })
        case 'wordpress': return this.openWebPage(item.url)
        case 'youtube': return this.playVideo(item, item.entry_type, { galleryId: item.gallery_id, galleryEntryId: item.gallery_entry_id })
        default:
          throw new Error('should be exhaustive')
      }
    }
  },
  mounted () {
    api.getRecentlyAddedGalleryEntryItems()
      .then(items => { this.items = items })
  }
}
</script>

<style lang="scss" scoped>
.recently-added-flow {
  @extend .flex-row;
  @extend .flex-wrap;
  width: 200%;
}
.recently-added-item-wrapper {
  width: 24%;
  max-width: 250px;
  @extend .m1-bottom;
}
.recently-added-item {
  @extend .flex-row;
  @extend .bg-hi;
  @extend .shadow-primary2;
  @extend .noscroll;
  @extend .m1-right;
  border-radius: 1px;
  .item-image {
    @extend .border-right-muted2;
    background-size: cover;
    background-position: center;
    width: 30px;
    min-width: 30px;
  }
  .item-info {
    @extend .uppercase;
    @extend .muted2;
    @extend .font-5;
    @extend .lines1;
    @extend .noscroll;
  }
  .item-title {
    @extend .font-1;
    @extend .lines2;
  }
}
</style>
