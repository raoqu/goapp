import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg组件

// register globally
Vue.component('svg-icon', SvgIcon)

// Register all SVGs via vite-plugin-svg-icons
import 'virtual:svg-icons-register'
