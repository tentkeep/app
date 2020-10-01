<template>
  <div class="p2">
    <form @submit.prevent="saveEntry" class="v-fill flex-column">
      <label for="youtubeUsername" class="primary font-2">YouTube channel username:</label>
      <input
        name="youtubeUsername"
        type="text"
        v-model="youtubeUsername"
        class="input m1-top m2-bottom"
        placeholder="username" />

      <div class="flex-row align-center p3">
        <div class="m2-h flex-one border-bottom-muted2"></div>
        <p class="font-3 muted2">OR</p>
        <div class="m2-h flex-one border-bottom-muted2"></div>
      </div>

      <label for="youtubeChannelId" class="primary font-2">YouTube channel ID:</label>
      <p class="muted2 font-3">youtube.com/channel/YOUR_CHANNEL_ID</p>
      <input
        name="youtubeChannelId"
        type="text"
        v-model="youtubeChannelId"
        class="input m1-top m2-bottom"
        placeholder="channel ID" />

      <button class="button add-button" :disabled="!youtubeUsername && !youtubeChannelId">Add</button>
    </form>

  </div>
</template>

<script>
export default {
  name: 'AddPodcast',
  data () {
    return {
      youtubeUsername: null,
      youtubeChannelId: null
    }
  },
  methods: {
    saveEntry () {
      this.$emit('submit', {
        entryType: 'youtube',
        details: { username: this.youtubeUsername, channelId: this.youtubeChannelId }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/app";

.add-button {
  @extend .m3-top;
}
</style>
