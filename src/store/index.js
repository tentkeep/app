import Vue from 'vue'
import Vuex from 'vuex'
import storeGen from 'vuex-store-gen'
import api from '../js/api'

Vue.use(Vuex)

const state = {
  tokens: null,
  user: null
}

const { getters, mutations, actions } = storeGen(state)

getters.isSignedIn = (state) => !!state.tokens

actions.saveGallery = async ({ commit, state }, { title, image }) => {
  const token = state.tokens.access_token
  const gallery = await api.saveGallery(token, { title })
  await api.saveGalleryImage(token, gallery.id, image)
  gallery.toString = function () { return this.id }
  return gallery
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
