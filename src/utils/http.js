import axios from 'axios'

const instance = axios.create()

instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

export default instance
