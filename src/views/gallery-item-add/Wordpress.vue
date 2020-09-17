<template>
  <div class="p2">
    <form @submit.prevent="saveItem" class="v-fill flex-column">
      <label for="host" class="primary font-2">*Worpress site address:</label>
      <input
        name="host"
        type="text"
        v-model="host"
        class="input m1-top m2-bottom"
        placeholder="your-site.com" />

      <button class="button add-button" :disabled="!host">Add</button>
    </form>

  </div>
</template>

<script>
export default {
  name: 'AddWordpress',
  data () {
    return {
      host: null
    }
  },
  methods: {
    saveItem () {
      this.$emit('submit', { itemType: 'wordpress', details: { host: this.host } })
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
