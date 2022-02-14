//使用原型
function Dog(name) {
  this.name = name
  this.legsNumber = 4
}

Dog.prototype.say = function () {
  console.log(`汪汪汪~ 我是${this.name}，我有${this.legsNumber}条腿。`)
}
Dog.prototype.kind = "狗"

const dog1 = new Dog('欢欢')
dog1.say()

//使用class
class Cat {
  //没有办法把非函数属性放在prototype上
  constructor(name) {
    this.name = name
    this.legs = 4
  }

  say() {
    console.log(`喵喵喵~ 我是${this.name}，我有${this.legs}条腿。`)
  }
}