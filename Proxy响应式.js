function reactive(obj) {
  const handler = {
    get(target, prop, receiver) {
      track(target, prop)
      //Reflect是一个内置对象，提供拦截JS操作的方法
      //等价于return target[prop]
      const value = Reflect.get(...arguments)
      if (typeof value === 'object') {
        //如果值还是一个对象，继续返回一个代理，也是一个响应式，就实现了有深度的响应式
        return reactive(value)
      } else {
        return value
      }
    },
    set(target, key, value, receiver) {
      trigger(target, key, value)
      //target[key] = value
      return Reflect.set(...arguments)
    }
  }
  //创造代理对象，对对象obj的操作代理给handler
  return new Proxy(obj,handler)
}

function track(data, key) {
  console.log('get data ', key)
}

function trigger(data, key, value) {
  console.log('set data', key, ":", value)
}


const dinner = {
  meal: 'tacos'
}
const proxy = reactive(dinner)
proxy.meal = 'apple'
proxy.list = []
proxy.list.push(1) //响应式