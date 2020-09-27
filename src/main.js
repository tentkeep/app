import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { mapActions } from 'vuex'

Vue.config.productionTip = false

Vue.mixin({
  methods: {
    ...mapActions(['setCurrentVideo', 'setCurrentAudio']),
    alert (content) {
      window.alert(content)
    },
    goToGallery (gallery) {
      gallery.toString = () => gallery.id
      this.$router.push({ name: 'gallery', params: { gallery } })
    },
    showGalleryItemDetail (item) {
      item.toString = () => item.id
      this.$router.push({ name: 'ItemDetail', params: { item } })
    },
    playAudio (item, type) {
      this.setCurrentAudio({ item, type })
    },
    playVideo (item, type) {
      this.setCurrentVideo({ item, type })
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
