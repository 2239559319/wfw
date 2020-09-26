const cookie = ''
const proxy = {
  '/': {
    target: 'https://wfw.scu.edu.cn',
    changeOrigin: true,
    onProxyReq: ((proxyReq, req, res) => {
      proxyReq.setHeader('Cookie', cookie)
      proxyReq.setHeader('Host', 'wfw.scu.edu.cn')
      proxyReq.setHeader('Origin', 'https://wfw.scu.edu.cn')
    })
  }
}
module.exports = {
  proxy
}
