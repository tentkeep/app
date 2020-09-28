<template>
  <div class="p2">
    <form @submit.prevent="saveEntry" class="v-fill flex-column">
      <label for="youtubeUsername" class="primary font-2">*YouTube channel username:</label>
      <input
        name="youtubeUsername"
        type="text"
        v-model="youtubeUsername"
        class="input m1-top m2-bottom"
        placeholder="username" />

      <button class="button add-button" :disabled="!youtubeUsername">Add</button>
    </form>

  </div>
</template>

<script>
export default {
  name: 'AddPodcast',
  data () {
    return {
      youtubeUsername: null
    }
  },
  methods: {
    saveEntry () {
      this.$emit('submit', { entryType: 'youtube', details: { channelUsername: this.youtubeUsername } })
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
