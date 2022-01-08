//方式一
let url = 'https://rap2api.taobao.org/app/mock/244238/weather?city=北京'
let xhr = new XMLHttpRequest()
xhr.open('GET', url, true)
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4) {
    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
      console.log(JSON.parse(xhr.responseText))
    } else {
      console.log('服务器异常')
    }
  }
}
xhr.onerror = function () {
  console.log('服务器异常')
}
xhr.send()

//方式二
//let url = ''
//let xhr = new XMLHttpRequest()
xhr.open('GET', url, true)
xhr.onload = function () {
  if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
    console.log(JSON.parse(xhr.responseText))
  } else {
    console.log('服务器异常')
  }
}

xhr.onerror = function () {
  console.log('服务器异常')
}

xhr.send()

//封装为函数
url = url + '?' + Object.entries(params).map(arr => arr[0] + '=' + arr[1]).join('&')

//Post请求
//第一种传递数据的方式
// let url = ''
// let xhr = new XMLHttpRequest()
xhr.timeout = 3000
xhr.open('POST', url, true)
xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
xhr.onload = function () {
  if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
    console.log(JSON.parse(xhr.responseText))
  } else {
    console.log('服务器异常')
  }
}

xhr.timeout = function () {
  console.log('响应超时')
}
xhr.onerror = function () {
  console.log('服务异常')
}
xhr.send('username=hunger&password=12345678')

//第二种
let formData = new FormData()
formData.append('username', 'hunger')
formData.append('password', '123456')
//let url = ''
//let xhr = new XMLHttpRequest()
xhr.open('POST', url, true)
xhr.onload = function () {
  if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
    console.log(JSON.parse(xhr.responseText))
  } else {
    console.log('服务器异常')
  }
}

xhr.onerror = function () {
}
xhr.send(formData)

