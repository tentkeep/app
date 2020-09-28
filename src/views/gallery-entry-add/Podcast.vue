<template>
  <div class="p2">
    <form @submit.prevent="saveEntry" class="v-fill flex-column">
      <label for="feedUrl" class="primary font-2">*Podcast feed url:</label>
      <input
        name="feedUrl"
        type="url"
        v-model="feedUrl"
        class="input m1-top m2-bottom"
        placeholder="web address" />

      <label for="search" class="primary font-2">Search iTunes</label>
      <input
        name="search"
        type="text"
        v-model="query"
        class="input m1-top"
        placeholder="podcast search"
        @input="search" />

      <transition name="fade-in">
      <div v-if="searchResults" class="scrolly border-primary shadow-primary3 m1-h">
        <p v-if="searchResults.length === 0">No podcasts found on iTunes</p>
        <div v-for="podcast in searchResults"
          :key="podcast.collectionId"
          class="podcast-result"
          :class="{ selected: selectedPodcast === podcast }"
          @click="podcastSelected(podcast)"
        >
          <img :src="podcast.artworkUrl100" class="podcast-image" />
          <div class="podcast-description">
            <p class="primary">{{ podcast.collectionName }}</p>
            <p class="muted font-2">{{ podcast.artistName }}</p>
          </div>
        </div>
      </div>
      </transition>

      <button class="button add-button" :disabled="!feedUrl">Add</button>
    </form>

  </div>
</template>

<script>
import api from '@/js/api'

export default {
  name: 'AddPodcast',
  data () {
    return {
      query: null,
      searchResults: null,
      selectedPodcast: null,
      typeAheadTimer: null,
      feedUrl: null
    }
  },
  methods: {
    search () {
      if (this.query.length > 3) {
        clearTimeout(this.typeAheadTimer)
        this.typeAheadTimer = setTimeout(() => {
          api.searchPodcasts(this.query)
            .then(r => { this.searchResults = r.results })
        }, 700)
      }
    },
    podcastSelected (podcast) {
      this.feedUrl = podcast.feedUrl
      this.selectedPodcast = podcast
    },
    saveEntry () {
      this.$emit('submit', { entryType: 'podcast', details: { feedUrl: this.feedUrl } })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/app";

$row-height: 46px;

.podcast-result {
  @extend .flex-row;
  @extend .align-center;
  @extend .m1-bottom;
  @extend .p1-bottom;
  @extend .relative;
  @extend .border-bottom-muted3;
  transition: background .3s;
  &.selected {
    @extend .bg-muted3;
  }
  &:last-child {
    margin-bottom: 0;
    border-bottom: none;
  }
}
.podcast-image {
  @extend .square;
  width: $row-height;
  min-width: $row-height;
}
.podcast-description {
  @extend .m1-left;
  @extend .noscroll;
  max-height: $row-height;
}
.add-button {
  @extend .m3-top;
}
</style>
