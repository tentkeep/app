import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { mapActions } from 'vuex'

Vue.config.productionTip = false

Vue.mixin({
  methods: {
    ...mapActions(['setCurrentAudio']),
    alert (content) {
      window.alert(content)
    },
    goToGallery (gallery) {
      gallery.toString = () => gallery.id
      this.$router.push({ name: 'gallery', params: { gallery } })
    },
    playAudio (item, type) {
      this.setCurrentAudio({ item, type })
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
