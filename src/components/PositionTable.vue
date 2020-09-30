<template>
	<el-table :data="lists">
		<el-table-column type="selection" />
		<el-table-column
			width="300"
			prop="formattedAddress"
			label="地址" />
		<el-table-column prop="count" label="数量" />
		<el-table-column prop="province" label="省份" />
		<el-table-column prop="city" label="城市" />
		<el-table-column prop="district" label="区县" />
		<el-table-column label="删除">
			<template slot-scope="scope">
				<el-button
					type="danger"
					size="mini">删除</el-button>
			</template>
		</el-table-column>
	</el-table>
</template>

<script>
import { formatLocation } from '@utils'
import Vue from 'vue'
import { Table, TableColumn, Button } from 'element-ui'

Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Button)

export default {
	name: 'position-table',
	props: {
		tableData: {
			type: Array
		}
	},
	data() {
		return {
			lists: []
		}
	},
	mounted() {
		const map = new Map()
		for (const item of this.tableData) {
			const { formattedAddress, province, city, district } = formatLocation(item)
			if (map.has(formattedAddress)) {
				map.set(formattedAddress, map.get(formattedAddress) + 1)
			} else {
				map.set(formattedAddress, 1)
			}
		}
		const set = new Set()
		this.lists = this.tableData.reduce((acc, v, i) => {
			const { formattedAddress, province, city, district } = formatLocation(v)
			if (set.has(formattedAddress)) return acc
			else {
				set.add(formattedAddress)
				return acc.concat({
					formattedAddress,
					count: map.get(formattedAddress),
					index: i,
					province,
					city,
					district
				})
			}
		}, [])
	}
}
</script>

<style scoped></style>
