function getDiff(targetDate) {
  let oldTimeFormat = new Date(targetDate)
  let nowDate = new Date()
  let times = nowDate.getTime() - oldTimeFormat.getTime()
  return parseInt(times / (60 * 60 * 24 * 1000))
}

console.log(getDiff('2022/02/28'));
