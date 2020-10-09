import Vue from 'vue'
import Vuex from 'vuex'
import storeGen from 'vuex-store-gen'
import api from '../js/api'
import images from '@/js/images'

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
  const tinyImage = await images.resizeImage(image, { maxSize: 10, outputType: 'dataURL' })
  const gallery = await api.saveGallery(_token, { title, tiny_image: tinyImage })
  const normalizedImage = await images.resizeImage(image, { maxSize: 900 })
  await api.saveGalleryImage(_token, gallery.id, normalizedImage)
  return gallery
}
actions.deleteGallery = ({ state }, galleryId) => {
  const _token = token(state)
  return api.deleteGallery(_token, galleryId)
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
actions.saveUserItemActivity = ({ state }, itemActivity) => {
  return state.tokens
    ? api.saveUserItemActivity(token(state), itemActivity)
    : Promise.resolve({})
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})

const token = state => state.tokens.access_token
