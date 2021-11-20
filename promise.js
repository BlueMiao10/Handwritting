//promise是构造函数，我们才有es6的写法，所以第一步使用怕class
class promise {
  //有两个属性？
  succeed = null
  fail = null
  //state属性表示当前的状态
  state = 'pending'

  //当成功时，我们调用resolve时，把他变成了异步的?，并且改变状态，执行succeed()这个函数
  resolve(result) {
    setTimeout(() => {
      this.state = 'fulfilled'
      this.succeed(result)
    })
  }

  //当失败时，我们调用reject时，把他变成了异步的?，并且改变状态，执行fail()这个函数
  reject(reason) {
    setTimeout(() => {
      this.state = 'rejected'
      this.fail(reason)
    })
  }

  constructor(fn) {
    fn(this.resolve.bind(this), this.reject.bind(this))
  }

  then(succeed, fail) {
    this.succeed = succeed
    this.fail = fail
  }
}

new promise((resolve, reject) => {
  setTimeout(() => {
    if (Math.random() > 0.5) {
      resolve(100)
    } else {
      reject('失败')
    }
  }, 100)
}).then(n => {
  console.log(n)
}, reason => {
  console.log(reason)
})