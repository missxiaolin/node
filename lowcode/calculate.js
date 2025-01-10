// class Calculator {
//   //   add() {}
//   //   subtract() {}
//   //   multiply() {}
//   //   divide() {}
//   constructor() {
//     this.rules = new Map();
//   }

//   registerRule(name, fn) {
//     this.rules.set(name, fn);
//   }

//   invoke(name, ...args) {
//     return this.rules.get(name)(...args);
//   }
// }

// const calculator = new Calculator();

// const addRule = (a, b) => a + b;

// const subtractRule = (a, b) => a - b;

// calculator.registerRule("add", addRule);
// calculator.registerRule("subtract", subtractRule);

// console.log(calculator.invoke("add", 1, 2));

// // 远程有一个乘法的法则，那么你其实就可以将它加载过来，然后执行
// // 可能是通过 http 请求得来的
// const multiplyRule = (a, b) => a * b;
// calculator.registerRule("multiply", multiplyRule);
// console.log(calculator.invoke("multiply", 4, 2));

class Calculator {
  //   add() {}
  //   subtract() {}
  //   multiply() {}
  //   divide() {}
  constructor() {
    this.rules = new Map();
  }

  use({ name, invoker }) {
    this.rules.set(name, invoker);
  }

  invoke(name, ...args) {
    return this.rules.get(name)(...args);
  }
}

const calculator = new Calculator();

const addRule = { name: "add", invoker: (a, b) => a + b };

const subtractRule = { name: "subtract", invoker: (a, b) => a - b };

// Vue.use(Router); // 伪代码
// Vue.use(Vuex); // 伪代码
// Vue.use(Button) // 伪代码

calculator.use(addRule);
calculator.use(subtractRule);

console.log(calculator.invoke("add", 1, 2));
