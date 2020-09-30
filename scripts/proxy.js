const axios = require('axios').default

const cookie = ''

/**
 * @type {import('webpack-dev-server').ProxyConfigMap}
 */
const proxy = {
  '/': {
    target: 'https://wfw.scu.edu.cn',
    // changeOrigin: true,
    onProxyReq(proxyReq, req, res) {
      proxyReq.setHeader('Cookie', cookie)
      proxyReq.setHeader('Host', 'wfw.scu.edu.cn')
      proxyReq.setHeader('Origin', 'https://wfw.scu.edu.cn')
    },
  }
}
async function getIndex(path) {
  const baseUrl = 'https://wfw.scu.edu.cn'
  const res = await axios.get(baseUrl + path, {
    headers: {
      cookie
    }
  })
  return await res.data
}

module.exports = {
  proxy,
  getIndex
}
