/**
 * 将location对象转换为字符串
 * @param {Object} locationObj
 * @return {string}
 */
export function toLocationStr(locationObj) {
	return JSON.stringify(locationObj)
}

/**
 * 将location字符串转换对象
 * @param {string} locationStr 
 */
export function toLocationObj(locationStr) {
	return JSON.parse(locationStr)
}

/**
 * 返回具体信息
 * @param {string | Object} location
 */
export function formatLocation(location) {
  const locationObj =  typeof location === 'string' ? toLocationObj(location) : location
  const { formattedAddress, addressComponent } = locationObj
  let { province, city, district } = addressComponent
  const area = province + ' ' + city + ' ' + district
  if (city === '' && ['成都市', '上海市', '重庆市', '天津市'].indexOf(province) !== -1) {
    city = province
  }
  return {
    formattedAddress,
    area,
    province,
    city,
    district
  }
}
/**
 * 返回经纬度
 * @param {string | Object} location
 */
export function formatLocationToQR(location) {
	const { position } = typeof location === 'string' ? toLocationObj(location) : location
  const { Q, R } = position
  return {
    Q,
    R
  }
}
