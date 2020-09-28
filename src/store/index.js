import Vue from 'vue'
import Vuex from 'vuex'
import storeGen from 'vuex-store-gen'
import api from '../js/api'

Vue.use(Vuex)

const state = {
  tokens: null,
  user: null,
  currentAudio: null,
  currentVideo: null
}

const { getters, mutations, actions } = storeGen(state)

getters.isSignedIn = (state) => !!state.tokens

actions.saveGallery = async ({ commit, state }, { title, image }) => {
  const _token = token(state)
  const gallery = await api.saveGallery(_token, { title })
  await api.saveGalleryImage(_token, gallery.id, image)
  return gallery
}
actions.saveGalleryEntry = ({ state }, properties) => {
  return state.tokens
    ? api.saveGalleryEntry(token(state), properties)
    : Promise.reject(new Error('Unauthorized'))
}
actions.getGalleriesForUser = ({ state }) => {
  return state.tokens
    ? api.getGalleriesForUser(token(state))
    : Promise.resolve({})
}
actions.getGalleryUserRole = ({ state }, galleryId) => {
  return state.tokens
    ? api.getGalleryUserRole(token(state), galleryId)
    : Promise.resolve({})
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})

const token = state => state.tokens.access_token
