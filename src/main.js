import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.mixin({
  methods: {
    alert (content) {
      window.alert(content)
    },
    goToGallery (gallery) {
      gallery.toString = () => gallery.id
      this.$router.push({ name: 'gallery', params: { gallery } })
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
