<template>
    <div class="table">
        <div class="add">
            <el-button
                type="primary"
                @click="addLocation"
                >添加地点</el-button>
        </div>
        <el-table :data="lists">
            <el-table-column type="selection" />
            <el-table-column width="300" prop="formattedAddress" label="地址" />
            <el-table-column prop="count" label="数量" />
            <el-table-column prop="province" label="省份" />
            <el-table-column prop="city" label="城市" />
            <el-table-column prop="district" label="区县" />
            <el-table-column label="删除">
                <template slot-scope="scope">
                    <el-button type="danger" size="mini" @click="delRow(scope.row.index)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import {
    formatLocation,
    getLocationList,
    removeLocationItem,
    getLocation,
    addToLocationList
} from '@utils'

export default {
	name: 'position-table',
	data() {
		return {
			lists: []
		}
	},
	mounted() {
		this.getDataList()
    },
    methods: {
        getDataList() {
            const dataList = getLocationList()
            const map = new Map()
            for (const item of dataList) {
                const { formattedAddress, province, city, district } = formatLocation(item)
                if (map.has(formattedAddress)) {
                    map.set(formattedAddress, map.get(formattedAddress) + 1)
                } else {
                    map.set(formattedAddress, 1)
                }
            }
            const set = new Set()
            this.lists = dataList.reduce((acc, v, i) => {
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
        },
        delRow(index) {
            removeLocationItem(index)
            this.getDataList()
        },
        addLocation() {
            getLocation().then(v => {
                return addToLocationList(v)
            }).then(v => {
                this.getDataList()
            })
        }
    }
}
</script>

<style scoped></style>
