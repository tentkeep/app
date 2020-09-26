<template>
  <div class="p2">
    <form @submit.prevent="saveItem" class="v-fill flex-column">
      <label for="artistName" class="primary font-2">*Artist name:</label>
      <input
        name="artistName"
        type="text"
        v-model="artistName"
        class="input m1-top"
        placeholder="artist name"
        @input="search" />

      <transition name="fade-in">
      <div v-if="searchResults" class="scrolly border-primary shadow-primary3 m1-h">
        <p v-if="searchResults.length === 0">No artists found</p>
        <div v-for="artist in searchResults"
          :key="artist.id"
          class="artist-result"
          :class="{ selected: selectedArtist === artist }"
          @click="artistSelected(artist)"
        >
          <img :src="firstAlbumImage(artist)" class="artist-image" />
          <div class="artist-description">
            <p class="primary">{{ artist.attributes.name }}</p>
            <p class="muted-color font-2">Latest: <span class="muted2">{{ firstAlbumName(artist) }}</span></p>
          </div>
        </div>
      </div>
      </transition>

      <button class="button add-button m2-top" :disabled="!artistId">Add</button>
    </form>

  </div>
</template>

<script>
import api from '@/js/api'

export default {
  name: 'AddMusicArtist',
  data () {
    return {
      artistName: null,
      artistId: null,
      searchResults: null,
      selectedArtist: null,
      typeAheadTimer: null
    }
  },
  methods: {
    search () {
      if (this.artistName.length > 2) {
        clearTimeout(this.typeAheadTimer)
        this.typeAheadTimer = setTimeout(() => {
          api.searchMusicArtists(this.artistName)
            .then(r => { this.searchResults = r.results.artists.data })
        }, 700)
      }
    },
    firstAlbum (artist) {
      return (artist.relationships.albums.data[0] || { attributes: { artwork: {} } })
    },
    firstAlbumName (artist) {
      const album = this.firstAlbum(artist)
      return album && album.attributes ? album.attributes.name : ''
    },
    firstAlbumImage (artist) {
      const album = this.firstAlbum(artist)
      return (album && album.attributes ? album.attributes.artwork.url : '').replace(/{w}|{h}/g, '100')
    },
    artistSelected (artist) {
      this.artistId = artist.id
      this.selectedArtist = artist
    },
    saveItem () {
      this.$emit('submit', { itemType: 'music', details: { artistId: this.artistId } })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/app";

.add-button {
  @extend .m3-top;
}

$row-height: 46px;

.artist-result {
  @extend .flex-row;
  @extend .align-center;
  padding: 8px 0 8px 0;
  @extend .relative;
  @extend .border-bottom-muted3;
  @extend .pointer;
  transition: border .1s;
  &.selected {
    @extend .shadow-primary2;
    @extend .border-primary2;
    border-width: 3px;
  }
  &:last-child {
    margin-bottom: 0;
    border-bottom: none;
  }
}
.artist-image {
  @extend .square;
  @extend .shadow-primary3;
  margin-left: 4px;
  border-radius: 2px;
  width: $row-height;
  min-width: $row-height;
}
.artist-description {
  @extend .noscroll;
  margin-left: 12px;
  max-height: $row-height;
}
</style>
