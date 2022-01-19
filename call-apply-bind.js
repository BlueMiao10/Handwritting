//实现call
Function.prototype.myCall = function (context, ...args) {
  //用于防止 Function.prototype.myCall() 直接调用
  if (this === Function.prototype) {
    return undefined
  }

  context = context || window
  const fn = Symbol()
  context[fn] = this
  const result = context[fn](...args)
  delete context[fn]
  return result
}


//实现apply
Function.prototype.myApply = function (context, args) {
  if (this === Function.prototype) {
    return undefined
  }

  context = context || window
  const fn = Symbol()
  context[fn] = this
  let result
  if (Array.isArray(args)) {
    result = context[fn](...args)
  } else {
    result = context[fn]()
  }
  delete context[fn]
  return result
}


//实现bind
Function.prototype.myBind = function (context, ...args) {
  if (this === Function.prototype) {
    throw new TypeError('Error')
  }

  const fn = this
  return function newFn(...newFnArgs) {
    if (this instanceof newFn) {
      return new fn(...args, ...newFnArgs)
    }
    return fn.apply(context, [...args,...newFnArgs])
  }
}
