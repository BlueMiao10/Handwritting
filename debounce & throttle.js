//防抖，在事件被触发给定时间内运行，如果在这个时间内有被触发，则重新计时
function debounce(fn, delay) {
  let timer = null
  return function () {
    if (timer) {
      clearTimeout(timer)
      timer = setTimeout(() => {
        fn.apply(this, arguments)
      }, delay)
    }
  }
}

//节流，在事件被触发给定时间运行，如果在这个时间内，事件被触发多次，则只执行一次
function throttle(fn, gapTime) {
  let nowTime = null
  let lastTime = null
  return function () {
    nowTime = Date.now()
    if (!lastTime || (nowTime - LastTime > gapTime)) {
      fn()
      nowTime = lastTime
    }
  }
}

//还有一种写法，从定义来看，防抖和节流差别并不大
function throttle2(fn, delay) {
  let canUSe = true
  return function () {
    if (canUSe) {
      fn.apply(this.arguments)
      canUSe = false
      setTimeout(() => {canUSe = true},delay)
    }
  }
}