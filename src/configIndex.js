// import Vue from 'vue'
// import ELEMENT from 'element-ui'  
// import PositionTable from './components/PositionTable'
// import 'element-ui/lib/theme-chalk/index.css'

// Vue.use(ELEMENT)

// Vue.config.devtools = true

// new Vue({
// 	render: h => h(PositionTable)
// }).$mount('#app')

import { getLocation } from '@utils'

getLocation().then(console.log)
