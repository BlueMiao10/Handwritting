const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class handPromise {
  constructor(excutor) {
    //执行这个类时会传入一个执行器，这个执行器会立即执行
    //使用excutor中的两个参数rreolve 和 reject 两个函数来实现上述两种状态的 更改
    try {
      excutor(this.resolve, this.reject)
    } catch (error) {
      this.reject(error)
    }

  }

  // 储存状态的变量，初始值是 pending
  status = PENDING

  onFulfilledCallbacks = []
  onRejectedCallbacks = []

  //状态为成功时返回的值
  value = null;
  //状态为失败时返回的原因
  reason = null;

  //使用箭头函数是因为，可以让内部this的指向实例对象，如果不使用箭头函数的话，this指向window，那么需要在外边let self = this
  //成功时修改状态
  resolve = (value) => {
    if (this.status === PENDING) {
      //更改状态
      this.status = FULFILLED
      //保存成功的值
      this.value = value
      while (this.onFulfilledCallbacks.length) {
        this.onFulfilledCallbacks.shift()(value)
      }
    }
  }
  //失败时修改状态
  reject = (reason) => {
    if (this.status === PENDING) {
      //更改状态
      this.status = REJECTED
      //保存失败原因
      this.reason = reason
      while (this.onRejectedCallbacks.length) {
        this.onRejectedCallbacks.shift()(reason)
      }
    }
  }
  //then方法可以接受两个回调函数作为参数
  then = (onFulfilled, onRejected) => {
    // 如果不传，就使用默认函数,因为在原生promise中then里的回调函数不是必须的
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : reason => {
      throw reason
    };
    return new handPromise((resolve, reject) => {
      //下边的内容会在执行器中被立即执行
      if (this.status === FULFILLED) {
        queueMicrotask(() => {
          try {
            const x = onFulfilled(this.value)
            resolvePromise(x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })

        // if (x instanceof handPromise) {
        //   // 执行 x，调用 then 方法，目的是将其状态变为 fulfilled 或者 rejected
        //   // x.then(value => resolve(value), reason => reject(reason))
        //   // 简化之后
        //   x.then(resolve, reject)
        // } else {
        //   // 普通值
        //   resolve(x)
        // }
      } else if (this.status === REJECTED) {
        queueMicrotask(() => {
          try {
            const x = onRejected(this.reason)
            resolvePromise(x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      } else if (this.status === PENDING) {
        this.onFulfilledCallbacks.push(() => {
          // ==== 新增 ====
          queueMicrotask(() => {
            try {
              // 获取成功回调函数的执行结果
              const x = onFulfilled(this.value);
              // 传入 resolvePromise 集中处理
              resolvePromise(x, resolve, reject);
            } catch (error) {
              reject(error)
            }
          })
        });
        this.onRejectedCallbacks.push(() => {
          // ==== 新增 ====
          queueMicrotask(() => {
            try {
              // 调用失败回调，并且把原因返回
              const x = onRejected(this.reason);
              // 传入 resolvePromise 集中处理
              resolvePromise(x, resolve, reject);
            } catch (error) {
              reject(error)
            }
          })
        })
      }
    })
  }
}

function resolvePromise(x, resolve, reject) {
  // 判断x是不是 hadPromise 实例对象
  if (x instanceof handPromise) {
    // 执行 x，调用 then 方法，目的是将其状态变为 fulfilled 或者 rejected
    // x.then(value => resolve(value), reason => reject(reason))
    // 简化之后
    x.then(resolve, reject)
  } else {
    // 普通值
    resolve(x)
  }
}

const promise = new handPromise((resolve, reject) => {
  resolve('success')
})

function other() {
  return new handPromise((resolve, reject) => {
    resolve('other')
  })
}

promise.then(value => {
  console.log(1)
  console.log('resolve', value)
  return other()
}).then(value => {
  console.log(2)
  console.log('resolve', value)
})