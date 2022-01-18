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

function Temp() {
}

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

