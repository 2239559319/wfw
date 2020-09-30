import {
    formatLocationToQR,
    formatLocation
} from './format'
/**
 * 比较两个位置字符串是否是一个位置
 * @param {string} location1 
 * @param {string} location2 
 */
export function compareTwoLocation(location1, location2) {
    const { Q: Q1, R: R1 } = formatLocationToQR(location1)
    const { Q: Q2, R: R2 } = formatLocationToQR(location2)
  return Q1.toString() === Q2.toString() && R1.toString() === R2.toString()
}

export function addToLocationList(locationStr) {
  let list = localStorage.getItem('location')
  if (!list) {
    list = [locationStr]
    localStorage.setItem('location', JSON.stringify(list))
    return Promise.resolve(true)
  } else {
    list = JSON.parse(list)
  }
  for (const item of list) {
    if (compareTwoLocation(item, locationStr)) return Promise.resolve(false)
  }
  list.push(locationStr)
  list.sort((a, b) => {
    const { formattedAddress: addr1 } = formatLocation(a)
    const { formattedAddress: addr2 } = formatLocation(b)
    if (addr1 === addr2) return 0
    else if (addr1 > addr2) return 1
    else return -1
  })
  localStorage.setItem('location', JSON.stringify(list))
  return Promise.resolve(true)
}

export function getLocationList() {
  let list = localStorage.getItem('location')
  if (!list) {
    list = []
  } else {
    list = JSON.parse(list)
  }
  return list
}

export function removeLocationItem(index) {
  let list = localStorage.getItem('location')
  if (!list) {
    return Promise.resolve(false)
  } else {
    list = JSON.parse(list)
  }
  list.splice(index, 1)
  return Promise.resolve(true)
}
