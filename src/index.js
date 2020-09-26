import { geo_api_info } from '@utils'

geo_api_info().then(res => {
    console.log(res)
}).catch(err => {
    console.log(err)
})