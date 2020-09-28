import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Mine from '../views/Mine'
import SignIn from '../views/SignIn.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/mine',
    name: 'Mine',
    component: Mine
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: SignIn
  },
  {
    path: '/authorized',
    name: 'authorized',
    component: () => import(/* webpackChunkName: "authorized" */ '../views/Authorized')
  },
  {
    path: '/gallery/create',
    name: 'gallery-create',
    component: () => import(/* webpackChunkName: "create-gallery" */ '../views/GalleryCreate')
  },
  {
    path: '/gallery/:gallery',
    name: 'gallery',
    props: true,
    component: () => import(/* webpackChunkName: "gallery" */ '../views/Gallery')
  },
  {
    path: '/item/:item',
    name: 'EntryDetail',
    props: true,
    component: () => import(/* webpackChunkName: "EntryDetail" */ '../views/GalleryEntry')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
