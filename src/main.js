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
    htmlDecode (text) {
      const div = document.createElement('div')
      div.innerHTML = text
      return div.textContent
    },
    goToGallery (gallery) {
      gallery.toString = () => gallery.id
      this.$router.push({ name: 'gallery', params: { gallery } })
    },
    showGalleryEntryDetail (entry) {
      entry.toString = () => entry.id
      this.$router.push({ name: 'EntryDetail', params: { entry } })
    },
    openWebPage (url) {
      window.open(url)
    },
    playAudio (item, type, identifier) {
      this.setCurrentAudio({ item, type, identifier })
    },
    playVideo (item, type, identifier) {
      this.setCurrentVideo({ item, type, identifier })
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
