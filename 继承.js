//原型实现继承
function Animal(color) {
  this.color = color
}

Animal.prototype.move = function () {
}

function Dog(color, name) {
  Animal.call(this, color)
  this.name = name
}
//为了实现原型上的继承
//我们计划 Dog.prototype.__proto__ = Animal.prototype
//但是不是所有浏览器中存储原型的这个属性都叫__proto__
//因此我们想到使用new的方式来实现，因为我们知道在new一个函数的过程中有一步就是绑定原型，将临时对象的原型与构造函数的原型绑定
//但是new一个函数的过程中还会执行函数，会把多余的自身属性也会传递出来，这是我们不想要的，怎么办呢，我们创建一个函数体为空的构造函数，他没有多余的属性
function Temp() {}
Temp.prototype = Animal.prototype
Dog.prototype = new Temp()

Dog.prototype.constructor = Dog
Dog.prototype.say = function () {
}

//class实现继承
class Person {
  constructor(name) {
    this.name = name
  }

  move() {
  }
}

class Male extends Person {
  constructor(color, name) {
    super(name);
    this.color = color
  }

  say() {
  }
}

