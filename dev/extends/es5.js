// 一是实例属性/方法、二是原型属性/方法、三是静态属性/方法

// 父类
function P(name) {
  this.name = name; // 实例属性
}
// P();
P.type = "午饭"; // 静态属性
// 静态方法
P.sleep = function () {
  console.log(`我在吃${this.type}`);
};
// 实例方法
P.prototype.say = function () {
  console.log("我叫 " + this.name);
};

//  1. 继承实例属性/方法
// 子类
function S(name, age) {
  // 继承父类的实例属性
  P.call(this, name);
  // 自己的实例属性
  this.age = age;
}

let s = new S("大伟聊前端", 30);
console.log(s.name, s.age);

// 2. 继承原型属性/方法
// 方法一
S.prototype = Object.create(P.prototype);
S.prototype.constructor = S;

// 方法二
S.prototype.__proto__ = P.prototype;

// 方法三
function Fn() {}
Fn.prototype = P.prototype;
S.prototype = new Fn();
S.prototype.constructor = S;

// 覆盖一下父类同名方法
S.prototype.say = function () {
  console.log("你好");
  // 调用父类的该原型方法
  // this.__proto__ === Sub.prototype、 Sub.prototype.__proto__ === Sup.prototype
  this.__proto__.__proto__.say.call(this);
  console.log(`今年${this.age}岁`);
};

let s1 = new S("大伟聊前端", 30);
s1.say();

// 继承静态属性
Object.keys(P).forEach((prop) => {
  S[prop] = P[prop];
});

let s2 = new S("大伟聊前端", 30);
s2.say();
S.type = "晚饭";
S.sleep();
