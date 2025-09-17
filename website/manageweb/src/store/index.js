import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

Vue.use(Vuex)

// Auto-import Vuex modules with Vite's glob import
const modules = {}
const moduleFiles = import.meta.glob('./modules/*.js', { eager: true })
Object.keys(moduleFiles).forEach((key) => {
  // key example: './modules/app.js' => moduleName: 'app'
  const moduleName = key.replace(/^\.\/modules\/(.*)\.\w+$/, '$1')
  modules[moduleName] = moduleFiles[key].default
})

const store = new Vuex.Store({
  modules,
  getters
})

export default store
