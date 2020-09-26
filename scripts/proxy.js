const cookie = 'eai-sess=qcc0vd3gvi690n2a257db4aij5; UUkey=bb44c8935d4009e460bdf57a8003cb0b; Hm_lvt_48b682d4885d22a90111e46b972e3268=1600499592,1600499603,1601044163; Hm_lpvt_48b'
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