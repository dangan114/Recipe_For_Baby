import Vue from 'vue'
import VueRouter from 'vue-router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import axios from 'axios'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import routes from 'src/services/routes.js'
import App from './App.vue'

import { store } from 'src/store/index'

Vue.use(VueRouter)

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

const router = new VueRouter({
  mode: 'history',
  routes
})

Vue.config.productionTip = false

window.axios = axios
axios.defaults.baseURL = 'http://localhost:3000'

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
