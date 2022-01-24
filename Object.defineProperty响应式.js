//单纯利用Object.defineProperty只能实现一个属性的响应式，所以我们要对data的数据进行深度遍历
function observe(data){
  if(!data || typeof data !== 'object') return
  for(let key of data){
    let value = data[key]
    Object.defineProperty(data,key,{
      enumerable:true,
      configurable:true,
      get(){
        //劫持数据，然后做相应的处理
        track(data,key)
        return value
      },
      set(newValue){
        trigger(data,key,newValue)
        value = newValue
      }
    })
    if(typeof value === 'object'){
      observe(value)
    }
  }
}

function track(data,key){

}

function trigger(data,key,newValue){

}

//对于已有的属性有响应式，但对于新增的属性没有响应式
let data = {
  name:'blue',
  friends:[1,2,3]
}
//有响应式
data.name = 'valley'
data.friends[0] = 9

//无响应式
data.friends[5] = 8
data.age = 6
