<template>
  <div class="recent-items">
    <!-- VIDEO -->
    <p class="primary uppercase bold font-1 m1-bottom">Watch</p>
    <div class="recently-added h-fill scrollx">
      <div class="recently-added-flow">
        <div v-for="item in items.video" :key="item.id" class="recently-added-item-wrapper" @click="activate(item)">
          <div class="video">
            <div class="item-image h-fill" :style="{ 'background-image': `url(${item.image || item.gallery_entry_image})` }" />
            <div class="p1 noscroll">
              <p class="item-info">{{ item.gallery_entry_title }}</p>
              <p class="item-title">{{ htmlDecode(item.title) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- PODCAST -->
    <p class="primary uppercase bold font-1 m1-top m1-bottom">Podcasts</p>
    <div class="recently-added h-fill scrollx">
      <div class="recently-added-flow">
        <div v-for="item in items.podcast" :key="item.id" class="recently-added-item-wrapper" @click="activate(item)">
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

    <!-- MUSIC -->
    <p class="primary uppercase bold font-1 m1-top m1-bottom">Music</p>
    <div class="recently-added h-fill scrollx">
      <div class="recently-added-flow">
        <div v-for="item in items.music" :key="item.id" class="recently-added-item-wrapper" @click="activate(item)">
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

    <!-- SHOP -->
    <p class="primary uppercase bold font-1 m1-top m1-bottom">Shop</p>
    <div class="recently-added h-fill scrollx">
      <div class="recently-added-flow">
        <div v-for="item in items.shop" :key="item.id" class="recently-added-item-wrapper" @click="activate(item)">
          <div class="shop">
            <p class="item-info">{{ item.gallery_entry_title }}</p>
            <div class="item-image" :style="{ 'background-image': `url(${item.image || item.gallery_entry_image})` }" />
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
      items: {}
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
      .then(items => {
        items.forEach(item => {
          if (!this.items[item.generic_type]) {
            this.items[item.generic_type] = [item]
          } else {
            this.items[item.generic_type].push(item)
          }
        })
        this.items = { ...this.items }
      })
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
.video {
  @extend .bg-hi;
  @extend .shadow-primary2;
  width: 148px;
  .item-image {
    background-size: cover;
    background-position: center;
    width: 148px;
    height: 111px;
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
.shop {
  @extend .bg-hi;
  @extend .shadow-primary2;
  width: 110px;
  border-radius: 2px;
  .item-image {
    background-size: cover;
    background-position: center;
    width: 110px;
    height: 110px;
    min-width: 30px;
  }
  .item-info {
    @extend .uppercase;
    @extend .muted2;
    @extend .font-5;
    @extend .lines1;
    @extend .noscroll;
    @extend .text-center;
    padding: 4px;
  }
  .item-title {
    @extend .font-1;
    @extend .lines2;
    padding: 4px;
  }
}
</style>
