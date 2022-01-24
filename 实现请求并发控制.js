async function asyncPool(limit, array, iteratorFn) {
  //存放全部的请求
  const ret = []
  //存放已经开始但还未结束的请求
  const executing = [];
  for (const item of array) {
    //我们发出的请求处理过的每一项，这里的每个p都是promise对象
    const p = iteratorFn(item)
    ret.push(p)
    //如果并发数小于我们请求的数目，才会执行下边的代码
    if (limit <= array.length) {
      //这里的e可以理解为是已经开始执行的p
      const e = p.then(() => {
        //当收到响应后或者说执行完后的p被从队列（executing）中踢出
        executing.splice(executing.indexOf(e), 1)
      })
      //上边的代码是在promise resolve之后才会执行，相当于是请求发出去之后收到响应，是会有延迟的，所以下边的代码先执行
      executing.push(e)

      //当目前请求的数目超出我们的并发请求限制数
      if (executing.length >= limit) {
        //等待最快的请求有结果之后，会执行自己的promise，才能继续进行for循环，这实现了最多有limit个请求在执行
        await Promise.race(executing)
      }
    }
  }
  return Promise.all(ret)
}


//使用
const request = i => {
  console.log('开始' + i)

  return new Promise(resolve => setTimeout(() => {
    resolve(i)
    console.log('结束' + i)
  }, 1000 + Math.random() * 1000))
}

let urls = Array(30).fill(0).map((v, i) => i);
console.log(urls);
(async () => {
  const res = await asyncPool(10, urls, request)
  console.log(res)
})()