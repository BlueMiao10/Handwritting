arr = [1, 23, 4]
obj = {a: 1, b: 2, c: 3}

//数组的浅拷贝，很多api可以实现，比如concat、forEach等
const shadowCopy = arr => {
  arr.map(v => v)
}

//数组或是对象
function shadowCopy2(src) {
  let result = Array.isArray(src) ? [] : {}
  for (let key in src) {
    result[key] = src[key]
  }
  return result
}


//快速深拷贝
JSON.parse(JSON.stringify(arr))

//深拷贝 考虑数组或对象中还有对象或者数组  考虑循环引用
//检查map中有无克隆过的对象
// 有 - 直接返回
// 没有 - 将当前对象作为key，克隆对象作为value进行存储
// 继续克隆

function clone(target, map = new Map()) {
  if (typeof target === 'object') {
    let cloneTarget = Array.isArray(target) ? [] : {};
    if (map.get(target)) {
      return map.get(target);
    }
    map.set(target, cloneTarget);
    for (const key in target) {
      if (typeof target[key] === 'object' && target[key] !== null) {
        cloneTarget[key] = clone(target[key], map)
      } else {
        cloneTarget[key] = target[key]
      }
    }
    return cloneTarget;
  } else {
    return target;
  }
}

const target = {
  field1: 1,
  field2: null,
  field3: {
    child: 'child'
  },
  field4: [2, 4, 8]
};
target.target = target;

