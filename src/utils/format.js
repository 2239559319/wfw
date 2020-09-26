/**
 * 返回具体信息
 * @param {string} locationStr
 */
export function formatLocation(locationStr) {
  const locationObj = JSON.parse(locationStr)
  const { address, addressComponent } = locationObj
  let { province, city, district } = addressComponent
  const area = province + ' ' + city + ' ' + district
  if (city === '' && ['成都市', '上海市', '重庆市', '天津市'].indexOf(province) !== -1) {
    city = province
  }
  return {
    address,
    area,
    province,
    city,
    district
  }
}
/**
 * 返回经纬度
 * @param {string} locationStr
 */
export function formatLocationToQR(locationStr) {
  const { position } = JSON.parse(locationStr)
  const { Q, R } = position
  return {
    Q,
    R
  }
}
