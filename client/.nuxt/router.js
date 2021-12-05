import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _920b98d2 = () => interopDefault(import('..\\pages\\books\\index.vue' /* webpackChunkName: "pages/books/index" */))
const _1be19616 = () => interopDefault(import('..\\pages\\dashboard.vue' /* webpackChunkName: "pages/dashboard" */))
const _0a81ef0a = () => interopDefault(import('..\\pages\\inspire.vue' /* webpackChunkName: "pages/inspire" */))
const _e4d7d86c = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages/login" */))
const _3803bd78 = () => interopDefault(import('..\\pages\\profile\\index.vue' /* webpackChunkName: "pages/profile/index" */))
const _613bf8d2 = () => interopDefault(import('..\\pages\\register.vue' /* webpackChunkName: "pages/register" */))
const _17046fd2 = () => interopDefault(import('..\\pages\\shelf\\index.vue' /* webpackChunkName: "pages/shelf/index" */))
const _22db4347 = () => interopDefault(import('..\\pages\\admins\\all-books\\index.vue' /* webpackChunkName: "pages/admins/all-books/index" */))
const _27113646 = () => interopDefault(import('..\\pages\\admins\\book-requests\\index.vue' /* webpackChunkName: "pages/admins/book-requests/index" */))
const _69da30f1 = () => interopDefault(import('..\\pages\\admins\\dashboard.vue' /* webpackChunkName: "pages/admins/dashboard" */))
const _e338e554 = () => interopDefault(import('..\\pages\\admins\\register.vue' /* webpackChunkName: "pages/admins/register" */))
const _1d4f4b10 = () => interopDefault(import('..\\pages\\admins\\update-record\\index.vue' /* webpackChunkName: "pages/admins/update-record/index" */))
const _6d16a4e5 = () => interopDefault(import('..\\pages\\admins\\users.vue' /* webpackChunkName: "pages/admins/users" */))
const _7565d0e5 = () => interopDefault(import('..\\pages\\admins\\users.vue\\index.vue' /* webpackChunkName: "pages/admins/users.vue/index" */))
const _6ffd14bd = () => interopDefault(import('..\\pages\\admins\\all-books\\add-new-book.vue' /* webpackChunkName: "pages/admins/all-books/add-new-book" */))
const _7de83936 = () => interopDefault(import('..\\pages\\admins\\all-books\\edit\\_id.vue' /* webpackChunkName: "pages/admins/all-books/edit/_id" */))
const _ed3a0af6 = () => interopDefault(import('..\\pages\\admins\\book-requests\\_id.vue' /* webpackChunkName: "pages/admins/book-requests/_id" */))
const _18a527ec = () => interopDefault(import('..\\pages\\admins\\update-record\\_id\\index.vue' /* webpackChunkName: "pages/admins/update-record/_id/index" */))
const _c21c803a = () => interopDefault(import('..\\pages\\books\\_id\\index.vue' /* webpackChunkName: "pages/books/_id/index" */))
const _78271e9a = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/books",
    component: _920b98d2,
    name: "books"
  }, {
    path: "/dashboard",
    component: _1be19616,
    name: "dashboard"
  }, {
    path: "/inspire",
    component: _0a81ef0a,
    name: "inspire"
  }, {
    path: "/login",
    component: _e4d7d86c,
    name: "login"
  }, {
    path: "/profile",
    component: _3803bd78,
    name: "profile"
  }, {
    path: "/register",
    component: _613bf8d2,
    name: "register"
  }, {
    path: "/shelf",
    component: _17046fd2,
    name: "shelf"
  }, {
    path: "/admins/all-books",
    component: _22db4347,
    name: "admins-all-books"
  }, {
    path: "/admins/book-requests",
    component: _27113646,
    name: "admins-book-requests"
  }, {
    path: "/admins/dashboard",
    component: _69da30f1,
    name: "admins-dashboard"
  }, {
    path: "/admins/register",
    component: _e338e554,
    name: "admins-register"
  }, {
    path: "/admins/update-record",
    component: _1d4f4b10,
    name: "admins-update-record"
  }, {
    path: "/admins/users",
    component: _6d16a4e5,
    name: "admins-users"
  }, {
    path: "/admins/users.vue",
    component: _7565d0e5,
    name: "admins-users.vue"
  }, {
    path: "/admins/all-books/add-new-book",
    component: _6ffd14bd,
    name: "admins-all-books-add-new-book"
  }, {
    path: "/admins/all-books/edit/:id",
    component: _7de83936,
    name: "admins-all-books-edit-id"
  }, {
    path: "/admins/book-requests/:id?",
    component: _ed3a0af6,
    name: "admins-book-requests-id"
  }, {
    path: "/admins/update-record/:id",
    component: _18a527ec,
    name: "admins-update-record-id"
  }, {
    path: "/books/:id",
    component: _c21c803a,
    name: "books-id"
  }, {
    path: "/",
    component: _78271e9a,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
