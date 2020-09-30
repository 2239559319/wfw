const axios = require('axios').default

const cookie = 'eai-sess=qcc0vd3gvi690n2a257db4aij5; UUkey=bb44c8935d4009e460bdf57a8003cb0b; Hm_lvt_48b682d4885d22a90111e46b972e3268=1600499592,1600499603,1601044163,1601206636; Hm_lpvt_48b682d4885d22a90111e46b972e3268=1601296163'


axios.get('https://wfw.scu.edu.cn/ncov/wap/default/index', {
    headers: {
        cookie
    }
}).then(v => v.data)
.then(console.log)