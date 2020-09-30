import Vue from 'vue'
import PositionTable from './components/PositionTable'
import item from '../test/location.json'

Vue.config.devtools = true

new Vue({
	render: h => h(PositionTable, {
		props: {
			'table-data': [item]
		}
	})
}).$mount('#app')
