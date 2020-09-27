<template>
  <div class="item-row" @click="playAudio(episode, 'podcast')">
    <div class="flex-one p1-right lines1">
      <p class="lines1">{{ episode.title }}</p>
      <p class="muted2 font-2">{{ date(episode) }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PodcastRow',
  props: ['episode'],
  methods: {
    date (episode) {
      return new Date(episode.pubDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric', day: 'numeric' })
    }
  }
}
</script>
