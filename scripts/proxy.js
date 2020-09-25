const cookie = ''
const proxy = {
  '^/**': {
    target: 'https://wfw.scu.edu.cn',
    changeOrigin: true,
    onProxyReq: ((proxyReq, req, res) => {
      proxyReq.setHeader('cookie', cookie)
    })
  }
}
module.exports = {
  proxy
}