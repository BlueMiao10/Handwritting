function JSONP(url, data = {}) {
  return new Promise((resolve, reject) => {
    window.__fn__ = data => resolve(data)
    let script = document.createElement('script')
    let query = Object.entries(data).map(a => `${a[0]} = ${a[1]}`).join('&')
    script.src = url + '?callback=__fn__' + query
    script.onerror = () => reject('加载错误')
    document.head.appendChild(script)
    document.head.removeChild(script)
  })
}