<template>
  <div id="authorized" class="v-fill flex-row align-center flex-center">
    <div class="card">
      <h2 class="primary text-center">You've signed in!</h2>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import api from '../js/api'

export default {
  name: 'SignIn',
  methods: {
    ...mapActions(['setTokens'])
  },
  async mounted () {
    const tokens = await api.exchangeAccessCode(this.$route.query.code)
    this.setTokens(tokens)
    this.$router.replace('/')
  }
}
</script>

<style lang="scss" scoped>
#signin {
  .signin-button > div > div > svg {
    height: 50px;
    width: 100%;
  }
}
</style>
