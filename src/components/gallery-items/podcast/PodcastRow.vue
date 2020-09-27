<template>
  <div class="item-row" @click="playAudio(item, 'podcast')">
    <div class="flex-one p1-right lines1">
      <p class="lines1">{{ item.title }}</p>
      <p class="muted2 font-2">{{ date(item) }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PodcastRow',
  props: ['item'],
  methods: {
    date (item) {
      return new Date(item.pubDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric', day: 'numeric' })
    }
  }
}
</script>
