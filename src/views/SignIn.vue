<template>
  <div id="signin" class="v-fill flex-row align-center flex-center">
    <div class="card">
      <h2 class="m2-bottom primary text-center">Sign in to Tentkeep</h2>
      <div class="m2-bottom text-center line160">
        <p>Choose your favorites</p>
        <p>Track your progress</p>
        <p>Share and promote content</p>
      </div>

      <hr class="m4-top m4-bottom">

      <div class="flex-column align-center">
        <div @click="signInWithApple">
          <img src="https://appleid.cdn-apple.com/appleid/button?height=50&width=300" alt="">
        </div>

        <form v-show="isDev" class="beb" action="https://api.tentkeep.com/v1/auth/authorized" method="post">
          <input name="id_token" :value="jwt" />
          <button>Go</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SignIn',
  data () {
    return {
      jwt: window.jwtDev
    }
  },
  computed: {
    isDev () {
      return process.env.VUE_APP_IS_DEV
    }
  },
  methods: {
    signInWithApple () {
      window.location = `${process.env.VUE_APP_API_URL}/auth/authorize/apple`
    }
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
