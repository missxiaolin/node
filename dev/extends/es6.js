// 父类
class P {
  constructor(name) {
    this.name = name;
  }
  say() {
    console.log("我叫 " + this.name);
  }
  static sleep() {
    console.log(`我在吃${this.type}`);
  }
}
// static只能设置静态方法，不能设置静态属性
// numerable默认为false，
// Object.getOwnPropertyNames

P.type = "午饭";
P.prototype.xxx = "xxx";
// 子类，继承父类
class S extends P {
  constructor(name, age) {
    super(name);
    this.age = age;
  }

  say() {
    console.log("你好");
    super.say();
    console.log(`今年${this.age}岁`);
  }
}
let sub = new S("大伟聊前端", 30);
sub.say();
S.type = "晚饭";
S.sleep();
