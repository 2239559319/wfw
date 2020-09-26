export function getLocation() {
  return new Promise((resolve, reject) => {
    const mapObj = new AMap.Map('map')
    mapObj.plugin('AMap.Geolocation', () => {
      const geolocation = new AMap.Geolocation({
        enableHighAccuracy: true, //是否使用高精度定位，默认:true
        timeout: 10000, //超过10秒后停止定位，默认：无穷大
        maximumAge: 0, //定位结果缓存0毫秒，默认：0
        convert: true, //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
        showButton: true, //显示定位按钮，默认：true
        buttonPosition: 'LB', //定位按钮停靠位置，默认：'LB'，左下角
        buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
        panToLocation: false, //定位成功后将定位到的位置作为地图中心点，默认：true
        zoomToAccuracy: false //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
      })
      geolocation.getCurrentPosition((status, result) => {
        if (status === 'complete') resolve(result)
        else reject(result)
      })
    })
  })
}
